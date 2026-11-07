import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, Puzzle } from 'lucide-react';

interface CollocationPuzzle {
  id: number;
  definitionUz: string;
  targetCollocation: string;
  pieces: string[];
  sampleSentence: string;
}

const PUZZLES: CollocationPuzzle[] = [
  {
    id: 1,
    definitionUz: 'Ijtimoiy-iqtisodiy tengsizlikni bartaraf etish (ko‘prik solish):',
    targetCollocation: 'Bridge socioeconomic disparities',
    pieces: ['disparities', 'Bridge', 'socioeconomic'],
    sampleSentence: 'Our project endeavors to bridge socioeconomic disparities through accessible online STEM tutoring.'
  },
  {
    id: 2,
    definitionUz: 'Tahliliy tafakkurni rivojlantirmoq va parvarish qilmoq:',
    targetCollocation: 'Cultivate analytical acumen',
    pieces: ['acumen', 'analytical', 'Cultivate'],
    sampleSentence: 'Rigorous research seminars cultivate analytical acumen among undergraduate scholars.'
  },
  {
    id: 3,
    definitionUz: 'Nazariy bilimlarni amaliyotga tatbiq etmoq:',
    targetCollocation: 'Translate theory into practice',
    pieces: ['into', 'practice', 'theory', 'Translate'],
    sampleSentence: 'The curriculum empowers students to translate complex theory into tangible community practice.'
  }
];

export const WordBuilderGame: React.FC = () => {
  const { setActiveTab, addCoins, recordGamePlayed } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const current = PUZZLES[currentIndex];

  const [selectedPieces, setSelectedPieces] = useState<string[]>([]);
  const [bankPieces, setBankPieces] = useState<string[]>(current.pieces);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handlePick = (piece: string, idx: number) => {
    if (isEvaluated) return;
    setSelectedPieces(prev => [...prev, piece]);
    setBankPieces(prev => prev.filter((_, i) => i !== idx));
  };

  const handleRemove = (piece: string, idx: number) => {
    if (isEvaluated) return;
    setSelectedPieces(prev => prev.filter((_, i) => i !== idx));
    setBankPieces(prev => [...prev, piece]);
  };

  const handleCheck = () => {
    if (selectedPieces.length === 0) return;
    const constructed = selectedPieces.join(' ');
    const correct = constructed === current.targetCollocation;

    setIsEvaluated(true);
    setIsCorrect(correct);

    if (correct) {
      setCoinsEarned(prev => prev + 10);
      addCoins(10, 'Word Builder g‘alabasi', 'Akademik kollokatsiya tuzildi', 'game');
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < PUZZLES.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedPieces([]);
      setBankPieces(PUZZLES[nextIdx].pieces);
      setIsEvaluated(false);
      setIsCorrect(false);
    } else {
      setIsComplete(true);
      recordGamePlayed(true);
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
            {currentIndex + 1} / {PUZZLES.length}
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
          <h2 className="text-2xl font-extrabold text-[#242124]">So‘z yasovchi yakunlandi!</h2>
          <p className="text-sm text-[#85818A]">
            Siz barcha ilg‘or akademik kollokatsiyalarni muvaffaqiyatli qurdingiz.
          </p>
          <div className="p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] inline-flex items-center gap-4">
            <span className="text-xs font-bold text-[#85818A]">Mukofot:</span>
            <span className="text-xl font-extrabold text-[#EC008C]">+{coinsEarned} Pink Coin</span>
          </div>
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedPieces([]);
                setBankPieces(PUZZLES[0].pieces);
                setIsEvaluated(false);
                setIsComplete(false);
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
              Word Builder (Kollokatsiya quruvchi)
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#242124]">
              {current.definitionUz}
            </h2>
          </div>

          {/* Staged Pieces Box */}
          <div className="min-h-24 p-5 rounded-2xl border-2 border-dashed border-[#F8C8E5] bg-[#FFF8FC] flex flex-wrap items-center gap-2">
            {selectedPieces.length > 0 ? (
              selectedPieces.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleRemove(p, i)}
                  disabled={isEvaluated}
                  className="px-4 py-2 bg-[#EC008C] hover:bg-[#d4007d] text-white rounded-xl text-sm font-bold shadow-xs transition-all active:scale-95"
                >
                  {p} ×
                </button>
              ))
            ) : (
              <p className="text-xs text-[#85818A] italic">
                So‘zlarni to‘g‘ri ketma-ketlikda bosing...
              </p>
            )}
          </div>

          {/* Available Pieces Bank */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-[#85818A] uppercase tracking-wider block">
              Mavjud so‘z qismlari:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {bankPieces.map((piece, i) => (
                <button
                  key={i}
                  onClick={() => handlePick(piece, i)}
                  disabled={isEvaluated}
                  className="px-4 py-2 bg-white hover:bg-[#FFF0F7] hover:border-[#EC008C] border border-[#E8E4EC] text-sm font-semibold text-[#242124] rounded-xl shadow-xs transition-all active:scale-95"
                >
                  {piece}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback & Sample sentence */}
          {isEvaluated && (
            <div
              className={`p-4 rounded-2xl space-y-2 ${
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
                      To‘g‘ri kollokatsiya! (+10 Pink Coin)
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-extrabold text-red-800">
                      To‘g‘ri birikma: "{current.targetCollocation}"
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs text-[#85818A] leading-relaxed">
                <span className="font-semibold text-[#242124]">Insho kontekstida:</span> "{current.sampleSentence}"
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[#FAF0F5]">
            <button
              onClick={() => {
                setSelectedPieces([]);
                setBankPieces(current.pieces);
                setIsEvaluated(false);
              }}
              disabled={isEvaluated && isCorrect}
              className="text-xs font-bold text-[#85818A] hover:text-[#EC008C]"
            >
              Qayta terish
            </button>

            {!isEvaluated ? (
              <button
                onClick={handleCheck}
                disabled={selectedPieces.length === 0}
                className="px-7 py-3 bg-[#EC008C] hover:bg-[#d4007d] disabled:opacity-40 text-white text-xs font-bold rounded-2xl shadow-md transition-all active:scale-95"
              >
                Tekshirish
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-2xl shadow-md transition-all active:scale-95"
              >
                <span>Keyingisi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
