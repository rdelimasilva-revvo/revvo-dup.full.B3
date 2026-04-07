import React from 'react';
import Logo from './Logo';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <header className="h-[48px] px-4 bg-white border-b border-[#e5e5e5] flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <div className="flex items-center min-w-0">
        <Logo />
      </div>
      <div className="flex items-center space-x-4">
        <UserMenu />
      </div>
    </header>
  );
}

export default Header;
