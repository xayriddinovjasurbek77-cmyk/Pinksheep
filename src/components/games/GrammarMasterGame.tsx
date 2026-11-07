import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, Award } from 'lucide-react';

interface GrammarQuestion {
  id: number;
  prompt: string;
  ruleExplanation: string;
  options: { text: string; isCorrect: boolean }[];
}

const GRAMMAR_QUESTIONS: GrammarQuestion[] = [
  {
    id: 1,
    prompt: 'Had the government _______ comprehensive digital infrastructure earlier, regional disparities would have been far less acute.',
    ruleExplanation: 'Uchinchi darajali shart ergash gaplarida inversiya (Inverted Conditionals): "Had + subject + past participle (implemented)" tuzilishi qo‘llanadi.',
    options: [
      { text: 'implemented', isCorrect: true },
      { text: 'implement', isCorrect: false },
      { text: 'have implemented', isCorrect: false },
      { text: 'implementing', isCorrect: false }
    ]
  },
  {
    id: 2,
    prompt: 'Not only _______ the academic literature, but she also conducted extensive empirical fieldwork.',
    ruleExplanation: 'Salbiy ko‘rsatkichli iboralar ("Not only...") gap boshida kelganda inversiya yasaladi: "Not only did she synthesize..."',
    options: [
      { text: 'did she synthesize', isCorrect: true },
      { text: 'she synthesized', isCorrect: false },
      { text: 'she has synthesized', isCorrect: false },
      { text: 'she did synthesize', isCorrect: false }
    ]
  },
  {
    id: 3,
    prompt: 'Having _______ the research methodology, the scholars published their peer-reviewed findings.',
    ruleExplanation: 'Mukammal sifatdosh (Perfect Participle Clause): "Having + past participle (validated)" asosiy ish-harakatdan oldin sodir bo‘lgan jarayonni bildiradi.',
    options: [
      { text: 'validated', isCorrect: true },
      { text: 'validating', isCorrect: false },
      { text: 'validate', isCorrect: false },
      { text: 'validates', isCorrect: false }
    ]
  }
];

export const GrammarMasterGame: React.FC = () => {
  const { setActiveTab, addCoins, recordGamePlayed } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQ = GRAMMAR_QUESTIONS[currentIndex];

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);

    if (currentQ.options[idx].isCorrect) {
      setScore(prev => prev + 1);
      setCoinsEarned(prev => prev + 10);
      addCoins(10, 'Grammar Master g‘alabasi', 'Murakkab grammatik tuzilma to‘g‘ri topildi', 'game');
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < GRAMMAR_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      recordGamePlayed(score >= 2);
    }
  };

  return (
    <div className="space-y-6 text-left pb-16">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('games')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#85818A] hover:text-[#EC008C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Barcha o‘yinlar</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#85818A] tabular-nums">
            {currentIndex + 1} / {GRAMMAR_QUESTIONS.length}
          </span>
          <div className="px-3 py-1 bg-[#FFF0F7] rounded-full border border-[#FCE7F3] text-xs font-bold text-[#EC008C] flex items-center gap-1">
            <span>Ⓟ</span>
            <span>+{coinsEarned}</span>
          </div>
        </div>
      </div>

      {isComplete ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F5E6EF] shadow-lg text-center max-w-xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#FFF0F7] flex items-center justify-center mx-auto text-[#EC008C]">
            <Trophy className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#242124]">Grammatika ustasi yakunlandi!</h2>
          <p className="text-sm text-[#85818A]">
            Siz murakkab akademik tuzilmalarni sinovdan o‘tkazib, {score} ta to‘g‘ri natijaga erishdingiz.
          </p>
          <div className="p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] inline-flex items-center gap-4">
            <span className="text-xs font-bold text-[#85818A]">Mukofot:</span>
            <span className="text-xl font-extrabold text-[#EC008C]">+{coinsEarned} Pink Coin</span>
          </div>
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedIdx(null);
                setIsAnswered(false);
                setIsComplete(false);
                setScore(0);
                setCoinsEarned(0);
              }}
              className="px-6 py-3 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-2xl shadow-md transition-all"
            >
              Qayta o‘ynash
            </button>
            <button
              onClick={() => setActiveTab('games')}
              className="px-6 py-3 bg-white border border-[#E8E4EC] text-[#242124] text-xs font-bold rounded-2xl"
            >
              O‘yinlar menyusi
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#F5E6EF] shadow-xs space-y-6">
          <div>
            <span className="text-[11px] font-extrabold text-[#EC008C] uppercase tracking-wider block mb-1">
              Grammatika ustasi
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#242124] leading-relaxed">
              Bo‘sh joyga to‘g‘ri akademik grammatik shaklni joylashtiring:
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-base sm:text-lg font-semibold text-[#242124] leading-relaxed">
            {currentQ.prompt}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedIdx === i;
              let style = 'bg-white border-[#E8E4EC] hover:border-[#EC008C] hover:bg-[#FFF8FC]';

              if (isAnswered) {
                if (opt.isCorrect) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                } else if (isSelected) {
                  style = 'bg-red-50 border-red-400 text-red-900';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border text-sm font-semibold transition-all text-center ${style}`}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] space-y-1.5">
              <span className="text-[11px] font-extrabold text-[#EC008C] uppercase tracking-wider">
                Grammatik qoida va tushuntirish:
              </span>
              <p className="text-xs text-[#242124] leading-relaxed">
                {currentQ.ruleExplanation}
              </p>
            </div>
          )}

          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-2xl shadow-md transition-all active:scale-95"
              >
                <span>Keyingi savol</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
