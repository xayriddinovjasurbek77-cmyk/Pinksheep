import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  UserStats,
  CoinTransaction,
  EssayItem,
  Achievement,
  LeaderboardUser,
  SheepLevel,
  EssayAnalysis
} from '../types';
import {
  registerAccount,
  loginAccount,
  getActiveSessionUserId,
  clearActiveSession,
  getStoredAccounts
} from '../utils/auth';

export const SHEEP_LEVELS: SheepLevel[] = [
  {
    id: 1,
    name: "Oddiy Qo'y",
    englishName: 'Simple Sheep',
    minCoins: 0,
    maxCoins: 500,
    benefits: [
      'Asosiy AI insho tekshiruvi (CEFR A1–B1)',
      'Boshlang\'ich ta\'limiy o\'yinlar',
      'Standart foydalanuvchi profili',
    ],
    lockedBenefits: [
      'Kengaytirilgan chuqur 13-punktli tahlil',
      'Haftalik maxsus reyting',
      'Neon pushti profil ramkasi',
      'Grammatika va leksika mukammal namunalari',
      'Shaxsiy AI takomillashtirish rejasi',
    ],
    color: '#EC008C'
  },
  {
    id: 2,
    name: "Ijodkor Qo'y",
    englishName: 'Creative Sheep',
    minCoins: 501,
    maxCoins: 2999,
    benefits: [
      'Kengaytirilgan chuqur 13-punktli tahlil (CEFR B2–C1)',
      'Haftalik maxsus reyting',
      'Ijodkor Qo\'y maxsus nishoni',
      'Barcha 6 ta interaktiv o\'yinlar',
      'Shaxsiy AI takomillashtirish rejasi',
    ],
    lockedBenefits: [
      'Neon pushti porlovchi profil ramkasi',
      'Premium C2 darajadagi insholar kutubxonasi',
      'Eksklyuziv olimpiada tayyorgarligi',
    ],
    color: '#FF4DA6'
  },
  {
    id: 3,
    name: "Afsonaviy Qo'y",
    englishName: 'Legendary Sheep',
    minCoins: 3000,
    maxCoins: null,
    benefits: [
      'Neon pushti porlovchi profil ramkasi',
      'Premium C2 darajadagi insholar kutubxonasi',
      'VIP xalqaro dasturlar va grantlar strategiyasi',
      'Afsonaviy oltin toj belgisi',
      'Cheksiz chuqur AI tahlillari',
    ],
    lockedBenefits: [],
    color: '#242124'
  }
];

const INITIAL_PROFILE: UserProfile = {
  id: 'user_azizbek_01',
  username: 'AzizbekOtabekov',
  email: 'dilnurateshayeva58@gmail.com',
  bio: 'Xalqaro grantlar va nufuzli universitetlarga akademik insholar yozmoqdaman.',
  avatarId: 1,
  level: 1,
  pinkCoins: 105,
  isOnline: true,
  joinedDate: '2026-11-02',
  streakDays: 4,
  isAuthenticated: false, // Visitors must authenticate
};

const INITIAL_STATS: UserStats = {
  essaysCompleted: 1,
  analysesRun: 1,
  gamesPlayed: 3,
  victories: 1,
  rank: 1,
};

