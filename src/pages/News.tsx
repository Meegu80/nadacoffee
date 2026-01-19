import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface NewsItem {
    id: number;
    title: string;
    date: string;
    content: string;
    category: 'NOTICE' | 'EVENT';
}

const newsData: NewsItem[] = [
    {
        id: 1,
        category: 'NOTICE',
        title: 'NADA COFFEE 리브랜딩 안내',
        date: '2026.01.12',
        content: '안녕하세요, NADA COFFEE입니다. 기존 Compose Coffee에서 NADA COFFEE로 브랜드명이 변경되었습니다. 더 좋은 품질과 서비스로 보답하겠습니다.'
    },
    {
        id: 2,
        category: 'EVENT',
        title: '오픈 기념 1+1 이벤트 진행',
        date: '2026.01.15',
        content: '리브랜딩 오픈 기념으로 전 메뉴 1+1 이벤트를 진행합니다. 기간: 1/15 ~ 1/21 (7일간)'
    },
    {
        id: 3,
        category: 'NOTICE',
        title: '2026년 설 연휴 영업 안내',
        date: '2026.02.01',
        content: '설 연휴 기간 동안 일부 매장의 영업 시간이 조정될 수 있습니다. 방문 전 각 매장에 확인 부탁드립니다.'
    },
    {
        id: 4,
        category: 'EVENT',
        title: '딸기 시즌 메뉴 출시기념 스탬프 2배 적립',
        date: '2026.02.10',
        content: '딸기 시즌 메뉴 3종 구매 시 스탬프를 2배로 적립해 드립니다. 많은 사랑 부탁드립니다.'
    },
    {
        id: 5,
        category: 'NOTICE',
        title: '개인정보처리방침 개정 안내',
        date: '2026.02.15',
        content: '개인정보보호법 개정에 따라 당사의 개인정보처리방침이 일부 변경됩니다. 상세 내용은 홈페이지 하단을 참고해 주세요.'
    },
    {
        id: 6,
        category: 'EVENT',
        title: '신규 회원 가입 시 아메리카노 무료 쿠폰 증정',
        date: '2026.03.01',
        content: 'NADA COFFEE 앱 신규 가입 고객님께 아메리카노(R) 무료 교환권을 드립니다.'
    },
    {
        id: 7,
        category: 'NOTICE',
        title: '친환경 빨대 도입 안내',
        date: '2026.03.10',
        content: '환경 보호를 위해 3월 15일부터 전 매장에 종이 빨대가 도입됩니다. 고객님의 양해 부탁드립니다.'
    },
    {
        id: 8,
        category: 'EVENT',
        title: '봄 시즌 한정 "벚꽃 라떼" 출시',
        date: '2026.03.20',
        content: '봄의 향기를 담은 벚꽃 라떼가 출시되었습니다. 핑크빛 봄을 즐겨보세요.'
    },
    {
        id: 9,
        category: 'NOTICE',
        title: '시스템 점검 안내 (4/1 02:00 ~ 06:00)',
        date: '2026.03.25',
        content: '보다 안정적인 서비스 제공을 위해 시스템 점검이 진행될 예정입니다. 점검 시간에는 앱 사용이 제한됩니다.'
    },
    {
        id: 10,
        category: 'EVENT',
        title: 'NADA COFFEE 굿즈 런칭 이벤트',
        date: '2026.04.01',
        content: 'NADA COFFEE만의 감성을 담은 텀블러와 머그컵이 출시되었습니다. 구매 고객님께 드립백 커피를 증정합니다.'
    },
];

const NewsPage: React.FC = () => {
    const [expandedIds, setExpandedIds] = useState<number[]>([]);
    const [visibleCount, setVisibleCount] = useState(5);

    const toggleExpand = (id: number) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 5, newsData.length));
    };

    const visibleItems = newsData.slice(0, visibleCount);

    return (
        <div className="pt-24 min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-300">
            {/* Header */}
            <section className="bg-brand-gray dark:bg-zinc-800 py-20 text-center transition-colors">
                <h2 className="text-brand-yellow font-bold tracking-widest mb-4">NEWS</h2>
                <h1 className="text-4xl md:text-5xl font-black text-brand-black dark:text-white">새소식</h1>
            </section>

            {/* News List */}
            <section className="max-w-4xl mx-auto px-4 py-20 pb-32">
                <div className="space-y-4">
                    {visibleItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <button
                                onClick={() => toggleExpand(item.id)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                            >
                                <div className="flex-1 pr-4">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${item.category === 'NOTICE' ? 'bg-gray-500' : 'bg-brand-yellow'}`}>
                                            {item.category === 'NOTICE' ? '공지' : '이벤트'}
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium">{item.date}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-brand-black dark:text-white group-hover:text-brand-yellow transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className={`text-gray-400 dark:text-zinc-500 transition-transform duration-300 ${expandedIds.includes(item.id) ? 'rotate-180' : ''}`}>
                                    <ChevronDown size={24} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {expandedIds.includes(item.id) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="bg-gray-50 dark:bg-zinc-700/30"
                                    >
                                        <div className="px-6 py-6 border-t border-gray-100 dark:border-zinc-700 text-gray-600 dark:text-gray-300 text-sm leading-7 whitespace-pre-line">
                                            {item.content}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                {visibleCount < newsData.length && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={handleLoadMore}
                            className="px-10 py-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-full font-bold text-brand-black dark:text-white shadow-sm hover:shadow-md hover:border-brand-yellow transition-all"
                        >
                            더 보기 (+5)
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default NewsPage;
