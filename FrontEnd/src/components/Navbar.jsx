import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Scissors } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle anchor links when on a different page
    const handleNavClick = (e, href) => {
        if (href.startsWith('/#')) {
            const targetId = href.replace('/#', '');

            // If we are already on home, just scroll
            if (location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // If on another page, let the Link navigate to /#id, 
            // which React Router handles partially, but we might need a little timeout trick in App or Home
        }
        setIsOpen(false);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass shadow-sm' : 'py-6 bg-transparent'}`}>
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <Link to="/" className="text-2xl md:text-3xl font-serif font-bold text-[#0F4A46] flex items-center gap-2">
                    <Scissors className="text-[#C8A96B] transition-transform duration-500 hover:rotate-180" size={28} />
                    <span className="hidden sm:inline">M.Tahir Hussain</span>
                    <span className="sm:hidden">M.Tahir</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-sm uppercase tracking-wider font-medium text-[#0F4A46] hover:text-[#C8A96B] transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#C8A96B] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                    <Link to="/#contact" onClick={(e) => handleNavClick(e, '/#contact')} className="px-6 py-2.5 bg-[#0F4A46] text-[#F5F3EE] rounded-none hover:bg-[#C8A96B] hover:scale-105 transition-all duration-300 text-sm uppercase tracking-widest font-medium shadow-md hover:shadow-xl">
                        Request Quote
                    </Link>
                </div>

                <button className="md:hidden text-[#0F4A46]" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-[#0F4A46]/10 overflow-hidden bg-white/90"
                    >
                        <div className="flex flex-col items-center py-8 gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-lg font-serif text-[#0F4A46]"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/#contact" onClick={(e) => handleNavClick(e, '/#contact')} className="mt-4 px-8 py-3 bg-[#0F4A46] text-[#F5F3EE] text-sm uppercase tracking-widest">
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
