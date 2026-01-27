import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    category: '칭찬',
    name: '',
    email: '',
    phone: '',
    title: '',
    content: '',
    agree: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
    alert("문의가 정상적으로 접수되었습니다.");
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Title Section */}
        <div className="border-b-2 border-brand-dark pb-6 mb-10">
          <h1 className="text-3xl font-black text-brand-dark">고객의 소리</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">나다커피를 이용하시면서 느끼신 불편사항이나 제안사항을 남겨주세요.</p>
        </div>

        {/* Info Box */}
        <div className="bg-gray-50 p-6 rounded-lg mb-12 text-sm text-gray-600 leading-relaxed border border-gray-200">
          <ul className="list-disc ml-5 space-y-1 font-medium">
            <li>고객님의 소중한 의견에 감사드립니다.</li>
            <li>문의하신 내용은 담당자 확인 후 빠른 시일 내에 답변 드리겠습니다.</li>
            <li>부적절한 게시물(광고, 도배, 욕설 등)은 사전 예고 없이 삭제될 수 있습니다.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form Table */}
          <div className="border-t-2 border-brand-dark">
            
            {/* Category */}
            <div className="flex border-b border-gray-200">
              <div className="w-32 md:w-48 bg-gray-50 px-6 py-4 flex items-center font-bold text-gray-700 border-r border-gray-200">
                구분 <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex-1 px-6 py-4 flex gap-6">
                {['칭찬', '불만', '제안', '문의'].map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer text-sm font-bold">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={formData.category === item}
                      onChange={() => setFormData({...formData, category: item})}
                      className="w-4 h-4 accent-brand-dark"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="flex border-b border-gray-200">
              <div className="w-32 md:w-48 bg-gray-50 px-6 py-4 flex items-center font-bold text-gray-700 border-r border-gray-200">
                작성자 <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex-1 px-6 py-3">
                <input 
                  type="text" 
                  required
                  className="w-full md:w-64 p-2 border border-gray-300 rounded focus:outline-none focus:border-brand-dark text-sm"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex border-b border-gray-200">
              <div className="w-32 md:w-48 bg-gray-50 px-6 py-4 flex items-center font-bold text-gray-700 border-r border-gray-200">
                이메일 <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex-1 px-6 py-3">
                <input 
                  type="email" 
                  required
                  className="w-full md:w-96 p-2 border border-gray-300 rounded focus:outline-none focus:border-brand-dark text-sm"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex border-b border-gray-200">
              <div className="w-32 md:w-48 bg-gray-50 px-6 py-4 flex items-center font-bold text-gray-700 border-r border-gray-200">
                연락처 <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex-1 px-6 py-3">
                <input 
                  type="tel" 
                  required
                  placeholder="010-0000-0000"
                  className="w-full md:w-64 p-2 border border-gray-300 rounded focus:outline-none focus:border-brand-dark text-sm"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* Title */}
            <div className="flex border-b border-gray-200">
              <div className="w-32 md:w-48 bg-gray-50 px-6 py-4 flex items-center font-bold text-gray-700 border-r border-gray-200">
                제목 <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex-1 px-6 py-3">
                <input 
                  type="text" 
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-brand-dark text-sm"
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex border-b border-gray-200">
              <div className="w-32 md:w-48 bg-gray-50 px-6 py-4 flex items-start font-bold text-gray-700 border-r border-gray-200">
                내용 <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex-1 px-6 py-3">
                <textarea 
                  required
                  rows={10}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-brand-dark resize-none text-sm"
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="mt-12">
            <h3 className="text-lg font-bold mb-4">개인정보 수집 및 이용 동의</h3>
            <div className="w-full h-40 overflow-y-scroll p-4 border border-gray-200 text-sm text-gray-500 leading-relaxed mb-4 bg-gray-50 font-medium">
              (주)나다커피는 고객님의 문의사항에 대한 답변 및 안내를 위해 아래와 같이 개인정보를 수집 및 이용합니다.<br/><br/>
              1. 수집항목: 작성자명, 이메일, 연락처<br/>
              2. 수집목적: 고객문의 접수 및 결과 회신<br/>
              3. 보유기간: 목적 달성 후 즉시 파기 (단, 관계법령에 따라 보존할 필요가 있는 경우 해당 기간까지 보관)<br/><br/>
              고객님은 개인정보 수집 및 이용에 동의하지 않을 권리가 있으며, 동의 거부 시 문의 접수가 제한될 수 있습니다.
            </div>
            <div className="flex justify-center">
              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input 
                  type="checkbox" 
                  required
                  checked={formData.agree}
                  onChange={(e) => setFormData({...formData, agree: e.target.checked})}
                  className="w-5 h-5 accent-brand-dark"
                />
                개인정보 수집 및 이용에 동의합니다.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-12 flex justify-center gap-4">
            <button 
              type="button"
              className="px-12 py-4 bg-gray-200 text-gray-700 font-bold rounded hover:bg-gray-300 transition-colors"
            >
              취소
            </button>
            <button 
              type="submit"
              className="px-12 py-4 bg-brand-dark text-white font-bold rounded hover:bg-black transition-colors"
            >
              작성완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
