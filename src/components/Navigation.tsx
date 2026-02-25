// src/components/Navigation.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface NavigationProps {
  onAdminClick?: () => void;
}

export const Navigation = ({ onAdminClick }: NavigationProps) => {
  const { user, logout, getHistory } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const history = showHistory ? getHistory() : [];
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (e.target instanceof Node && !dropdownRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-brand-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H+</span>
            </div>
            <h2 className="text-2xl font-bold text-gradient-primary">HomeValue+</h2>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </button>
            <button onClick={() => scrollToSection('features')} className="text-foreground hover:text-primary transition-colors font-medium">
              Features
            </button>
            <button onClick={() => scrollToSection('recommendations')} className="text-foreground hover:text-primary transition-colors font-medium">
              Recommendations
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </button>

            <Button
              variant="outline"
              size="sm"
              onClick={onAdminClick}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Admin
            </Button>

            {/* Auth area */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <Button
                  onClick={() => setShowHistory(v => !v)}
                  className="px-3 py-1 rounded-full bg-white/10 text-white flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                </Button>

                {showHistory && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg p-3 text-sm text-gray-800 z-[2000]">
                    <div className="flex items-center justify-between mb-2">
                      <strong>Login History</strong>
                      <button
                        onClick={() => { logout(); setShowHistory(false); }}
                        className="text-sm text-red-600 flex items-center gap-1"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>

                    <div className="max-h-44 overflow-auto">
                      {history.length === 0 ? (
                        <div className="text-xs text-gray-500">No logins yet.</div>
                      ) : (
                        history.map((h, idx) => (
                          <div key={idx} className="py-1 border-b last:border-b-0 border-gray-100">
                            <div className="text-xs text-gray-600">{new Date(h.at).toLocaleString()}</div>
                            <div className="text-sm">{h.email}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button className="bg-white/10 text-white">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {/* show login button on mobile if not logged in */}
            <div className="md:hidden">
              {user ? (
                <Button
                  onClick={() => setShowHistory(v => !v)}
                  className="px-2 py-1 rounded-full bg-white/10 text-white mr-2"
                >
                  <User className="w-4 h-4" />
                </Button>
              ) : (
                <Link to="/login" className="mr-2">
                  <Button className="bg-white/10 text-white">Login</Button>
                </Link>
              )}
            </div>

            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMobileMenuOpen(v => !v)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-border/20 animate-fade-up z-[1000]">
            <div className="p-6 space-y-4">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2">
                Home
              </button>
              <button onClick={() => scrollToSection('features')} className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2">
                Features
              </button>
              <button onClick={() => scrollToSection('recommendations')} className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2">
                Recommendations
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2">
                Contact
              </button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onAdminClick?.();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Admin Login
              </Button>

              {/* Mobile auth area */}
              {user ? (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">{user.email}</div>
                      <div className="text-xs text-gray-500">Logged in</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => { setIsMobileMenuOpen(false); setShowHistory(true); }}
                        className="px-3 py-1 rounded-full bg-white/10 text-white"
                      >
                        View History
                      </Button>
                      <Button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="px-3 py-1 rounded-full bg-red-600 text-white">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <Button className="w-full bg-white/10 text-white">Login</Button>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Mobile: render the history dropdown as a panel (when showHistory opened from mobile) */}
        {showHistory && isMobileMenuOpen && user && (
          <div className="md:hidden absolute top-[calc(100%+8px)] right-6 w-72 bg-white rounded-md shadow-lg p-3 text-sm text-gray-800 z-[2000]">
            <div className="flex items-center justify-between mb-2">
              <strong>Login History</strong>
              <button onClick={() => { logout(); setShowHistory(false); }} className="text-sm text-red-600 flex items-center gap-1">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>

            <div className="max-h-44 overflow-auto">
              {history.length === 0 ? (
                <div className="text-xs text-gray-500">No logins yet.</div>
              ) : (
                history.map((h, idx) => (
                  <div key={idx} className="py-1 border-b last:border-b-0 border-gray-100">
                    <div className="text-xs text-gray-600">{new Date(h.at).toLocaleString()}</div>
                    <div className="text-sm">{h.email}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