const INITIAL_TRANSACTIONS: CoinTransaction[] = [
  {
    id: 'tx_1',
    title: 'Ilk o\'yin g\'alabasi',
    description: 'Birinchi mini-o\'yin g\'alabasi',
    amount: 10,
    type: 'game',
    timestamp: '2 Noyabr, 10:10',
    balanceAfter: 105
  },
  {
    id: 'tx_2',
    title: 'Word Wolf — help',
    description: 'Akademik so\'zni to\'g\'ri tanlash',
    amount: 10,
    type: 'game',
    timestamp: '2 Noyabr, 10:10',
    balanceAfter: 95
  },
  {
    id: 'tx_3',
    title: 'Ilk muvaffaqiyatli insho tahlili',
    description: 'Insho birinchi tahlili uchun bonus',
    amount: 10,
    type: 'analysis',
    timestamp: '2 Noyabr, 10:06',
    balanceAfter: 85
  },
  {
    id: 'tx_4',
    title: 'Insho yakunlandi — Why this scholarship matters to me',
    description: 'To\'liq akademik insho topshirildi',
    amount: 20,
    type: 'essay',
    timestamp: '2 Noyabr, 10:06',
    balanceAfter: 75
  },
  {
    id: 'tx_5',
    title: 'Kunlik ta\'lim faolligi',
    description: 'Kundalik platformaga tashrif va o\'rganish',
    amount: 5,
    type: 'daily',
    timestamp: '2 Noyabr, 10:02',
    balanceAfter: 55
  },
  {
    id: 'tx_6',
    title: 'PinkSheep.hub\'ga xush kelibsiz',
    description: 'Ro\'yxatdan o\'tganlik uchun bir martalik bonus',
    amount: 50,
    type: 'signup',
    timestamp: '2 Noyabr, 10:02',
    balanceAfter: 50
  }
];

