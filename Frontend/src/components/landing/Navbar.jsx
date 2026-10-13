import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

/**
 * Editorial Floating Pill Navbar
 * - Floating pill pinned at top with margin
 * - Blurred backdrop appears only when scrolled > 20px
 * - Contains Logo, 3 navigation anchors, ThemeToggle, "Log in", and "Get started"
 * - Responsive: Collapses to accessible hamburger drawer on mobile with >=44px touch targets
 */
export default function Navbar({
  theme = 'light',
  onToggleTheme,
  onOpenAuth,
  onEnterStudio,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'The Loop', href: '#the-loop' },
    { label: 'Capabilities', href: '#features' },
    { label: 'Methodology', href: '#methodology' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4 transition-all">
      <div className="max-w-6xl mx-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center justify-between px-3.5 sm:px-5 py-2.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-[var(--bg-paper)]/85 dark:bg-[var(--bg-paper)]/90 backdrop-blur-md border-[var(--border-paper)] shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
              : 'bg-transparent border-transparent'
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <div className="flex items-center">
            <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          </div>

          {/* Desktop Navigation Links (Editorial Monospace/Geist with subtle hover) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group relative px-3 py-2 text-sm font-sans font-medium text-[var(--text-ink-muted)] hover:text-[var(--text-ink)] transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)]"
              >
                <span className="font-mono text-[10px] text-[var(--accent-orange-text)] mr-1.5 opacity-70 group-hover:opacity-100">
                  0{idx + 1}
                </span>
                {link.label}
              </a>
            ))}
          </div>

          {/* Action cluster (Theme toggle + Auth links) */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              type="button"
              onClick={() => onOpenAuth?.('signin')}
              className="px-3.5 py-2 text-sm font-sans font-medium text-[var(--text-ink)] hover:text-[var(--accent-orange-text)] transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] cursor-pointer"
            >
              Log in
            </button>

            {/* High-contrast tactile action button with lift & press */}
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => onOpenAuth?.('signup')}
              className="relative px-5 py-2 text-sm font-sans font-medium rounded-full bg-[var(--text-ink)] text-[var(--bg-paper)] hover:bg-[var(--accent-orange)] hover:text-white transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] cursor-pointer"
            >
              Get started
            </motion.button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-full text-[var(--text-ink)] hover:bg-[var(--bg-paper-secondary)]/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)]"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center">
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-transform duration-250 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-opacity duration-200 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-transform duration-250 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Hamburger Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[68px] z-40 bg-[var(--bg-paper)]/95 backdrop-blur-xl border-t border-[var(--border-paper)] md:hidden flex flex-col px-6 py-8 justify-between"
          >
            <div className="space-y-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--accent-orange-text)] mb-2">
                Table of Contents
              </div>

              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="flex items-baseline gap-3 py-3 text-2xl font-display font-semibold text-[var(--text-ink)] hover:text-[var(--accent-orange)] border-b border-[var(--border-paper)] transition-colors"
                >
                  <span className="font-mono text-sm text-[var(--accent-orange-text)]">
                    0{idx + 1}
                  </span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            <div className="pt-6 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth?.('signin');
                }}
                className="w-full min-h-[48px] py-3 text-base font-sans font-medium rounded-xl border border-[var(--border-paper)] text-[var(--text-ink)] hover:bg-[var(--bg-paper-secondary)] transition-colors"
              >
                Log in to Account
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth?.('signup');
                }}
                className="w-full min-h-[48px] py-3 text-base font-sans font-medium rounded-xl bg-[var(--accent-orange)] text-white hover:bg-[var(--accent-orange-text)] transition-colors shadow-sm"
              >
                Get started — Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
