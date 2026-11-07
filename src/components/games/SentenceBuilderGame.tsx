import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
  Shuffle
} from 'lucide-react';

interface SentenceLevel {
  id: number;
  correctSentence: string;
  scrambledWords: string[];
  translation: string;
  explanation: string;
}

const LEVELS: SentenceLevel[] = [
  {
    id: 1,
    correctSentence: 'Access to quality education is essential for social mobility.',
    scrambledWords: ['is', 'social', 'Access', 'for', 'essential', 'mobility.', 'to', 'quality', 'education'],
    translation: "Sifatli ta'limdan foydalanish imkoniyati ijtimoiy yuksalish uchun hal qiluvchi ahamiyatga ega.",
    explanation: '"Access to..." iborasi ingliz tilida birikma sifatida egadir, undan so‘ng sifat va ot ("quality education"), so‘ngra "is essential for" predikati mantiqan keladi.'
  },
  {
    id: 2,
    correctSentence: 'Consistent daily practice fundamentally transforms academic writing skills.',
    scrambledWords: ['fundamentally', 'Consistent', 'practice', 'transforms', 'daily', 'writing', 'skills.', 'academic'],
    translation: 'Muntazam kundalik mashqlar akademik yozish ko‘nikmalarini tubdan o‘zgartiradi.',
    explanation: `Murakkab sifatlar ("Consistent daily practice") egada birgalikda qo‘llanib, "fundamentally transforms" ravish+fe'l birikmasini boshqaradi.`
  },
  {
    id: 3,
    correctSentence: 'Critical thinking empowers ambitious students to evaluate complex evidence.',
    scrambledWords: ['students', 'Critical', 'to', 'empowers', 'complex', 'evidence.', 'thinking', 'ambitious', 'evaluate'],
    translation: 'Tanqidiy fikrlash intiluvchan talabalarga murakkab dalillarni baholash imkonini beradi.',
    explanation: '"Empower + object + to-infinitive" tuzilishi ("empowers students to evaluate") grant insholarida eng ko‘p qo‘llaniladigan sintaktik qolipdir.'
  }
];