const INITIAL_ESSAYS: EssayItem[] = [
  {
    id: 'essay_01',
    title: 'Why this scholarship matters to me',
    topic: 'How will receiving this scholarship impact your academic and leadership goals in your community?',
    essayType: 'Scholarship / Statement of Purpose',
    targetLevel: 'B2',
    content: `Education is undeniably the most formidable catalyst for sustainable societal transformation. Growing up in a rural area, I witnessed firsthand how systemic infrastructural constraints stifle the boundless potential of ambitious youth. The primary obstacle has rarely been a deficit of talent, but rather an acute scarcity of modern educational resources and international academic mentorship.

Receiving this scholarship will empower me to pursue rigorous studies in Computer Science and Data Systems, equipping me with the technical proficiency to architect scalable educational platforms. Beyond personal scholastic advancement, my overarching aspiration is to establish open-access STEM academies across regional schools in Uzbekistan. By bridging educational disparities and nurturing local talent, I aim to ensure that socioeconomic circumstances no longer dictate the boundaries of a student's future.`,
    wordCount: 135,
    status: 'analyzed',
    score: 87,
    createdAt: '2026-11-02T10:00:00Z',
    updatedAt: '2026-11-02T10:06:00Z',
    analysis: {
      overallScore: 87,
      scores: {
        grammar: 18,
        vocabulary: 17,
        coherence: 18,
        taskAchievement: 18,
        sentenceStructure: 16
      },
      grammarMistakes: [
        {
          original: "I witnessed firsthand how limited educational infrastructure stifles",
          correction: "I observed firsthand the manner in which infrastructural constraints constrain",
          explanation: "'Stifles' o'rniga akademik uslubda chuqurroq tahliliy fe'llardan foydalanish tavsiya etiladi.",
          ruleType: "Academic Register"
        }
      ],
      vocabularyImprovements: [
        {
          weakWord: "stifles",
          suggestedAlternatives: ["constrains", "impedes", "inhibits"],
          context: "stifle the boundless potential",
          explanation: "'Inhibits' yoki 'impedes' so'zlari ilmiy insholarda rasmiyroq jaranglaydi."
        }
      ],
      weakSentences: [
        {
          original: "The primary obstacle has rarely been a deficit of talent.",
          improved: "Seldom has the principal impediment been an absence of intellectual aptitude; rather, systemic limitations have hindered progress.",
          explanation: "Inversiya orqali ('Seldom has...') jumlaning ritmi va akademik ta'sirchanligi oshirildi."
        }
      ],
      strengths: [
        "Shaxsiy motivatsiya va ijtimoiy ta'sir uyg'un tarzda ifodalangan",
        "Mavzuga bevosita daxldor bo'lgan niyatlar aniq sanab o'tilgan",
        "Abzatslar mantiqiy bog'lanishga ega"
      ],
      areasNeedingImprovement: [
        "Sintaksisda inversiya va murakkab sifatdosh birikmalarini ko'proq qo'llash",
        "Xulosada grant tashkilotining asosiy missiyasi bilan maqsadlarni bog'lash"
      ],
      personalizedPlan: [
        {
          step: 1,
          title: "Sintaktik xilma-xillik",
          action: "Inversiyali shart gaplari ('Had I not experienced...') mashqlarini bajaring."
        },
        {
          step: 2,
          title: "Lug'atni boyitish",
          action: "Word Wolf o'yini orqali 'impediment', 'catalyst', 'proficiency' so'zlarini inshoda sinab ko'ring."
        }
      ],
      improvedFullEssay: `Education is undeniably the most formidable catalyst for sustainable societal transformation. Growing up in a rural area, I observed firsthand how infrastructural constraints inhibit the boundless potential of ambitious youth. Seldom has the principal impediment been an absence of intellectual aptitude; rather, it has been an acute scarcity of modern educational resources and international academic mentorship.

Receiving this scholarship will empower me to pursue rigorous studies in Computer Science and Data Systems, equipping me with the technical proficiency to architect scalable educational platforms. Beyond personal scholastic advancement, my overarching aspiration is to establish open-access STEM academies across regional schools in Uzbekistan. By bridging educational disparities and nurturing local talent, I aim to ensure that socioeconomic circumstances no longer dictate the boundaries of a student's future.`,
      verdict: "Ajoyib va ta'sirchan insho! Fikrlar ravon, motivatsiya aniq va grant maqsadiga to'liq javob beradi.",
      isAiPowered: true,
      analyzedAt: '2026-11-02T10:06:00Z'
    }
  }
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_1',
    title: 'Ilk qadamlar',
    description: 'PinkSheep.hub platformasiga a\'zo bo\'ldi',
    unlocked: true,
    unlockedAt: '2 Noyabr',
    rewardCoins: 50
  },
  {
    id: 'ach_2',
    title: 'Ilk tahlil',
    description: 'Birinchi inshoni AI orqali tekshirtirdi',
    unlocked: true,
    unlockedAt: '2 Noyabr',
    rewardCoins: 10
  },
  {
    id: 'ach_3',
    title: 'Uchta insho',
    description: 'Kamida 3 ta to\'liq insho yozib tahlil qildi',
    unlocked: false,
    rewardCoins: 50
  },
  {
    id: 'ach_4',
    title: 'O\'yin boshlandi',
    description: 'Ilk mini-o\'yinda g\'alaba qozondi',
    unlocked: true,
    unlockedAt: '2 Noyabr',
    rewardCoins: 10
  },
  {
    id: 'ach_5',
    title: 'Tanga jamg\'aruvchi',
    description: '500 Pink Coin to\'pladi va 2-darajaga o\'tdi',
    unlocked: false,
    rewardCoins: 100
  },
  {
    id: 'ach_6',
    title: 'Afsonaviy qo\'y',
    description: '3,000 Pink Coin to\'plab Afsonaviy darajaga yetdi',
    unlocked: false,
    rewardCoins: 300
  }
];

const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'user_azizbek_01',
    rank: 1,
    username: 'AzizbekOtabekov',
    avatarId: 1,
    level: 1,
    pinkCoins: 105,
    essays: 1,
    victories: 2,
    isOnline: true,
    isCurrentUser: true
  },
  {
    id: 'user_2',
    rank: 2,
    username: 'Shermurod Creative Qo\'y',
    avatarId: 2,
    level: 2,
    pinkCoins: 980,
    essays: 12,
    victories: 34,
    isOnline: true
  },
  {
    id: 'user_3',
    rank: 3,
    username: 'Madina Saidova',
    avatarId: 3,
    level: 2,
    pinkCoins: 840,
    essays: 9,
    victories: 28,
    isOnline: false
  },
  {
    id: 'user_4',
    rank: 4,
    username: 'Shahzod Karimov',
    avatarId: 4,
    level: 1,
    pinkCoins: 420,
    essays: 5,
    victories: 14,
    isOnline: true
  },
  {
    id: 'user_5',
    rank: 5,
    username: 'Zilola Ergasheva',
    avatarId: 5,
    level: 1,
    pinkCoins: 310,
    essays: 3,
    victories: 9,
    isOnline: false
  },
  {
    id: 'user_6',
    rank: 6,
    username: 'Jahongir Nurmatov',
    avatarId: 6,
    level: 1,
    pinkCoins: 190,
    essays: 2,
    victories: 5,
    isOnline: true
  }
];

