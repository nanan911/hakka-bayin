import React, { useState, useEffect } from 'react';
import { Music, Info, HelpCircle, ArrowRight, X, Play, Volume2, BookOpen, ChevronRight, Award } from 'lucide-react';

// --- 資料數據 ---

const categories = [
  { id: 'all', name: '全部' },
  { id: 'wind', name: '吹管 (Wind)' },
  { id: 'bowed', name: '拉弦 (Bowed)' },
  { id: 'plucked', name: '彈撥 (Plucked)' },
  { id: 'percussion', name: '打擊 (Percussion)' },
];

const instruments = [
  {
    id: 1,
    name: '嗩吶 (Suona)',
    category: 'wind',
    material: '木、金 (Wood/Metal)',
    role: '主奏 (Lead)',
    description: '客家八音的靈魂，聲音高亢嘹亮。在八音中通常分為「大吹」與「小吹」，負責吹奏主旋律，引導整個樂隊。沒有嗩吶就不成八音。',
    soundDesc: '高亢、熱鬧、穿透力強',
    iconColor: 'bg-red-100 text-red-600'
  },
  {
    id: 2,
    name: '椰胡 (Yehu)',
    category: 'bowed',
    material: '匏、絲 (Gourd/Silk)',
    role: '伴奏 (Accompaniment)',
    description: '俗稱「殼仔弦」，琴筒由椰子殼製成，面板為梧桐木。音色渾厚低沉，是客家八音中極具特色的胡琴，與嗩吶形成完美的音色對比。',
    soundDesc: '低沉、渾厚、帶有鼻音',
    iconColor: 'bg-amber-100 text-amber-700'
  },
  {
    id: 3,
    name: '二胡 (Erhu)',
    category: 'bowed',
    material: '木、絲 (Wood/Silk)',
    role: '伴奏 (Accompaniment)',
    description: '雖然椰胡是核心，但二胡（或稱吊鬼仔）也常加入以豐富和聲。其音色柔美，能填補嗩吶與打擊樂之間的空隙。',
    soundDesc: '柔美、連貫',
    iconColor: 'bg-orange-100 text-orange-600'
  },
  {
    id: 4,
    name: '揚琴 (Yangqin)',
    category: 'plucked',
    material: '絲、竹 (Silk/Bamboo)',
    role: '節奏/旋律 (Rhythm/Melody)',
    description: '又稱「蝴蝶琴」，用竹製琴鍵敲擊。在八音中負責加強節奏感並裝飾旋律，其清脆的聲音如同「大珠小珠落玉盤」。',
    soundDesc: '清脆、顆粒感強',
    iconColor: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 5,
    name: '三弦 (Sanxian)',
    category: 'plucked',
    material: '絲、木、革 (Silk/Wood/Leather)',
    role: '伴奏 (Accompaniment)',
    description: '音色乾澀而有彈性，穿透力強。在樂隊中起到低音支撐和節奏推動的作用，常與揚琴搭配。',
    soundDesc: '乾澀、短促、有力',
    iconColor: 'bg-stone-100 text-stone-600'
  },
  {
    id: 6,
    name: '通鼓 (Tonggu)',
    category: 'percussion',
    material: '革、木 (Leather/Wood)',
    role: '節奏 (Rhythm)',
    description: '雙面鼓，置於鼓架上。演奏時主要擊打鼓心，聲音堅實，是控制樂曲速度的重要樂器。',
    soundDesc: '咚咚聲、穩重',
    iconColor: 'bg-slate-100 text-slate-600'
  },
  {
    id: 7,
    name: '小鈸 (Small Cymbals)',
    category: 'percussion',
    material: '金 (Metal)',
    role: '節奏裝飾',
    description: '金屬製成，聲音清脆。在八音中常配合鼓點，增加音樂的熱鬧氣氛，特別是在過門或高潮段落。',
    soundDesc: '清脆金屬聲',
    iconColor: 'bg-yellow-50 text-yellow-500'
  },
  {
    id: 8,
    name: '鑼 (Gong)',
    category: 'percussion',
    material: '金 (Metal)',
    role: '重音',
    description: '有大鑼與小鑼之分。在客家八音中，鑼聲具有威嚴感，常用於樂句的開始或結束，定調氣勢。',
    soundDesc: '延音長、震動感',
    iconColor: 'bg-gray-100 text-gray-600'
  }
];

const quizQuestions = [
  {
    question: "哪一種樂器被認為是客家八音的「靈魂」與主奏？",
    options: ["揚琴", "椰胡", "嗩吶", "通鼓"],
    correct: 2 // index
  },
  {
    question: "「椰胡」的琴筒通常是用什麼材質製作的？",
    options: ["木頭", "椰子殼", "金屬", "塑膠"],
    correct: 1
  },
  {
    question: "客家八音的「八音」是指什麼？",
    options: ["八首特定的曲子", "八個演奏者", "八種製作樂器的材料", "八個方位"],
    correct: 2
  },
  {
    question: "揚琴在八音中屬於哪一類樂器？",
    options: ["吹管", "拉弦", "彈撥(擊弦)", "打擊"],
    correct: 2
  }
];