export const SentenceBuilderGame: React.FC = () => {
  const { setActiveTab, addCoins, recordGamePlayed } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLevel = LEVELS[currentIndex];

  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [bankWords, setBankWords] = useState<string[]>(currentLevel.scrambledWords);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // When clicking a word from the bank, add it to constructed sentence
  const handlePickWord = (word: string, indexInBank: number) => {
    if (isEvaluated) return;
    setSelectedWords(prev => [...prev, word]);
    setBankWords(prev => prev.filter((_, idx) => idx !== indexInBank));
  };

  // When clicking a word in the constructed sentence, return it to the bank
  const handleRemoveWord = (word: string, indexInSelected: number) => {
    if (isEvaluated) return;
    setSelectedWords(prev => prev.filter((_, idx) => idx !== indexInSelected));
    setBankWords(prev => [...prev, word]);
  };

  const handleResetCurrent = () => {
    setSelectedWords([]);
    setBankWords(currentLevel.scrambledWords);
    setIsEvaluated(false);
    setIsCorrect(false);
  };

  const handleCheckSentence = () => {
    if (selectedWords.length === 0) return;

    const constructed = selectedWords.join(' ');
    const correct = constructed === currentLevel.correctSentence;

    setIsEvaluated(true);
    setIsCorrect(correct);

    if (correct) {
      setCoinsEarned(prev => prev + 10);
      addCoins(10, 'Sentence Builder g‘alabasi', 'Akademik jumla to‘g‘ri tuzildi', 'game');
    }
  };

  const handleNextLevel = () => {
    if (currentIndex + 1 < LEVELS.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedWords([]);
      setBankWords(LEVELS[nextIdx].scrambledWords);
      setIsEvaluated(false);
      setIsCorrect(false);
    } else {
      setIsComplete(true);
      recordGamePlayed(true);
    }
  };

  return (
    <div className="space-y-6 text-left pb-16">
      {/* Top Bar (Matches Screenshot 11) */}
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
            {currentIndex + 1} / {LEVELS.length}
          </span>
          <div className="px-3 py-1 bg-[#FFF0F7] rounded-full border border-[#FCE7F3] text-xs font-bold text-[#EC008C] flex items-center gap-1">
            <span>Ⓟ</span>
            <span>+{coinsEarned}</span>
          </div>
        </div>
      </div>

      {isComplete ? (
        /* Results Card */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F5E6EF] shadow-lg text-center max-w-xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#FFF0F7] flex items-center justify-center mx-auto text-[#EC008C]">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#242124]">
              Barcha jumlalar muvaffaqiyatli qurildi!
            </h2>
            <p className="text-sm text-[#85818A]">
              Siz akademik sintaksis qoidalarini ajoyib o‘zlashtirdingiz va to‘liq ball to‘pladingiz.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] inline-flex items-center gap-4">
            <span className="text-xs font-bold text-[#85818A]">Mukofot:</span>
            <span className="text-xl font-extrabold text-[#EC008C]">+{coinsEarned} Pink Coin</span>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedWords([]);
                setBankWords(LEVELS[0].scrambledWords);
                setIsEvaluated(false);
                setIsCorrect(false);
                setIsComplete(false);
              }}
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
        /* Main Sentence Builder Workspace (Matches Screenshot 11) */
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#F5E6EF] shadow-xs space-y-8">
          <div>
            <span className="text-[11px] font-extrabold text-[#EC008C] uppercase tracking-wider block mb-1">
              Jumlani quring (Build the sentence)
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#242124]">
              So‘zlarni to‘g‘ri sintaktik tartibda joylashtiring
            </h2>
            <p className="text-xs text-[#85818A] mt-1">
              O‘zbekcha ma'nosi: <span className="italic text-[#242124]">{currentLevel.translation}</span>
            </p>
          </div>

          {/* Constructed Sentence Box (Dotted border matching Screenshot 11) */}
          <div className="min-h-32 p-6 rounded-2xl border-2 border-dashed border-[#F8C8E5] bg-[#FFF8FC] flex flex-wrap items-center gap-2.5 transition-all">
            {selectedWords.length > 0 ? (
              selectedWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveWord(word, idx)}
                  disabled={isEvaluated}
                  className="px-3.5 py-1.5 bg-[#EC008C] hover:bg-[#d4007d] text-white rounded-xl text-sm font-bold shadow-xs transition-all hover:scale-105 active:scale-95 flex items-center gap-1 group"
                >
                  <span>{word}</span>
                  {!isEvaluated && (
                    <span className="text-xs text-white/70 group-hover:text-white">×</span>
                  )}
                </button>
              ))
            ) : (
              <p className="text-sm text-[#85818A] italic">
                Quyidagi so‘zlarni to‘g‘ri tartibda bosing... (Tap the words below in the right order...)
              </p>
            )}
          </div>

          {/* Word Bank Chips (Matches Screenshot 11) */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-[#85818A] uppercase tracking-wider block">
              So‘zlar banki
            </span>
            <div className="flex flex-wrap gap-2.5">
              {bankWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePickWord(word, idx)}
                  disabled={isEvaluated}
                  className="px-4 py-2 bg-white hover:bg-[#FFF0F7] hover:border-[#EC008C] text-[#242124] font-semibold text-sm rounded-xl border border-[#E8E4EC] shadow-xs transition-all active:scale-95"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Evaluation Feedback */}
          {isEvaluated && (
            <div
              className={`p-5 rounded-2xl space-y-3 ${
                isCorrect
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-red-50 border border-red-200 text-red-900'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-extrabold text-emerald-800">
                      Mukammal! Jumla to‘g‘ri tuzildi (+10 Pink Coin)
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-extrabold text-red-800">
                      Tartibda xatolik bor. To‘g‘ri variant bilan tanishing:
                    </span>
                  </>
                )}
              </div>

              {!isCorrect && (
                <p className="text-xs font-bold text-[#242124] bg-white/80 p-2.5 rounded-xl border border-red-100 font-sans">
                  "{currentLevel.correctSentence}"
                </p>
              )}

              <p className="text-xs text-[#85818A] leading-relaxed">
                <strong className="text-[#242124]">Grammatik izoh:</strong> {currentLevel.explanation}
              </p>
            </div>
          )}

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#FAF0F5]">
            <button
              onClick={handleResetCurrent}
              disabled={isEvaluated && isCorrect}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#85818A] hover:text-[#EC008C] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Qaytadan boshlash</span>
            </button>

            {!isEvaluated ? (
              <button
                onClick={handleCheckSentence}
                disabled={selectedWords.length === 0}
                className="px-7 py-3 bg-[#EC008C] hover:bg-[#d4007d] disabled:opacity-40 text-white text-xs font-bold rounded-2xl shadow-md transition-all active:scale-95"
              >
                Jumlani tekshirish
              </button>
            ) : (
              <button
                onClick={handleNextLevel}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-2xl shadow-md transition-all active:scale-95"
              >
                <span>Keyingi bosqich</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
