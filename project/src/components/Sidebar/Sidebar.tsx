import React, { useState, useEffect } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { menuItems, footerMenuItems } from './menuConfig';
import MenuItem from './MenuItem';
import type { SidebarProps } from './types';

const findAllParentRoutes = (items: any[], targetRoute: string): string[] => {
  for (const item of items) {
    if (item.route === targetRoute) {
      return [item.route];
    }
    if (item.items) {
      const found = findAllParentRoutes(item.items, targetRoute);
      if (found.length) {
        return [item.route, ...found];
      }
    }
  }
  return [];
};

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick, activeView, collapsed: controlledCollapsed, onToggleCollapse }) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = controlledCollapsed ?? internalCollapsed;
  const toggleCollapse = onToggleCollapse ?? (() => setInternalCollapsed(prev => !prev));

  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  useEffect(() => {
    const allMenuItems = [...menuItems, ...footerMenuItems];
    const parentRoutes = findAllParentRoutes(allMenuItems, activeView);
    if (parentRoutes.length > 0) {
      setOpenMenus(new Set(parentRoutes));
    }
  }, [activeView]);

  const handleMenuClick = (route: string, hasSubmenu?: boolean) => {
    if (hasSubmenu) {
      if (collapsed) {
        toggleCollapse();
      }
      setOpenMenus(prev => {
        const newOpenMenus = new Set<string>();
        if (prev.has(route)) {
          return newOpenMenus;
        } else {
          const allMenuItems = [...menuItems, ...footerMenuItems];
          const parentRoutes = findAllParentRoutes(allMenuItems, route);
          parentRoutes.forEach(r => newOpenMenus.add(r));
          newOpenMenus.add(route);
        }
        return newOpenMenus;
      });
    } else {
      onMenuClick(route);
    }
  };

  const isMenuOpen = (route: string) => openMenus.has(route);
  const isMenuActive = (item: any): boolean => {
    if (activeView === item.route) return true;
    if (item.items) {
      return item.items.some((subItem: any) => isMenuActive(subItem));
    }
    return false;
  };

  return (
    <aside
      className={`bg-white border-r border-[#e5e5e5] h-[calc(100vh-48px)] flex flex-col flex-shrink-0 transition-all duration-200 ${
        collapsed ? 'w-[60px]' : 'w-[220px]'
      }`}
    >
      <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden flex flex-col">
        {/* Logo + toggle */}
        <div className={`border-b border-[#e5e5e5] mb-2 flex items-center ${collapsed ? 'px-2 py-2.5 justify-center' : 'px-3 py-2.5 justify-between'}`}>
          {!collapsed && (
            <img
              src="https://07iiwshc01.ufs.sh/f/0LiFpsMBmMUk1KdzLnbanW4CiUlp7AaDvuoZtTx8NYPy2jes"
              alt="Logo"
              className="h-7 w-auto"
            />
          )}
          <button
            onClick={toggleCollapse}
            className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            title={collapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {/* Menu items */}
        <div className="flex-1">
          {menuItems.map((item) => (
            <MenuItem
              key={item.route}
              icon={item.icon}
              label={item.label}
              route={item.route}
              isActive={isMenuActive(item)}
              isOpen={isMenuOpen(item.route)}
              onClick={() => handleMenuClick(item.route, !!item.items)}
              items={item.items}
              onItemClick={onMenuClick}
              activeView={activeView}
              collapsed={collapsed}
            />
          ))}
        </div>

        {/* Partner logo */}
        <div className={`px-3 py-3 flex items-center justify-center ${collapsed ? '' : 'gap-2.5'}`}>
          <img
            src="https://07iiwshc01.ufs.sh/f/0LiFpsMBmMUkmaGlKR0N7ktVqOnBU4LbKgYziJFTXcws1d5Z"
            alt="Partner"
            className={`w-auto ${collapsed ? 'h-5' : 'h-8'}`}
          />
          {!collapsed && <span className="text-xs font-semibold text-gray-400">Partner</span>}
        </div>

        {/* Footer items */}
        <div className="border-t border-[#e5e5e5] pt-2">
          {footerMenuItems.map((item) => (
            <MenuItem
              key={item.route}
              icon={item.icon}
              label={item.label}
              route={item.route}
              isActive={isMenuActive(item)}
              isOpen={isMenuOpen(item.route)}
              onClick={() => handleMenuClick(item.route, !!item.items)}
              items={item.items}
              onItemClick={onMenuClick}
              activeView={activeView}
              collapsed={collapsed}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
