import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Globe, User, LogOut } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';
import { RESTAURANT } from '@/lib/restaurant';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const { count, setIsOpen } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/menu', label: t.nav.menu },
    { to: '/gallery', label: t.nav.gallery },
    { to: '/reservation', label: t.nav.reservation },
    { to: '/reviews', label: t.nav.reviews },
    { to: '/events', label: t.nav.events },
    { to: '/contact', label: t.nav.contact },
    { to: '/faq', label: t.nav.faq },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled 
            ? 'glass shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] border-b border-border/60' 
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent'
        )}
      >
        <nav className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-1 ring-gold/40 group-hover:ring-gold transition-all shadow-md">
                <img src={RESTAURANT.logo} alt="Sun City Restaurant logo" className="w-full h-full object-cover" />
              </div>
              <div className="leading-none">
                <span className={cn("font-heading text-xl font-semibold block tracking-wide transition-colors", scrolled ? "text-obsidian" : "text-white drop-shadow-sm")}>Sun City</span>
                <span className={cn("text-[10px] tracking-[0.25em] uppercase font-medium transition-colors", scrolled ? "text-muted-foreground" : "text-gold")}>Restaurant</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    'relative px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors',
                    location.pathname === l.to
                      ? 'text-gold font-semibold'
                      : scrolled
                        ? 'text-foreground/75 hover:text-obsidian'
                        : 'text-white/90 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                  )}
                >
                  {l.label}
                  {location.pathname === l.to && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-gold rounded-full" />}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className={cn(
                  "hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all",
                  scrolled
                    ? "border-border/80 hover:border-gold/50 hover:text-gold text-foreground"
                    : "border-white/30 text-white hover:border-gold hover:text-gold bg-black/25 backdrop-blur-sm"
                )}
                aria-label="Switch language"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === 'en' ? 'EN' : 'বাং'}
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className={cn(
                  "relative p-2.5 rounded-full border transition-all",
                  scrolled
                    ? "border-border/80 hover:border-gold/50 hover:text-gold text-foreground"
                    : "border-white/30 text-white hover:border-gold hover:text-gold bg-black/25 backdrop-blur-sm"
                )}
                aria-label="Open cart"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-burnt text-white text-[10px] font-bold flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>

              {/* User Account / Login */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all",
                      scrolled
                        ? "border-border/80 hover:border-gold/50 text-foreground"
                        : "border-white/30 text-white hover:border-gold bg-black/25 backdrop-blur-sm"
                    )}
                    aria-label="Account menu"
                  >
                    <User className="w-3.5 h-3.5 text-gold" />
                    <span className="hidden sm:inline max-w-[85px] truncate font-medium">
                      {user?.name || user?.email?.split('@')[0] || 'Account'}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-card border border-border shadow-2xl p-2 z-50 animate-fade-in text-xs">
                      <p className="px-3 py-1.5 text-muted-foreground truncate font-medium">{user?.email}</p>
                      <div className="h-px bg-border/60 my-1" />
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-burnt hover:bg-muted font-medium transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className={cn(
                    "hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all",
                    scrolled
                      ? "border-border/80 hover:border-gold/50 hover:text-gold text-foreground"
                      : "border-white/30 text-white hover:border-gold hover:text-gold bg-black/25 backdrop-blur-sm"
                  )}
                  aria-label="Sign in"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Login</span>
                </Link>
              )}

              <Link
                to="/reservation"
                className={cn(
                  "hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm",
                  scrolled
                    ? "bg-obsidian text-alabaster hover:bg-gold hover:text-obsidian"
                    : "bg-gold text-obsidian hover:bg-alabaster"
                )}
              >
                {t.cta.bookTable}
              </Link>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className={cn(
                  "lg:hidden p-2.5 rounded-full border transition-all",
                  scrolled ? "border-border/80 text-foreground" : "border-white/30 text-white bg-black/25"
                )}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {mobileOpen && (
          <div className="lg:hidden glass border-t border-border/60 max-h-[calc(100svh-5rem)] overflow-y-auto">
            <div className="px-5 py-4 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn('block px-4 py-3 rounded-xl text-sm font-medium', location.pathname === l.to ? 'bg-gold/10 text-gold' : 'text-foreground/80 hover:bg-muted')}
                >
                  {l.label}
                </Link>
              ))}

              <div className="pt-2 border-t border-border/40 mt-2 space-y-2">
                {isAuthenticated ? (
                  <div className="p-3 rounded-xl bg-secondary/40 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold">{user?.name || 'Account'}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        logout();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-burnt/10 text-burnt text-xs font-semibold flex items-center gap-1"
                    >
                      <LogOut className="w-3 h-3" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-xl border border-border text-center text-sm font-semibold hover:border-gold"
                  >
                    Log In / Register
                  </Link>
                )}

                <div className="flex gap-2">
                  <button onClick={toggle} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold flex items-center justify-center gap-2">
                    <Globe className="w-4 h-4" /> {lang === 'en' ? 'English' : 'বাংলা'}
                  </button>
                  <Link to="/reservation" className="flex-1 px-4 py-3 rounded-xl bg-obsidian text-alabaster text-sm font-semibold text-center">
                    {t.cta.bookTable}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}