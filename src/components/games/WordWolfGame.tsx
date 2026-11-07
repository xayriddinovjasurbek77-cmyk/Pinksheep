import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PinkSheepMascot } from '../common/PinkSheepMascot';
import {
  ArrowLeft,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  ArrowRight
} from 'lucide-react';

interface Question {
  id: number;
  sentencePre: string;
  weakWord: string;
  sentencePost: string;
  options: { text: string; isCorrect: boolean }[];
  correctWord: string;
  explanation: string;
  whyItMatters: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    sentencePre: 'The teachers',
    weakWord: 'help',
    sentencePost: 'students to think about their future.',
    options: [
      { text: 'support / empower', isCorrect: true },
      { text: 'make', isCorrect: false },
      { text: 'get', isCorrect: false },
      { text: 'push', isCorrect: false }
    ],
    correctWord: 'support / empower',
    explanation: '"Encourage", "guide" yoki "empower" o‘qituvchining rolini umumiy "help" so‘ziga qaraganda ancha aniqroq va akademik ifodalaydi.',
    whyItMatters: 'Grant komissiyalari birinchi xatboshidayoq so‘z boyligingizga e\'tibor qaratadi. Bitta noaniq so‘zni aniqrog‘iga almashtirish akademik ingliz tilini nazorat qila olishingizni namoyish etadi.'
  },
  {
    id: 2,
    sentencePre: 'This innovative policy will have a',
    weakWord: 'big',
    sentencePost: 'influence on local youth development.',
    options: [
      { text: 'substantial / profound', isCorrect: true },
      { text: 'large', isCorrect: false },
      { text: 'huge', isCorrect: false },
      { text: 'giant', isCorrect: false }
    ],
    correctWord: 'substantial / profound',
    explanation: '"Big" yoki "huge" kabi so‘zlashuv tilidagi sifatlar o‘rniga "substantial" yoki "profound" so‘zlarini qo‘llash inshoning ilmiy vaznini oshiradi.',
    whyItMatters: 'Akademik matnlarda miqdor va ta\'sirni ifodalashda rasmiy akademik sifatlardan foydalanish talab etiladi.'
  },
  {
    id: 3,
    sentencePre: 'Researchers must',
    weakWord: 'show',
    sentencePost: 'the factual validity of their findings.',
    options: [
      { text: 'substantiate / demonstrate', isCorrect: true },
      { text: 'tell', isCorrect: false },
      { text: 'say', isCorrect: false },
      { text: 'reveal', isCorrect: false }
    ],
    correctWord: 'substantiate / demonstrate',
    explanation: `"Show" o‘rniga "substantiate" yoki "demonstrate" fe'llarini ishlatish fikrni dalillar bilan mustahkamlashni ifodalaydi.`,
    whyItMatters: `Ilmiy tadqiqotlar va grant insholarida "isbotlash" ma'nosidagi fe'llar xalqaro darajani belgilaydi.`
  },
  {
    id: 4,
    sentencePre: 'Global digital platforms have',
    weakWord: 'changed',
    sentencePost: 'how scholars collaborate internationally.',
    options: [
      { text: 'revolutionized / transformed', isCorrect: true },
      { text: 'swapped', isCorrect: false },
      { text: 'moved', isCorrect: false },
      { text: 'fixed', isCorrect: false }
    ],
    correctWord: 'revolutionized / transformed',
    explanation: '"Changed" oddiy o‘zgarishni anglatsa, "transformed" tubdan va ijobiy qayta shakllanishni aniq ifodalaydi.',
    whyItMatters: 'Tizimli o‘zgarishlarni tavsiflashda chuqur leksikadan foydalanish inshoga professional tus beradi.'
  }
];

