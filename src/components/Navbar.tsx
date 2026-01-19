import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, LogIn } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        
        // Initial Theme Check
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const navLinks = [
        { name: 'BRAND', path: '/' },
        { name: 'FRANCHISE', path: '/franchise' },
        { name: 'MENU', path: '/menu' },
        { name: 'STORE', path: '/store' },
        { name: 'NEWS', path: '/news' },
        { name: 'PARTNER LOUNGE', path: '/partner' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-zinc-900 shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center">
                            <span className={isScrolled ? 'text-brand-black dark:text-white' : 'text-white'}>NADA</span>
                            <span className="text-brand-yellow ml-1 border-2 border-brand-yellow px-1">COFFEE</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {/* Nav Links */}
                        <div className="flex items-baseline space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-2 py-2 text-sm font-bold transition-colors ${isScrolled 
                                        ? 'text-brand-black dark:text-white hover:text-brand-yellow' 
                                        : 'text-white hover:text-brand-yellow'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center space-x-4 border-l pl-6 border-gray-300 dark:border-gray-700">
                             <button onClick={toggleTheme} className={`${isScrolled ? 'text-brand-black dark:text-white' : 'text-white'} hover:text-brand-yellow transition-colors`}>
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button className={`flex items-center space-x-1 text-sm font-bold ${isScrolled ? 'text-brand-black dark:text-white' : 'text-white'} hover:text-brand-yellow transition-colors`}>
                                <LogIn size={18} />
                                <span>로그인</span>
                            </button>
                            <button className={`flex items-center space-x-1 text-sm font-bold bg-brand-yellow text-brand-black px-3 py-1.5 rounded-full hover:bg-yellow-400 transition-colors`}>
                                <User size={18} />
                                <span>회원가입</span>
                            </button>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center space-x-4">
                        <button onClick={toggleTheme} className={`${isScrolled ? 'text-brand-black dark:text-white' : 'text-white'}`}>
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`${isScrolled ? 'text-brand-black dark:text-white' : 'text-white'} p-2`}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-zinc-800 shadow-lg absolute top-full left-0 w-full animate-in slide-in-from-top duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="block px-3 py-4 text-base font-bold text-brand-black dark:text-white hover:bg-brand-gray dark:hover:bg-zinc-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                         <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-4 flex flex-col space-y-3 px-3 pb-4">
                            <button className="flex items-center justify-center w-full space-x-2 text-brand-black dark:text-white font-bold border border-gray-300 dark:border-gray-600 rounded-lg py-3">
                                <LogIn size={18} />
                                <span>로그인</span>
                            </button>
                             <button className="flex items-center justify-center w-full space-x-2 bg-brand-yellow text-brand-black font-bold rounded-lg py-3">
                                <User size={18} />
                                <span>회원가입</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