// --- 組件 ---

const SvgPlaceholder = ({ type, className }) => {
  // 簡單的 SVG 圖形代表不同樂器類型
  if (type === 'wind') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="8">
        <path d="M30 80 L70 80 L60 20 L40 20 Z" fill="currentColor" opacity="0.2"/>
        <line x1="50" y1="20" x2="50" y2="90" />
        <circle cx="50" cy="15" r="10" />
        <path d="M20 90 Q50 100 80 90" strokeWidth="4" />
      </svg>
    );
  } else if (type === 'bowed') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="6">
        <rect x="40" y="60" width="20" height="30" rx="5" fill="currentColor" opacity="0.2"/>
        <line x1="50" y1="10" x2="50" y2="60" strokeWidth="8"/>
        <line x1="20" y1="40" x2="80" y2="50" strokeDasharray="4 4" />
      </svg>
    );
  } else if (type === 'plucked') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="6">
        <path d="M10 30 L90 30 L80 80 L20 80 Z" fill="currentColor" opacity="0.2"/>
        <line x1="20" y1="40" x2="80" y2="40" />
        <line x1="25" y1="50" x2="75" y2="50" />
        <line x1="30" y1="60" x2="70" y2="60" />
      </svg>
    );
  } else {
    // percussion
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="6">
        <circle cx="50" cy="50" r="30" fill="currentColor" opacity="0.2"/>
        <circle cx="50" cy="50" r="30" />
        <line x1="20" y1="80" x2="40" y2="60" strokeWidth="8" strokeLinecap="round"/>
        <line x1="80" y1="80" x2="60" y2="60" strokeWidth="8" strokeLinecap="round"/>
      </svg>
    );
  }
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const filteredInstruments = selectedCategory === 'all' 
    ? instruments 
    : instruments.filter(inst => inst.category === selectedCategory);

  const handlePlaySound = () => {
    setIsPlayingSound(true);
    setTimeout(() => setIsPlayingSound(false), 2000); // Simulate 2s sound
  };

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setActiveTab('quiz');
  };

  const resetApp = () => {
      setActiveTab('home');
      setSelectedInstrument(null);
  }

  // --- Views ---

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fadeIn px-4">
      <div className="relative">
        <div className="absolute -inset-4 bg-blue-500 opacity-20 blur-xl rounded-full"></div>
        <Music size={80} className="text-blue-900 relative z-10" />
      </div>
      
      <div className="space-y-4 max-w-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-wider">
          客家八音探索
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          聆聽土地的聲音，傳承千年的記憶。<br/>
          Hakka Ba-Yin: The Sound of Tradition
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
        <button 
          onClick={() => setActiveTab('gallery')}
          className="group flex items-center justify-center gap-3 bg-blue-900 text-white p-4 rounded-xl shadow-lg hover:bg-blue-800 transition-all hover:scale-105"
        >
          <BookOpen size={20} />
          <span className="font-bold">認識樂器</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={() => setActiveTab('quiz')}
          className="group flex items-center justify-center gap-3 bg-white text-blue-900 border-2 border-blue-900 p-4 rounded-xl shadow-lg hover:bg-blue-50 transition-all hover:scale-105"
        >
          <HelpCircle size={20} />
          <span className="font-bold">八音挑戰</span>
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="mt-12 p-4 bg-amber-50 rounded-lg border border-amber-200 max-w-md">
        <h3 className="font-bold text-amber-800 mb-2 flex items-center justify-center gap-2">
          <Info size={16}/> 什麼是客家八音？
        </h3>
        <p className="text-sm text-amber-900 text-justify">
          客家八音是客家族群最具代表性的傳統音樂。「八音」原指金、石、絲、竹、匏、土、革、木八種製作樂器的材料，現在則專指這種以嗩吶為主奏的傳統音樂形式。
        </p>
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="pb-24 animate-fadeIn">
      <div className="sticky top-0 bg-slate-50 z-10 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-blue-900">八音樂器圖鑑</h2>
          <button onClick={resetApp} className="text-sm text-slate-500 hover:text-blue-900">回首頁</button>
        </div>
        
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id 
                  ? 'bg-blue-900 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-blue-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredInstruments.map(item => (
          <div 
            key={item.id}
            onClick={() => setSelectedInstrument(item)}
            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-xl hover:border-blue-200 transition-all group flex flex-col items-center text-center"
          >
            <div className={`w-20 h-20 mb-3 rounded-full flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform duration-300`}>
              <SvgPlaceholder type={item.category} className="w-12 h-12" />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">{item.name}</h3>
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{item.role}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 animate-fadeIn">
      {!showResult ? (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-blue-900 p-6 text-white text-center">
            <h2 className="text-xl font-bold">八音小測驗</h2>
            <p className="text-blue-200 text-sm mt-1">第 {currentQuestion + 1} 題 / 共 {quizQuestions.length} 題</p>
          </div>
          
          <div className="p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6 leading-relaxed">
              {quizQuestions[currentQuestion].question}
            </h3>
            
            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerClick(idx)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    selectedAnswer === idx 
                      ? idx === quizQuestions[currentQuestion].correct 
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'bg-red-50 border-red-500 text-red-700'
                      : 'border-slate-100 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {selectedAnswer === idx && (
                      idx === quizQuestions[currentQuestion].correct 
                        ? <Award size={18} className="text-green-500"/> 
                        : <X size={18} className="text-red-500"/>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6 max-w-md w-full animate-bounce-in">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto text-yellow-600 mb-4">
            <Award size={48} />
          </div>
          <h2 className="text-3xl font-bold text-blue-900">測驗完成！</h2>
          <p className="text-lg text-slate-600">
            你的得分是： <span className="text-2xl font-bold text-blue-600">{score}</span> / {quizQuestions.length}
          </p>
          <div className="pt-6 border-t border-slate-200">
             <p className="text-sm text-slate-500 mb-4">{score === quizQuestions.length ? "太強了！你是八音專家！" : "再接再厲，多認識一下樂器吧！"}</p>
             <div className="flex gap-4">
               <button 
                 onClick={restartQuiz}
                 className="flex-1 bg-white border-2 border-blue-900 text-blue-900 py-3 rounded-xl font-bold hover:bg-blue-50"
               >
                 再玩一次
               </button>
               <button 
                 onClick={resetApp}
                 className="flex-1 bg-blue-900 text-white py-3 rounded-xl font-bold hover:bg-blue-800"
               >
                 回首頁
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );

  // --- Modal for Instrument Details ---

  const InstrumentModal = () => {
    if (!selectedInstrument) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4 animate-fadeIn">
        <div className="bg-white w-full md:w-[600px] h-[85vh] md:h-auto md:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          
          {/* Header Image Area */}
          <div className={`h-40 md:h-48 w-full ${selectedInstrument.iconColor} flex items-center justify-center relative`}>
            <button 
              onClick={() => setSelectedInstrument(null)}
              className="absolute top-4 right-4 bg-white/30 hover:bg-white/50 p-2 rounded-full text-current transition-colors"
            >
              <X size={24} />
            </button>
            <SvgPlaceholder type={selectedInstrument.category} className="w-32 h-32 opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/20 to-transparent">
               <h2 className="text-3xl font-bold text-white drop-shadow-md">{selectedInstrument.name}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <div className="flex gap-2 mb-6">
               <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200">
                 {categories.find(c => c.id === selectedInstrument.category)?.name}
               </span>
               <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
                 {selectedInstrument.role}
               </span>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">樂器介紹</h4>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {selectedInstrument.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 mb-1">製作材質</h4>
                  <p className="font-semibold text-slate-800">{selectedInstrument.material}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 mb-1">音色特徵</h4>
                  <p className="font-semibold text-slate-800">{selectedInstrument.soundDesc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Play Button */}
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <button 
              onClick={handlePlaySound}
              disabled={isPlayingSound}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all ${
                isPlayingSound 
                  ? 'bg-green-100 text-green-700 scale-95' 
                  : 'bg-blue-900 text-white hover:bg-blue-800 shadow-lg hover:shadow-xl'
              }`}
            >
              {isPlayingSound ? (
                <>
                  <Volume2 className="animate-pulse" /> 正在播放音色...
                </>
              ) : (
                <>
                  <Play fill="currentColor" /> 聆聽音色 (模擬)
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      {activeTab !== 'home' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-40 md:hidden shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 text-xs ${activeTab === 'home' ? 'text-blue-900 font-bold' : 'text-slate-400'}`}
          >
            <div className="p-1 rounded-full"><Award size={20}/></div>
            首頁
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`flex flex-col items-center gap-1 text-xs ${activeTab === 'gallery' ? 'text-blue-900 font-bold' : 'text-slate-400'}`}
          >
            <div className="p-1 rounded-full"><BookOpen size={20}/></div>
            圖鑑
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`flex flex-col items-center gap-1 text-xs ${activeTab === 'quiz' ? 'text-blue-900 font-bold' : 'text-slate-400'}`}
          >
            <div className="p-1 rounded-full"><HelpCircle size={20}/></div>
            測驗
          </button>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto min-h-screen relative">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'gallery' && renderGallery()}
        {activeTab === 'quiz' && renderQuiz()}
      </main>

      {/* Modals */}
      <InstrumentModal />

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default App;