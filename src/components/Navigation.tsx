import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Navigation = () => {
  const { user, logout, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (e.target instanceof Node && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <nav className="sticky top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none">H+</span>
            </div>
            <h2 className="text-2xl font-bold text-primary tracking-tight">HomeValue+</h2>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">Buy</Link>
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">Rent</Link>
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">Sell</Link>
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">Loans</Link>
          <Link to="/login" className="text-sm text-gray-500 hover:text-gray-900 border-l border-gray-300 pl-8">Admin / User Login</Link>

          {user ? (
            <div className="relative ml-4" ref={dropdownRef}>
              <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  <User className="w-5 h-5" />
                </div>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-[2000]">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <div className="truncate font-medium">{user.email}</div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">{isAdmin ? 'Admin' : 'User'}</div>
                  </div>
                  <button onClick={() => { logout(); setShowDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2 mt-1 rounded-md">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="ml-4">
              <Button variant="outline" className="text-primary border-primary hover:bg-primary/5">Log In / Sign Up</Button>
            </Link>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          {user && (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2">
              <User className="w-5 h-5" />
            </div>
          )}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-md">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/" className="text-lg font-medium text-gray-800">Buy</Link>
            <Link to="/" className="text-lg font-medium text-gray-800">Rent</Link>
            <Link to="/" className="text-lg font-medium text-gray-800">Sell</Link>
            <Link to="/login" className="text-left text-lg font-medium text-gray-500">Admin / User Login</Link>
            <div className="pt-4 border-t border-gray-100">
              {user ? (
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">Signed in as {isAdmin ? 'Admin' : 'User'}</div>
                  <button onClick={logout} className="w-full py-2 text-red-600 font-medium flex items-center gap-2">
                    <LogOut className="w-5 h-5" /> Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Log In / Sign Up</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
