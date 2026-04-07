import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MenuItemData {
  label: string;
  route: string;
  icon?: LucideIcon;
  items?: MenuItemData[];
}

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  route: string;
  isActive?: boolean;
  isOpen?: boolean;
  depth?: number;
  onClick?: () => void;
  items?: MenuItemData[];
  onItemClick?: (route: string) => void;
  activeView?: string;
  collapsed?: boolean;
}

const MenuItem = ({
  icon: Icon,
  label,
  route,
  isActive,
  isOpen,
  depth = 0,
  onClick,
  items,
  onItemClick,
  activeView,
  collapsed = false,
}: MenuItemProps) => {
  const hasSubmenu = items && items.length > 0;
  const isMainMenuItem = depth === 0;

  const isItemActive = (item: MenuItemData): boolean => {
    if (activeView === item.route) return true;
    if (item.items) {
      return item.items.some(subItem => isItemActive(subItem));
    }
    return false;
  };

  const isCurrentItemActive = isActive || (hasSubmenu && items?.some(item => isItemActive(item)));

  const fontSize = isMainMenuItem ? 'text-sm' : 'text-[13px]';
  const handleClick = () => {
    if (hasSubmenu) {
      onClick?.();
    } else {
      onItemClick?.(route);
    }
  };

  // Collapsed mode: only show icon for top-level items
  if (collapsed && isMainMenuItem) {
    return (
      <div className="relative group">
        <button
          onClick={handleClick}
          className={`w-full flex items-center justify-center py-2.5 transition-colors duration-150 ${
            isCurrentItemActive
              ? 'bg-[#ebf8ff] text-[#0070f2]'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          title={label}
        >
          <Icon className={`w-[18px] h-[18px] transition-colors duration-150 ${
            isCurrentItemActive ? 'text-[#0070f2]' : 'text-gray-600'
          }`} />
        </button>
        {/* Tooltip */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
          {label}
        </div>
      </div>
    );
  }

  // Don't render sub-items when collapsed
  if (collapsed && !isMainMenuItem) {
    return null;
  }

  const paddingLeft = depth * 12 + 16;

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center py-2.5 ${fontSize} text-left transition-colors duration-150 ${
          isCurrentItemActive
            ? 'bg-[#ebf8ff] text-[#0070f2]'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        style={{ paddingLeft: `${paddingLeft}px`, paddingRight: '12px' }}
      >
        <div className="flex items-center min-w-[20px]">
          {isMainMenuItem && (
            <Icon className={`w-[18px] h-[18px] transition-colors duration-150 ${
              isCurrentItemActive ? 'text-[#0070f2]' : 'text-gray-600'
            }`} />
          )}
        </div>
        <span className={`${isMainMenuItem ? 'ml-2.5' : ''} flex-1 text-left font-medium leading-tight`}>{label}</span>
        {hasSubmenu && (
          <div className={`transition-colors duration-150 ${isCurrentItemActive ? 'text-[#0070f2]' : 'text-gray-400'}`}>
            {isOpen
              ? <ChevronDown className="w-5 h-5 ml-2" />
              : <ChevronRight className="w-5 h-5 ml-2" />
            }
          </div>
        )}
      </button>
      {hasSubmenu && isOpen && (
        <div className="transition-all duration-200">
          {items.map((item, index) => (
            <MenuItem
              key={`${item.route}-${index}`}
              icon={item.icon || Icon}
              label={item.label}
              route={item.route}
              isActive={isItemActive(item)}
              isOpen={isOpen}
              depth={depth + 1}
              onClick={() => item.items ? onClick?.() : onItemClick?.(item.route)}
              items={item.items}
              onItemClick={onItemClick}
              activeView={activeView}
              collapsed={collapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuItem;