export const WordWolfGame: React.FC = () => {
  const { setActiveTab, addCoins, recordGamePlayed } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedCoinsInRun, setEarnedCoinsInRun] = useState(0);

  const currentQ = QUESTIONS[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (isAnswered || isGameOver) return;

    if (timeLeft <= 0) {
      // Time ran out!
      setIsAnswered(true);
      setSelectedOption('TIMEOUT');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, isGameOver]);

  const handleSelectOption = (opt: { text: string; isCorrect: boolean }) => {
    if (isAnswered) return;

    setSelectedOption(opt.text);
    setIsAnswered(true);

    if (opt.isCorrect) {
      setScore(prev => prev + 1);
      setEarnedCoinsInRun(prev => prev + 10);
      addCoins(10, 'Word Wolf g‘alabasi', `To‘g‘ri so‘z: ${opt.text}`, 'game');
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(10);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
      recordGamePlayed(score >= 2);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setTimeLeft(10);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsGameOver(false);
    setScore(0);
    setEarnedCoinsInRun(0);
  };

  // Wolf position calculation based on timeLeft (gets closer to sheep as time decreases)
  const wolfOffset = Math.min(65, (10 - timeLeft) * 6.5);

  return (
    <div className="space-y-6 text-left pb-16">
      {/* Top Bar (Matches Screenshot 10) */}
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
            {currentIndex + 1} / {QUESTIONS.length}
          </span>
          <div className="px-3 py-1 bg-[#FFF0F7] rounded-full border border-[#FCE7F3] text-xs font-bold text-[#EC008C] flex items-center gap-1">
            <span>Ⓟ</span>
            <span>+{earnedCoinsInRun}</span>
          </div>
        </div>
      </div>

      {isGameOver ? (
        /* Results Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F5E6EF] shadow-lg text-center max-w-xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#FFF0F7] flex items-center justify-center mx-auto text-[#EC008C]">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#242124]">
              Word Wolf yakunlandi!
            </h2>
            <p className="text-sm text-[#85818A]">
              Siz {QUESTIONS.length} ta savoldan {score} tasiga to‘g‘ri javob berdingiz va qo‘zichoqni bo‘ridan himoya qildingiz!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] inline-flex items-center gap-4">
            <span className="text-xs font-bold text-[#85818A]">To‘plangan tangalar:</span>
            <span className="text-xl font-extrabold text-[#EC008C]">+{earnedCoinsInRun} Pink Coin</span>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-2xl shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qayta o‘ynash</span>
            </button>
            <button
              onClick={() => setActiveTab('games')}
              className="px-6 py-3 bg-white border border-[#E8E4EC] text-[#242124] text-xs font-bold rounded-2xl hover:bg-neutral-50 transition-all"
            >
              O‘yinlar menyusi
            </button>
          </div>
        </div>
      ) : (
        /* Main Gameplay Split (Matches Screenshot 10) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Duel Arena & Question (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Sheep & Wolf Arena */}
            <div className="bg-gradient-to-b from-[#FFF5FA] to-white rounded-3xl p-6 sm:p-8 border border-[#FCE7F3] shadow-xs relative overflow-hidden">
              {/* Timer pill */}
              <div className="flex justify-center mb-6">
                <div
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    timeLeft <= 3
                      ? 'bg-red-100 text-red-600 animate-pulse border border-red-200'
                      : 'bg-white text-[#EC008C] border border-[#FCE7F3] shadow-xs'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{timeLeft}s — Qo‘zichoqni qutqaring!</span>
                </div>
              </div>

              {/* Arena stage with Wolf and Sheep */}
              <div className="relative h-28 flex items-center justify-between px-4 sm:px-12 border-b border-[#FAF0F5] pb-6">
                {/* Wolf */}
                <div
                  className="transition-all duration-700 ease-out flex flex-col items-center"
                  style={{ transform: `translateX(${wolfOffset}%)` }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#242124] flex items-center justify-center text-2xl shadow-md">
                    🐺
                  </div>
                  <span className="text-[10px] font-bold text-[#85818A] mt-1">So‘z bo‘risi</span>
                </div>

                {/* Sheep */}
                <div className="flex flex-col items-center">
                  <PinkSheepMascot
                    size="lg"
                    mood={selectedOption && selectedOption === currentQ.correctWord ? 'victory' : 'happy'}
                  />
                  <span className="text-[10px] font-bold text-[#EC008C] mt-1">PinkSheep</span>
                </div>
              </div>

              {/* Weak word in sentence prompt */}
              <div className="pt-8 text-center space-y-4">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#85818A] block">
                  Oddiy so‘zni kuchli muqobiliga almashtiring
                </span>

                <p className="text-lg sm:text-2xl font-bold text-[#242124] leading-relaxed">
                  {currentQ.sentencePre}{' '}
                  <span className="bg-[#FF4DA6]/20 text-[#EC008C] px-2 py-0.5 rounded-lg underline decoration-[#EC008C] decoration-2">
                    {currentQ.weakWord}
                  </span>{' '}
                  {currentQ.sentencePost}
                </p>

                {/* 4 Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selectedOption === opt.text;
                    let btnStyle = 'bg-white hover:bg-[#FFF8FC] border-[#E8E4EC] text-[#242124]';

                    if (isAnswered) {
                      if (opt.isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-red-50 border-red-500 text-red-800';
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(opt)}
                        disabled={isAnswered}
                        className={`p-3.5 rounded-2xl border text-sm font-semibold transition-all shadow-xs text-center ${btnStyle}`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>

                {/* Answer Feedback Banner (Matches Screenshot 10) */}
                {isAnswered && (
                  <div
                    className={`mt-6 p-5 rounded-2xl text-left space-y-3 transition-all ${
                      selectedOption === currentQ.correctWord
                        ? 'bg-emerald-50 border border-emerald-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {selectedOption === currentQ.correctWord ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm font-extrabold text-emerald-800">
                            Bo‘ri orqaga chekindi! (The wolf retreats!)
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="text-sm font-extrabold text-red-800">
                            Vaqt tugadi yoki noto‘g‘ri javob! To‘g‘ri variant: "{currentQ.correctWord}"
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-xs text-[#242124] leading-relaxed">
                      {currentQ.explanation}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={handleNextQuestion}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-xl shadow-md transition-all"
                      >
                        <span>Keyingi savol</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Info Cards (4 cols) (Matches Screenshot 10) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#242124]">Nega bu muhim?</h3>
              <p className="text-xs text-[#85818A] leading-relaxed">
                {currentQ.whyItMatters}
              </p>
            </div>

            <div className="bg-[#FFF8FC] rounded-3xl p-6 border border-[#FCE7F3] shadow-xs space-y-2">
              <span className="text-[11px] font-extrabold text-[#EC008C] uppercase tracking-wider">
                Qiyinlik darajasi
              </span>
              <p className="text-xs font-bold text-[#242124]">Oson / Intermediate</p>
              <p className="text-xs text-[#85818A] pt-1">
                To‘g‘ri javoblar har bir savol uchun 10 Pink Coin to‘laydi.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
