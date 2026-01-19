import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-black text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="text-2xl font-bold tracking-tighter mb-4">
                            <span>NADA</span>
                            <span className="text-brand-yellow ml-1 border-2 border-brand-yellow px-1">COFFEE</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
                            컴포즈커피는 최고의 맛과 품질을 자랑하는 원두를 직접 볶아 고객님들께 제공합니다.
                            언제나 신선하고 맛있는 커피를 부담 없는 가격에 만나보세요.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-zinc-800 rounded-full hover:bg-brand-yellow hover:text-brand-black transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="p-2 bg-zinc-800 rounded-full hover:bg-brand-yellow hover:text-brand-black transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2 bg-zinc-800 rounded-full hover:bg-brand-yellow hover:text-brand-black transition-all">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">INFORMATION</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-brand-yellow transition-colors">이용약관</a></li>
                            <li><a href="#" className="hover:text-brand-yellow transition-colors text-white font-medium">개인정보처리방침</a></li>
                            <li><a href="#" className="hover:text-brand-yellow transition-colors">이메일무단수집거부</a></li>
                            <li><a href="#" className="hover:text-brand-yellow transition-colors">채용안내</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">CONTACT US</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li>본사: 부산광역시 기장군 기장읍 기장해안로 232</li>
                            <li>가맹사업문의: 1899-1234</li>
                            <li>고객센터: 1544-1234</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© 2026 NADA COFFEE. ALL RIGHTS RESERVED.</p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <span>Family Site: (주)컴포즈커피</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
