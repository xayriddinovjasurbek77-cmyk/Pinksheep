import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
  Brain
} from 'lucide-react';

interface LogicQuestion {
  id: number;
  difficulty: string;
  question: string;
  questionUz: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const LOGIC_QUESTIONS: LogicQuestion[] = [
  {
    id: 1,
    difficulty: 'Oson · Insho mantiqi',
    question: 'Which sentence is the strongest thesis statement for a scholarship essay about community service?',
    questionUz: 'Qaysi jumla jamoat xizmati haqidagi grant inshosi uchun eng kuchli tezis (thesis statement) hisoblanadi?',
    options: [
      {
        id: 'opt_1',
        text: 'I have done a lot of community service.',
        isCorrect: false,
        feedback: 'Bu jumla shunchaki umumiy fakt bo‘lib, hech qanday chuqur xulosa yoki shaxsiy o‘sishni ifodalamaydi.'
      },
      {
        id: 'opt_2',
        text: 'Community service is a nice thing to do.',
        isCorrect: false,
        feedback: '"A nice thing to do" iborasi haddan tashqari noakademik va sodda bo‘lib, grant darajasiga to‘g‘ri kelmaydi.'
      },
      {
        id: 'opt_3',
        text: 'Leading a weekly literacy programme taught me that consistent, local action changes outcomes more than one-off events.',
        isCorrect: true,
        feedback: 'To‘g‘ri! Ushbu jumla aniq shaxsiy tajriba ("Leading a weekly literacy programme"), o‘rganilgan saboq va chuqur tahliliy xulosani o‘zida mujassam etgan mukammal tezisdir.'
      },
      {
        id: 'opt_4',
        text: 'I want to win this scholarship because I work hard.',
        isCorrect: false,
        feedback: 'Bu jumla shaxsiy istakka yo‘naltirilgan, lekin qilingan jamoat xizmatining mazmunini ochib bermaydi.'
      }
    ]
  },
  {
    id: 2,
    difficulty: 'O‘rta · Insho mantiqi',
    question: 'Which transition phrase best connects a paragraph discussing challenges to a paragraph highlighting actionable solutions?',
    questionUz: 'Muammolar bayon etilgan abzatsdan amaliy yechimlar bayoniga o‘tishda qaysi bog‘lovchi ibora eng kuchli hisoblanadi?',
    options: [
      {
        id: 'opt_1',
        text: 'Next, I will talk about things to do.',
        isCorrect: false,
        feedback: 'Bu ibora juda mexanik va so‘zlashuv tiliga mansub.'
      },
      {
        id: 'opt_2',
        text: 'To systematically mitigate these systemic constraints, I spearheaded a community initiative...',
        isCorrect: true,
        feedback: 'To‘g‘ri! "To systematically mitigate these constraints..." iborasi oldingi xatboshidagi qiyinchiliklarga to‘g‘ridan-to‘g‘ri murojaat qilib, harakatga asoslangan yechimni akademik tilda ulaydi.'
      },
      {
        id: 'opt_3',
        text: 'Also, good things happened later.',
        isCorrect: false,
        feedback: 'Ushbu variant insho mantiqiy silsilasini zaiflashtiradi.'
      },
      {
        id: 'opt_4',
        text: 'Anyway, problems can always be solved easily.',
        isCorrect: false,
        feedback: '"Anyway" so‘zi rasmiy akademik yozuvda qat\'iyan taqiqlanadi.'
      }
    ]
  },
  {
    id: 3,
    difficulty: 'Ilg‘or · Insho mantiqi',
    question: 'Which sentence serves as the most persuasive and memorable conclusion for a Statement of Purpose?',
    questionUz: 'Qaysi jumla Maqsad bayonnomasi (Statement of Purpose) uchun eng ta\'sirchan va esda qolarli xulosa hisoblanadi?',
    options: [
      {
        id: 'opt_1',
        text: 'In conclusion, that is why you should admit me to your university.',
        isCorrect: false,
        feedback: '"In conclusion" iborasi ko‘p hollarda shablon hisoblanib, komissiyani zeriktiradi.'
      },
      {
        id: 'opt_2',
        text: 'Equipped with the rigorous training of this program, I am committed to translating data-driven research into equitable public policies across Central Asia.',
        isCorrect: true,
        feedback: 'Ajoyib! Bu jumla ta\'lim dasturi va bitirgandan keyingi mintaqaviy ijobiy ta\'sir (impact) o‘rtasidagi ko‘prikni mahorat bilan tasvirlaydi.'
      },
      {
        id: 'opt_3',
        text: 'I hope you liked reading my essay and give me high marks.',
        isCorrect: false,
        feedback: 'Baholash yoki shaxsiy maqtov so‘rash professional mezonlarga ziddir.'
      },
      {
        id: 'opt_4',
        text: 'Everything I wrote is true and I am ready to study.',
        isCorrect: false,
        feedback: 'Xulosa o‘rganilgan ilmiy niyatni mustahkamlashi shart.'
      }
    ]
  }
];

export const EssayLogicGame: React.FC = () => {
  const { setActiveTab, addCoins, recordGamePlayed } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQ = LOGIC_QUESTIONS[currentIndex];

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleSelectOption = (id: string) => {
    if (isAnswered) return;
    setSelectedId(id);
  };

  const handleCheckAnswer = () => {
    if (!selectedId) return;

    setIsAnswered(true);
    const chosen = currentQ.options.find(o => o.id === selectedId);

    if (chosen?.isCorrect) {
      setCoinsEarned(prev => prev + 10);
      addCoins(10, 'Essay Logic g‘alabasi', 'Eng kuchli akademik tezis topildi', 'game');
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < LOGIC_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedId(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
      recordGamePlayed(true);
    }
  };

  const chosenOption = currentQ.options.find(o => o.id === selectedId);

  return (
    <div className="space-y-6 text-left pb-16">
      {/* Top Bar (Matches Screenshot 12) */}
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
            {currentIndex + 1} / {LOGIC_QUESTIONS.length}
          </span>
          <div className="px-3 py-1 bg-[#FFF0F7] rounded-full border border-[#FCE7F3] text-xs font-bold text-[#EC008C] flex items-center gap-1">
            <span>Ⓟ</span>
            <span>+{coinsEarned}</span>
          </div>
        </div>
      </div>

      {isGameOver ? (
        /* Results Card */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F5E6EF] shadow-lg text-center max-w-xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#FFF0F7] flex items-center justify-center mx-auto text-[#EC008C]">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#242124]">
              Insho mantiqi mashqi yakunlandi!
            </h2>
            <p className="text-sm text-[#85818A]">
              Siz insholarning asosiy ustuni bo‘lgan tezislar va mantiqiy bog‘lanishlarni mukammal tushunib yetdingiz.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] inline-flex items-center gap-4">
            <span className="text-xs font-bold text-[#85818A]">Jami mukofot:</span>
            <span className="text-xl font-extrabold text-[#EC008C]">+{coinsEarned} Pink Coin</span>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedId(null);
                setIsAnswered(false);
                setIsGameOver(false);
                setCoinsEarned(0);
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
        /* Main Logic Question Card (Matches Screenshot 12) */
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#F5E6EF] shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold text-[#85818A] block mb-2">
              {currentQ.difficulty}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#242124] leading-relaxed">
              {currentQ.question}
            </h2>
            <p className="text-xs text-[#85818A] mt-1 italic">
              {currentQ.questionUz}
            </p>
          </div>

          {/* Radio Button Options (Matches Screenshot 12) */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedId === opt.id;
              let cardStyle = 'bg-white border-[#E8E4EC] hover:border-[#EC008C]/50 hover:bg-[#FFF8FC]';

              if (isAnswered) {
                if (opt.isCorrect) {
                  cardStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900';
                } else if (isSelected) {
                  cardStyle = 'bg-red-50 border-red-300 text-red-900';
                }
              } else if (isSelected) {
                cardStyle = 'bg-[#FFF0F7] border-[#EC008C] text-[#242124] shadow-xs';
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3.5 ${cardStyle}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? 'border-[#EC008C] bg-[#EC008C]'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  <div className="text-sm font-medium leading-relaxed">
                    {opt.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback Section */}
          {isAnswered && chosenOption && (
            <div
              className={`p-5 rounded-2xl space-y-2 ${
                chosenOption.isCorrect
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-red-50 border border-red-200 text-red-900'
              }`}
            >
              <div className="flex items-center gap-2">
                {chosenOption.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-extrabold text-emerald-800">
                      To‘g‘ri! Mantiqiy tanlov (+10 Pink Coin)
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-extrabold text-red-800">
                      Bu variant yetarli darajada kuchli emas.
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs text-[#242124] leading-relaxed">
                {chosenOption.feedback}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-end pt-4 border-t border-[#FAF0F5]">
            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedId}
                className="px-7 py-3 bg-[#EC008C] hover:bg-[#d4007d] disabled:opacity-40 text-white text-xs font-bold rounded-2xl shadow-md transition-all active:scale-95"
              >
                Javobni tekshirish
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-2xl shadow-md transition-all active:scale-95"
              >
                <span>Keyingi savol</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
