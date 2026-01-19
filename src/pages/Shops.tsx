import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const shops = [
    { id: 1, name: '컴포즈커피 부산본점', address: '부산광역시 기장군 기장해안로 232', tel: '051-123-4567' },
    { id: 2, name: '컴포즈커피 서울강남점', address: '서울특별시 강남구 테헤란로 123', tel: '02-987-6543' },
    { id: 3, name: '컴포즈커피 홍대입구역점', address: '서울특별시 마포구 양화로 456', tel: '02-111-2222' },
    { id: 4, name: '컴포즈커피 판교역점', address: '경기도 성남시 분당구 판교역로 789', tel: '031-333-4444' },
];

const StorePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStores = shops.filter(shop =>
        shop.name.includes(searchTerm) || shop.address.includes(searchTerm)
    );

    return (
        <div className="pt-24 min-h-screen bg-white">
            <section className="bg-brand-gray py-20 text-center">
                <h2 className="text-brand-yellow font-bold tracking-widest mb-4">STORE</h2>
                <h1 className="text-4xl md:text-5xl font-black">매장 찾기</h1>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-8">
                {/* Search Sidebar */}
                <div className="w-full md:w-1/3 space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="지역명 또는 매장명 검색"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-gray border-none focus:ring-2 focus:ring-brand-yellow font-medium"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>

                    <div className="h-[500px] overflow-y-auto pr-2 space-y-4">
                        {filteredStores.map(shop => (
                            <div key={shop.id} className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-brand-yellow transition-all cursor-pointer shadow-sm">
                                <h3 className="font-bold text-lg mb-2">{shop.name}</h3>
                                <p className="text-gray-500 text-sm mb-4 flex items-start">
                                    <MapPin size={16} className="mt-0.5 mr-2 shrink-0 text-brand-yellow" />
                                    {shop.address}
                                </p>
                                <p className="text-brand-black text-sm font-bold">{shop.tel}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map Area (Mock) */}
                <div className="hidden md:block flex-grow bg-brand-gray rounded-3xl relative overflow-hidden min-h-[600px] shadow-inner">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                        <MapPin size={48} className="mb-4 opacity-20" />
                        <p className="font-bold">지도 API 연동 영역 (준비 중)</p>
                        <p className="text-sm">실제 지도 데이터가 노출되는 영역입니다.</p>
                    </div>
                    {/* Fake Markers */}
                    <div className="absolute top-1/4 left-1/3 p-3 bg-brand-yellow text-brand-black rounded-full shadow-lg font-bold text-xs animate-bounce">
                        BUSAN 본점
                    </div>
                    <div className="absolute top-1/2 left-2/3 p-3 bg-brand-yellow text-brand-black rounded-full shadow-lg font-bold text-xs animate-bounce delay-100">
                        SEOUL 강남
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StorePage;
