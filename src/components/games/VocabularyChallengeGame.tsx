import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, BookOpen } from 'lucide-react';

interface VocabCard {
  id: number;
  word: string;
  pronunciation: string;
  pos: string;
  meaningUz: string;
  synonym: string;
  exampleSentence: string;
  options: string[];
}

const VOCAB_DATA: VocabCard[] = [
  {
    id: 1,
    word: 'Ubiquitous',
    pronunciation: '/juːˈbɪk.wɪ.təs/',
    pos: 'adjective',
    meaningUz: 'Hamma joyda uchraydigan, keng tarqalgan',
    synonym: 'omnipresent, pervasive',
    exampleSentence: 'Digital connectivity has become ubiquitous in modern research environments.',
    options: [
      'Hamma joyda uchraydigan, keng tarqalgan',
      'Tez yo‘qolib ketadigan',
      'Faqat qishloq joylarga xos bo‘lgan',
      'Qimmatbaho va noyob'
    ]
  },
  {
    id: 2,
    word: 'Mitigate',
    pronunciation: '/ˈmɪt.ɪ.ɡeɪt/',
    pos: 'verb',
    meaningUz: "Yumshatmoq, salbiy ta'sirni kamaytirmoq",
    synonym: 'alleviate, diminish',
    exampleSentence: 'Systemic policy interventions are urgently needed to mitigate rural educational disparities.',
    options: [
      "Yumshatmoq, salbiy ta'sirni kamaytirmoq",
      'Vaziyatni yanada murakkablashtirmoq',
      'To‘liq bekor qilmoq',
      'Kattalashtirib ko‘rsatmoq'
    ]
  },
  {
    id: 3,
    word: 'Pivotal',
    pronunciation: '/ˈpɪv.ə.təl/',
    pos: 'adjective',
    meaningUz: 'Hal qiluvchi, o‘ta muhim burilish nuqtasi bo‘lgan',
    synonym: 'crucial, vital, decisive',
    exampleSentence: 'Effective mentorship played a pivotal role in shaping my academic trajectory.',
    options: [
      'Hal qiluvchi, o‘ta muhim burilish nuqtasi bo‘lgan',
      'Qiziqarsiz va odatiy',
      'Ikkilamchi ahamiyatga ega',
      'Vaqtinchalik qabul qilingan'
    ]
  }
];

export const VocabularyChallengeGame: React.FC = () => {
  const { setActiveTab, addCoins, recordGamePlayed } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const current = VOCAB_DATA[currentIndex];

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleSelect = (option: string) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === current.meaningUz) {
      setScore(prev => prev + 1);
      setCoinsEarned(prev => prev + 10);
      addCoins(10, 'Vocabulary Challenge g‘alabasi', `So‘z: ${current.word}`, 'game');
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < VOCAB_DATA.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
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
            {currentIndex + 1} / {VOCAB_DATA.length}
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
          <h2 className="text-2xl font-extrabold text-[#242124]">Lug‘at sinovi yakunlandi!</h2>
          <p className="text-sm text-[#85818A]">
            Siz {VOCAB_DATA.length} ta xalqaro akademik so‘zdan {score} tasini to‘g‘ri aniqladingiz.
          </p>
          <div className="p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] inline-flex items-center gap-4">
            <span className="text-xs font-bold text-[#85818A]">Mukofot:</span>
            <span className="text-xl font-extrabold text-[#EC008C]">+{coinsEarned} Pink Coin</span>
          </div>
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedAnswer(null);
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
          {/* Word Card */}
          <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-[#FFF5FA] to-white border border-[#FCE7F3] space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#EC008C] bg-[#FFF0F7] px-3 py-1 rounded-full border border-[#FCE7F3]">
              {current.pos} · {current.pronunciation}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#242124] tracking-tight">
              {current.word}
            </h2>
            <p className="text-xs text-[#85818A] italic">
              Sinonimlari: <strong className="text-[#242124] font-semibold">{current.synonym}</strong>
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#85818A] block">
              Ushbu so‘zning o‘zbekcha aniq ma'nosini tanlang:
            </span>

            <div className="space-y-2.5">
              {current.options.map((opt, i) => {
                const isCorrect = opt === current.meaningUz;
                const isSelected = selectedAnswer === opt;
                let cardStyle = 'bg-white border-[#E8E4EC] hover:border-[#EC008C] hover:bg-[#FFF8FC]';

                if (isAnswered) {
                  if (isCorrect) {
                    cardStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                  } else if (isSelected) {
                    cardStyle = 'bg-red-50 border-red-300 text-red-900';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl border text-sm text-left transition-all flex items-center justify-between ${cardStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Exemplar Sentence */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] space-y-2">
              <span className="text-[11px] font-extrabold text-[#EC008C] uppercase tracking-wider">
                Inshoda qo‘llanilish namunasi:
              </span>
              <p className="text-xs sm:text-sm text-[#242124] italic font-serif leading-relaxed">
                "{current.exampleSentence}"
              </p>
            </div>
          )}

          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-2xl shadow-md transition-all active:scale-95"
              >
                <span>Keyingi so‘z</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