export type ActiveTab =
  | 'landing'
  | 'dashboard'
  | 'essay-lab'
  | 'games'
  | 'leaderboard'
  | 'profile'
  | 'essay-history'
  | 'pink-coins'
  | 'settings'
  | 'word-wolf'
  | 'sentence-builder'
  | 'essay-logic'
  | 'vocab-challenge'
  | 'grammar-master'
  | 'word-builder';

interface AppContextType {
  user: UserProfile;
  stats: UserStats;
  transactions: CoinTransaction[];
  essays: EssayItem[];
  achievements: Achievement[];
  leaderboard: LeaderboardUser[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  navigateToTabWithAuth: (tab: ActiveTab) => void;
  currentLevelInfo: SheepLevel;
  nextLevelInfo: SheepLevel | null;
  coinsNeededForNextLevel: number;
  progressPercent: number;
  addCoins: (amount: number, title: string, description: string, type: CoinTransaction['type']) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  saveEssay: (essay: Omit<EssayItem, 'id' | 'createdAt' | 'updatedAt'>, existingId?: string) => EssayItem;
  saveAnalysis: (essayId: string, analysis: EssayAnalysis) => void;
  recordGamePlayed: (won: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  loginUser: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  registerUser: (username: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => void;
  notification: string | null;
  showNotification: (msg: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'pinksheep_platform_state_v3';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Check session persistence
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const activeSessionId = getActiveSessionUserId();
      const saved = localStorage.getItem(STORAGE_KEY + '_user');
      const baseUser = saved ? JSON.parse(saved) : INITIAL_PROFILE;
      return {
        ...baseUser,
        isAuthenticated: Boolean(activeSessionId)
      };
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_stats');
      return saved ? JSON.parse(saved) : INITIAL_STATS;
    } catch {
      return INITIAL_STATS;
    }
  });

  const [transactions, setTransactions] = useState<CoinTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_txs');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [essays, setEssays] = useState<EssayItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_essays');
      return saved ? JSON.parse(saved) : INITIAL_ESSAYS;
    } catch {
      return INITIAL_ESSAYS;
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_achievements');
      return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  const [activeTab, setActiveTabState] = useState<ActiveTab>('landing');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [notification, setNotification] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_user', JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY + '_stats', JSON.stringify(stats));
      localStorage.setItem(STORAGE_KEY + '_txs', JSON.stringify(transactions));
      localStorage.setItem(STORAGE_KEY + '_essays', JSON.stringify(essays));
      localStorage.setItem(STORAGE_KEY + '_achievements', JSON.stringify(achievements));
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  }, [user, stats, transactions, essays, achievements]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  // Secure navigation guard: if user tries to enter protected section without auth, open auth modal
  const navigateToTabWithAuth = (tab: ActiveTab) => {
    if (tab === 'landing') {
      setActiveTabState('landing');
      return;
    }

    if (!user.isAuthenticated) {
      setAuthMode('login');
      setAuthModalOpen(true);
      showNotification("Platformadan foydalanish uchun tizimga kiring yoki ro'yxatdan o'ting.");
      return;
    }

    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setActiveTab = (tab: ActiveTab) => {
    navigateToTabWithAuth(tab);
  };

  // Determine current level based on coins
  const currentLevelId: 1 | 2 | 3 = user.pinkCoins >= 3000 ? 3 : user.pinkCoins >= 501 ? 2 : 1;
  const currentLevelInfo = SHEEP_LEVELS.find(l => l.id === currentLevelId) || SHEEP_LEVELS[0];
  const nextLevelInfo = currentLevelId === 1 ? SHEEP_LEVELS[1] : currentLevelId === 2 ? SHEEP_LEVELS[2] : null;

  const coinsNeededForNextLevel = nextLevelInfo ? Math.max(0, nextLevelInfo.minCoins - user.pinkCoins) : 0;
  
  let progressPercent = 100;
  if (currentLevelId === 1) {
    progressPercent = Math.min(100, Math.round((user.pinkCoins / 501) * 100));
  } else if (currentLevelId === 2) {
    progressPercent = Math.min(100, Math.round(((user.pinkCoins - 501) / (3000 - 501)) * 100));
  }

  // Add coins
  const addCoins = (amount: number, title: string, description: string, type: CoinTransaction['type']) => {
    if (amount <= 0) return;

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#EC008C', '#FF4DA6', '#FCE7F3', '#FFD700']
      });
    } catch {
      // ignore
    }

    const newBalance = user.pinkCoins + amount;
    const newTx: CoinTransaction = {
      id: `tx_${Date.now()}`,
      title,
      description,
      amount,
      type,
      timestamp: 'Hozir',
      balanceAfter: newBalance
    };

    setTransactions(prev => [newTx, ...prev]);

    const newLevelId: 1 | 2 | 3 = newBalance >= 3000 ? 3 : newBalance >= 501 ? 2 : 1;
    const leveledUp = newLevelId > user.level;

    setUser(prev => ({
      ...prev,
      pinkCoins: newBalance,
      level: newLevelId
    }));

    showNotification(`+${amount} Pink Coin qo'shildi! (${title})`);

    if (leveledUp) {
      showNotification(`🎉 Tabriklaymiz! Siz yangi "${SHEEP_LEVELS.find(l => l.id === newLevelId)?.name}" darajasiga yetdingiz!`);
    }

    if (newBalance >= 500) {
      setAchievements(prev => prev.map(a => a.id === 'ach_5' ? { ...a, unlocked: true, unlockedAt: 'Bugun' } : a));
    }
    if (newBalance >= 3000) {
      setAchievements(prev => prev.map(a => a.id === 'ach_6' ? { ...a, unlocked: true, unlockedAt: 'Bugun' } : a));
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
    showNotification('Profil sozlamalari muvaffaqiyatli saqlandi');
  };

  const saveEssay = (essayData: Omit<EssayItem, 'id' | 'createdAt' | 'updatedAt'>, existingId?: string): EssayItem => {
    const now = new Date().toISOString();
    let savedItem: EssayItem;

    if (existingId) {
      savedItem = {
        ...essayData,
        id: existingId,
        createdAt: essays.find(e => e.id === existingId)?.createdAt || now,
        updatedAt: now
      };
      setEssays(prev => prev.map(e => e.id === existingId ? savedItem : e));
    } else {
      savedItem = {
        ...essayData,
        id: `essay_${Date.now()}`,
        createdAt: now,
        updatedAt: now
      };
      setEssays(prev => [savedItem, ...prev]);
    }

    setStats(prev => ({
      ...prev,
      essaysCompleted: essays.length + (existingId ? 0 : 1)
    }));

    return savedItem;
  };

  const saveAnalysis = (essayId: string, analysis: EssayAnalysis) => {
    setEssays(prev => prev.map(e => {
      if (e.id === essayId) {
        return {
          ...e,
          status: 'analyzed',
          score: analysis.overallScore,
          analysis,
          updatedAt: new Date().toISOString()
        };
      }
      return e;
    }));

    setStats(prev => ({
      ...prev,
      analysesRun: prev.analysesRun + 1
    }));

    setAchievements(prev => prev.map(a => a.id === 'ach_2' ? { ...a, unlocked: true, unlockedAt: 'Bugun' } : a));
  };

  const recordGamePlayed = (won: boolean) => {
    setStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      victories: won ? prev.victories + 1 : prev.victories
    }));

    if (won) {
      setAchievements(prev => prev.map(a => a.id === 'ach_4' ? { ...a, unlocked: true, unlockedAt: 'Bugun' } : a));
    }
  };

  // Auth Operations
  const loginUser = async (email: string, pass: string) => {
    const res = await loginAccount(email, pass);
    if (!res.success || !res.user) {
      return { success: false, error: res.error };
    }

    setUser(prev => ({
      ...prev,
      id: res.user!.id,
      username: res.user!.username,
      email: res.user!.email,
      avatarId: res.user!.avatarId,
      isAuthenticated: true
    }));

    showNotification(`Xush kelibsiz, ${res.user.username}!`);
    setAuthModalOpen(false);
    setActiveTabState('dashboard');
    return { success: true };
  };

  const registerUser = async (uname: string, email: string, pass: string) => {
    const res = await registerAccount(uname, email, pass);
    if (!res.success || !res.user) {
      return { success: false, error: res.error };
    }

    setUser(prev => ({
      ...prev,
      id: res.user!.id,
      username: res.user!.username,
      email: res.user!.email,
      avatarId: res.user!.avatarId,
      isAuthenticated: true
    }));

    addCoins(50, 'Xush kelibsiz start bonusi', 'PinkSheep a\'zosi bo\'lganingiz uchun', 'signup');
    showNotification(`🎉 Tabriklaymiz, ${res.user.username}! Hisobingiz yaratildi va +50 Pink Coin taqdim etildi.`);
    setAuthModalOpen(false);
    setActiveTabState('dashboard');
    return { success: true };
  };

  const logoutUser = () => {
    clearActiveSession();
    setUser(prev => ({ ...prev, isAuthenticated: false }));
    setActiveTabState('landing');
    showNotification("Tizimdan chiqdingiz. Qaytganingizda profilingiz sizni kutadi!");
  };

  const resetAllData = () => {
    clearActiveSession();
    localStorage.removeItem(STORAGE_KEY + '_user');
    localStorage.removeItem(STORAGE_KEY + '_stats');
    localStorage.removeItem(STORAGE_KEY + '_txs');
    localStorage.removeItem(STORAGE_KEY + '_essays');
    localStorage.removeItem(STORAGE_KEY + '_achievements');
    setUser(INITIAL_PROFILE);
    setStats(INITIAL_STATS);
    setTransactions(INITIAL_TRANSACTIONS);
    setEssays(INITIAL_ESSAYS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setActiveTabState('landing');
    showNotification('Barcha ma\'lumotlar dastlabki holatga qaytarildi');
  };

  const leaderboard: LeaderboardUser[] = [
    {
      id: user.id,
      rank: 1,
      username: user.username,
      avatarId: user.avatarId,
      level: user.level,
      pinkCoins: user.pinkCoins,
      essays: stats.essaysCompleted,
      victories: stats.victories,
      isOnline: true,
      isCurrentUser: true
    },
    ...INITIAL_LEADERBOARD.filter(u => u.id !== user.id)
  ].sort((a, b) => b.pinkCoins - a.pinkCoins).map((u, idx) => ({ ...u, rank: idx + 1 }));

  return (
    <AppContext.Provider
      value={{
        user,
        stats,
        transactions,
        essays,
        achievements,
        leaderboard,
        activeTab,
        setActiveTab,
        navigateToTabWithAuth,
        currentLevelInfo,
        nextLevelInfo,
        coinsNeededForNextLevel,
        progressPercent,
        addCoins,
        updateProfile,
        saveEssay,
        saveAnalysis,
        recordGamePlayed,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        loginUser,
        registerUser,
        logoutUser,
        notification,
        showNotification,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
