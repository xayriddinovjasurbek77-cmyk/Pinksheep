import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EssayItem, EssayAnalysis, EnglishLevel, EssayType } from '../../types';
import {
  Sparkles,
  Save,
  Plus,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Copy,
  ChevronDown,
  Layers,
  Check,
  TrendingUp,
  Award,
  ListOrdered,
  FileText,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

export const EssayLabView: React.FC = () => {
  const {
    essays,
    saveEssay,
    saveAnalysis,
    addCoins,
    showNotification
  } = useApp();

  const [currentEssayId, setCurrentEssayId] = useState<string | undefined>(
    essays[0]?.id
  );

  const activeEssay = essays.find(e => e.id === currentEssayId);

  const [title, setTitle] = useState(activeEssay?.title || 'Why this scholarship matters to me');
  const [topic, setTopic] = useState(activeEssay?.topic || 'How will receiving this scholarship impact your academic and leadership goals in your community?');
  const [essayType, setEssayType] = useState<EssayType>(activeEssay?.essayType || 'Scholarship / Statement of Purpose');
  const [targetLevel, setTargetLevel] = useState<EnglishLevel>(activeEssay?.targetLevel || 'B2');
  const [content, setContent] = useState(activeEssay?.content || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<EssayAnalysis | null>(
    activeEssay?.analysis || null
  );
  const [feedbackTab, setFeedbackTab] = useState<'overview' | 'mistakes' | 'vocabulary' | 'sentences' | 'exemplar' | 'plan'>('overview');
  const [copied, setCopied] = useState(false);

  // Live Word Count
  const words = content.trim().length > 0 ? content.trim().split(/\s+/) : [];
  const wordCount = words.length;
  const isWordCountSufficient = wordCount >= 30;

  const handleSelectEssay = (essay: EssayItem) => {
    setCurrentEssayId(essay.id);
    setTitle(essay.title);
    setTopic(essay.topic || '');
    setEssayType(essay.essayType);
    setTargetLevel(essay.targetLevel);
    setContent(essay.content);
    setAnalysisResult(essay.analysis || null);
    setFeedbackTab('overview');
  };

  const handleNewEssay = () => {
    setCurrentEssayId(undefined);
    setTitle('');
    setTopic('');
    setEssayType('Argumentative');
    setTargetLevel('B2');
    setContent('');
    setAnalysisResult(null);
    setFeedbackTab('overview');
  };

  const handleSaveDraft = () => {
    if (!title.trim() && !content.trim()) {
      showNotification('Iltimos, insho sarlavhasi yoki matnini kiriting.');
      return;
    }

    const saved = saveEssay({
      title: title.trim() || 'Nomsiz insho',
      topic: topic.trim(),
      essayType,
      targetLevel,
      content,
      wordCount,
      status: analysisResult ? 'analyzed' : 'draft',
      score: analysisResult?.overallScore,
      analysis: analysisResult || undefined
    }, currentEssayId);

    setCurrentEssayId(saved.id);
    showNotification('Insho qoralamasi muvaffaqiyatli saqlandi!');
  };

  const handleAnalyzeEssay = async () => {
    if (!content.trim() || wordCount < 15) {
      showNotification('Tahlil uchun insho kamida 15-20 so‘zdan iborat bo‘lishi lozim.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/essay/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          topic,
          essayType,
          level: targetLevel,
          content
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Insho tahlilida xatolik yuz berdi');
      }

      const analysis: EssayAnalysis = {
        ...data,
        analyzedAt: new Date().toISOString()
      };

      setAnalysisResult(analysis);

      // Save essay with analysis
      const saved = saveEssay({
        title: title.trim() || 'Nomsiz insho',
        topic,
        essayType,
        targetLevel,
        content,
        wordCount,
        status: 'analyzed',
        score: analysis.overallScore,
        analysis
      }, currentEssayId);

      setCurrentEssayId(saved.id);
      saveAnalysis(saved.id, analysis);

      // Award coins
      addCoins(20, 'Insho tekshirildi', `"${title || 'Yangi insho'}" AI tahlil qilindi`, 'essay');
      showNotification('✅ Insho tahlili tayyor! 13 bandli chuqur natijalar bilan tanishing.');
    } catch (err: any) {
      console.error(err);
      showNotification(`Xatolik: ${err.message || 'Server bilan bog‘lanishda xato'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Replace text in editor
  const handleApplyCorrection = (original: string, correction: string) => {
    if (content.includes(original)) {
      setContent(content.replace(original, correction));
      showNotification('Tuzatish insho matniga kiritildi!');
    } else {
      showNotification('Ushbu jumla matnda topilmadi yoki allaqachon o‘zgartirilgan.');
    }
  };

  const handleCopyExemplar = () => {
    if (analysisResult?.improvedFullEssay) {
      navigator.clipboard.writeText(analysisResult.improvedFullEssay);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      showNotification('Namunaviy insho nusxalandi!');
    }
  };

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold tracking-wider text-[#EC008C] uppercase">
            Essay Lab
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242124] tracking-tight">
            AI Insho Tahlili va Yozish Studiyasi
          </h1>
          <p className="text-sm text-[#85818A] mt-0.5">
            Inshongizni yozing yoki joylashtiring, darajangizni belgilang va 13 mezon bo‘yicha chuqur AI tahlilini oling.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleNewEssay}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#FFF8FC] border border-[#E8E4EC] text-[#242124] text-xs font-bold rounded-2xl transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yangi insho</span>
          </button>

          <button
            onClick={handleSaveDraft}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#FFF8FC] border border-[#E8E4EC] text-[#242124] text-xs font-bold rounded-2xl transition-all shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Qoralamani saqlash</span>
          </button>

          <button
            onClick={handleAnalyzeEssay}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#EC008C] hover:bg-[#d4007d] disabled:opacity-50 text-white text-xs font-bold rounded-2xl shadow-md shadow-[#EC008C]/25 transition-all active:scale-95"
          >
            {isAnalyzing ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>AI tekshirmoqda...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inshoni tekshirish</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Left editor (7 cols), Right side / results (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Form (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Metadata Card: Title, Topic, Type, Level */}
          <div className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs space-y-4">
            <div>
              <label className="block text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider mb-1.5">
                Insho Sarlavhasi (Title)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="masalan: Why this scholarship matters to me"
                className="w-full px-4 py-3 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-sm font-semibold text-[#242124] placeholder-gray-400 focus:outline-none focus:border-[#EC008C] transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider mb-1.5">
                Insho Mavzusi yoki Savol (Essay Topic)
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Insho savolini shu yerga kiriting — AI tahlili mavzuni to‘liq qamrab olishingizni baholaydi..."
                rows={2}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-xs text-[#242124] placeholder-gray-400 focus:outline-none focus:border-[#EC008C] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Essay Type Selection */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider mb-1.5">
                  Insho turi
                </label>
                <select
                  value={essayType}
                  onChange={(e) => setEssayType(e.target.value as EssayType)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-xs font-semibold text-[#242124] focus:outline-none focus:border-[#EC008C]"
                >
                  <option value="Argumentative">Argumentative</option>
                  <option value="Discursive">Discursive</option>
                  <option value="IELTS Task 2">IELTS Task 2</option>
                  <option value="Scholarship / Statement of Purpose">Scholarship / SoP</option>
                  <option value="Problem & Solution">Problem & Solution</option>
                  <option value="Narrative / Personal">Narrative / Personal</option>
                </select>
              </div>

              {/* English Level Selection: A1 to C2 */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider mb-1.5">
                  Ingliz tili darajasi
                </label>
                <select
                  value={targetLevel}
                  onChange={(e) => setTargetLevel(e.target.value as EnglishLevel)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-xs font-semibold text-[#242124] focus:outline-none focus:border-[#EC008C]"
                >
                  <option value="A1">A1 — Beginner</option>
                  <option value="A2">A2 — Elementary</option>
                  <option value="B1">B1 — Intermediate</option>
                  <option value="B2">B2 — Upper-Intermediate</option>
                  <option value="C1">C1 — Advanced</option>
                  <option value="C2">C2 — Proficiency</option>
                </select>
              </div>

              {/* Live Word Count Indicator */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider mb-1.5">
                  So‘zlar soni
                </label>
                <div className="px-3 py-2.5 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] flex items-center justify-between text-xs">
                  <span className="font-bold text-[#242124] tabular-nums">
                    {wordCount} ta so‘z
                  </span>
                  <span className={`text-[10px] font-extrabold ${isWordCountSufficient ? 'text-emerald-600' : 'text-[#EC008C]'}`}>
                    {isWordCountSufficient ? 'Yetarli' : 'kamida 30+'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Editor Box */}
          <div className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider">
                Insho Matni (Essay Text)
              </label>
              <span className="text-xs text-[#85818A]">
                To‘g‘ridan-to‘g‘ri yozing yoki mavjud matnni joylashtiring.
              </span>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Insho matnini shu yerga yozing yoki nusxa ko‘chirib joylashtiring..."
              rows={16}
              className="w-full p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-sm text-[#242124] leading-relaxed placeholder-gray-400 focus:outline-none focus:border-[#EC008C] focus:bg-white transition-all font-sans"
            />
          </div>
        </div>

        {/* Right Column: AI Feedback Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {analysisResult ? (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#EC008C] shadow-xl shadow-[#EC008C]/10 space-y-6">
              {/* Header Card with Overall Score */}
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF0F5]">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-[#EC008C] bg-[#FFF0F7] px-2.5 py-0.5 rounded-full border border-[#FCE7F3] mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{analysisResult.isAiPowered ? 'Gemini 3.8 Flash AI tahlili' : 'Akademik rubrika (Demo)'}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-[#242124]">Tahlil Natijalari</h3>
                </div>

                <div className="flex items-center gap-2 bg-[#FFF0F7] px-4 py-2 rounded-2xl border border-[#FCE7F3]">
                  <span className="text-3xl font-black text-[#EC008C] tabular-nums">
                    {analysisResult.overallScore}
                  </span>
                  <span className="text-[10px] font-bold text-[#85818A] block leading-tight">
                    / 100<br />ball
                  </span>
                </div>
              </div>

              {/* 5 Rubric Scores Progress Bars (20 points each) */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#85818A] block">
                  Mezonlar bo‘yicha ballar (har biri 20 ballgacha)
                </span>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-[#FFF8FC] border border-[#FCE7F3]">
                    <div className="flex justify-between text-xs font-bold text-[#242124]">
                      <span>Grammatika (Grammar)</span>
                      <span className="text-[#EC008C]">{analysisResult.scores.grammar} / 20</span>
                    </div>
                    <div className="w-full h-1.5 bg-white rounded-full overflow-hidden mt-1.5 border border-[#FCE7F3]">
                      <div className="h-full bg-[#EC008C] rounded-full" style={{ width: `${(analysisResult.scores.grammar / 20) * 100}%` }} />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FFF8FC] border border-[#FCE7F3]">
                    <div className="flex justify-between text-xs font-bold text-[#242124]">
                      <span>Akademik lug‘at (Vocabulary)</span>
                      <span className="text-[#EC008C]">{analysisResult.scores.vocabulary} / 20</span>
                    </div>
                    <div className="w-full h-1.5 bg-white rounded-full overflow-hidden mt-1.5 border border-[#FCE7F3]">
                      <div className="h-full bg-[#EC008C] rounded-full" style={{ width: `${(analysisResult.scores.vocabulary / 20) * 100}%` }} />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FFF8FC] border border-[#FCE7F3]">
                    <div className="flex justify-between text-xs font-bold text-[#242124]">
                      <span>Mantiq va bog‘liqlik (Coherence)</span>
                      <span className="text-[#EC008C]">{analysisResult.scores.coherence} / 20</span>
                    </div>
                    <div className="w-full h-1.5 bg-white rounded-full overflow-hidden mt-1.5 border border-[#FCE7F3]">
                      <div className="h-full bg-[#EC008C] rounded-full" style={{ width: `${(analysisResult.scores.coherence / 20) * 100}%` }} />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FFF8FC] border border-[#FCE7F3]">
                    <div className="flex justify-between text-xs font-bold text-[#242124]">
                      <span>Mavzuni to‘liq ochish (Task Achievement)</span>
                      <span className="text-[#EC008C]">{analysisResult.scores.taskAchievement} / 20</span>
                    </div>
                    <div className="w-full h-1.5 bg-white rounded-full overflow-hidden mt-1.5 border border-[#FCE7F3]">
                      <div className="h-full bg-[#EC008C] rounded-full" style={{ width: `${(analysisResult.scores.taskAchievement / 20) * 100}%` }} />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FFF8FC] border border-[#FCE7F3]">
                    <div className="flex justify-between text-xs font-bold text-[#242124]">
                      <span>Jumla tuzilmalari (Sentence Structure)</span>
                      <span className="text-[#EC008C]">{analysisResult.scores.sentenceStructure} / 20</span>
                    </div>
                    <div className="w-full h-1.5 bg-white rounded-full overflow-hidden mt-1.5 border border-[#FCE7F3]">
                      <div className="h-full bg-[#EC008C] rounded-full" style={{ width: `${(analysisResult.scores.sentenceStructure / 20) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs for 13 Feedback Categories */}
              <div className="flex rounded-xl bg-[#FFF8FC] p-1 border border-[#FCE7F3] overflow-x-auto gap-1">
                <button
                  onClick={() => setFeedbackTab('overview')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    feedbackTab === 'overview' ? 'bg-[#EC008C] text-white shadow-xs' : 'text-[#85818A] hover:text-[#242124]'
                  }`}
                >
                  Umumiy
                </button>
                <button
                  onClick={() => setFeedbackTab('mistakes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    feedbackTab === 'mistakes' ? 'bg-[#EC008C] text-white shadow-xs' : 'text-[#85818A] hover:text-[#242124]'
                  }`}
                >
                  Grammatika ({analysisResult.grammarMistakes.length})
                </button>
                <button
                  onClick={() => setFeedbackTab('vocabulary')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    feedbackTab === 'vocabulary' ? 'bg-[#EC008C] text-white shadow-xs' : 'text-[#85818A] hover:text-[#242124]'
                  }`}
                >
                  Lug‘at ({analysisResult.vocabularyImprovements.length})
                </button>
                <button
                  onClick={() => setFeedbackTab('sentences')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    feedbackTab === 'sentences' ? 'bg-[#EC008C] text-white shadow-xs' : 'text-[#85818A] hover:text-[#242124]'
                  }`}
                >
                  Jumlalar ({analysisResult.weakSentences.length})
                </button>
                <button
                  onClick={() => setFeedbackTab('plan')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    feedbackTab === 'plan' ? 'bg-[#EC008C] text-white shadow-xs' : 'text-[#85818A] hover:text-[#242124]'
                  }`}
                >
                  Reja
                </button>
                <button
                  onClick={() => setFeedbackTab('exemplar')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    feedbackTab === 'exemplar' ? 'bg-[#EC008C] text-white shadow-xs' : 'text-[#85818A] hover:text-[#242124]'
                  }`}
                >
                  Namuna
                </button>
              </div>

              {/* Tab 1: Overview (Strengths, Areas for Improvement, Verdict) */}
              {feedbackTab === 'overview' && (
                <div className="space-y-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3]">
                    <span className="font-extrabold text-[#EC008C] uppercase tracking-wider block mb-1">
                      Umumiy Xulosa
                    </span>
                    <p className="text-[#242124] leading-relaxed">
                      {analysisResult.verdict}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="font-extrabold text-[#242124] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Inshoning kuchli tomonlari:</span>
                    </span>
                    <ul className="space-y-1.5 pl-5 list-disc text-[#85818A]">
                      {analysisResult.strengths.map((s, idx) => (
                        <li key={idx} className="leading-relaxed text-[#242124]">{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-1">
                    <span className="font-extrabold text-[#242124] flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Rivojlantirish kerak bo‘lgan sohalar:</span>
                    </span>
                    <ul className="space-y-1.5 pl-5 list-disc text-[#85818A]">
                      {analysisResult.areasNeedingImprovement.map((a, idx) => (
                        <li key={idx} className="leading-relaxed text-[#242124]">{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: Grammar Mistakes with explanations */}
              {feedbackTab === 'mistakes' && (
                <div className="space-y-3 text-xs max-h-96 overflow-y-auto pr-1">
                  {analysisResult.grammarMistakes.length > 0 ? (
                    analysisResult.grammarMistakes.map((gm, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-[#EC008C] bg-white px-2 py-0.5 rounded border border-[#FCE7F3]">
                            {gm.ruleType}
                          </span>
                          <button
                            onClick={() => handleApplyCorrection(gm.original, gm.correction)}
                            className="text-[10px] font-bold text-[#EC008C] hover:underline"
                          >
                            Matnga tatbiq etish →
                          </button>
                        </div>
                        <p className="line-through text-red-600 font-semibold">"{gm.original}"</p>
                        <p className="text-emerald-700 font-bold bg-emerald-50 p-2 rounded-xl">✓ "{gm.correction}"</p>
                        <p className="text-[#85818A] leading-relaxed">
                          <strong className="text-[#242124]">Tushuntirish:</strong> {gm.explanation}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-[#85818A]">
                      Jiddiy grammatik xatolar aniqlanmadi!
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Vocabulary Improvements */}
              {feedbackTab === 'vocabulary' && (
                <div className="space-y-3 text-xs max-h-96 overflow-y-auto pr-1">
                  {analysisResult.vocabularyImprovements.map((vi, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#242124]">
                          Oddiy so‘z: <span className="text-[#EC008C]">{vi.weakWord}</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[10px] text-[#85818A] block w-full">Akademik muqobillari:</span>
                        {vi.suggestedAlternatives.map((alt, i) => (
                          <button
                            key={i}
                            onClick={() => handleApplyCorrection(vi.weakWord, alt)}
                            className="px-2 py-1 bg-white hover:bg-[#FFF0F7] border border-[#FCE7F3] text-xs font-bold text-[#EC008C] rounded-lg transition-colors"
                          >
                            + {alt}
                          </button>
                        ))}
                      </div>
                      <p className="text-[#85818A] leading-relaxed pt-1">
                        <strong className="text-[#242124]">Nega tavsiya etiladi:</strong> {vi.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: Weak Sentences and Improved Versions */}
              {feedbackTab === 'sentences' && (
                <div className="space-y-3 text-xs max-h-96 overflow-y-auto pr-1">
                  {analysisResult.weakSentences.map((ws, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-[#85818A] uppercase">Zaif jumla</span>
                        <button
                          onClick={() => handleApplyCorrection(ws.original, ws.improved)}
                          className="text-[10px] font-bold text-[#EC008C] hover:underline"
                        >
                          Matnga kiritish →
                        </button>
                      </div>
                      <p className="text-red-700 italic bg-red-50/50 p-2 rounded-xl">"{ws.original}"</p>
                      <p className="text-emerald-800 font-medium italic bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 font-serif">
                        "{ws.improved}"
                      </p>
                      <p className="text-[#85818A] leading-relaxed">
                        <strong className="text-[#242124]">Tahlil:</strong> {ws.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 5: Personalized Improvement Plan */}
              {feedbackTab === 'plan' && (
                <div className="space-y-3 text-xs max-h-96 overflow-y-auto pr-1">
                  <span className="font-extrabold text-[#EC008C] uppercase tracking-wider block">
                    Shaxsiy Rivojlanish Rejasi (3–5 qadam)
                  </span>
                  {analysisResult.personalizedPlan.map((step) => (
                    <div key={step.step} className="p-3.5 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#EC008C] text-white flex items-center justify-center font-bold text-[10px]">
                          {step.step}
                        </span>
                        <h4 className="font-bold text-[#242124]">{step.title}</h4>
                      </div>
                      <p className="text-[#85818A] leading-relaxed pl-7">{step.action}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 6: Improved Full Essay Exemplar */}
              {feedbackTab === 'exemplar' && (
                <div className="space-y-3 text-xs max-h-96 overflow-y-auto pr-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#EC008C] uppercase tracking-wider">
                      Mukammal C1/C2 Namunaviy Insho
                    </span>
                    <button
                      onClick={handleCopyExemplar}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#EC008C] hover:underline"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'Nusxalandi!' : 'Nusxa olish'}</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-xs sm:text-sm text-[#242124] leading-relaxed font-serif whitespace-pre-line">
                    {analysisResult.improvedFullEssay}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Idle Info Deck */
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E6EF] shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-[#EC008C] uppercase tracking-wider">
                  AI Essay Coach
                </span>
                <h3 className="text-base font-bold text-[#242124]">
                  Inshongizni tekshirtirishga tayyormisiz?
                </h3>
                <p className="text-xs text-[#85818A] leading-relaxed">
                  "Inshoni tekshirish" tugmasini bosing. AI sizning inshongizni 13 ta kategoriya bo‘yicha to‘liq baholaydi va mukammal namuna taqdim etadi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] space-y-2.5">
                <h4 className="text-xs font-bold text-[#242124]">13 ta tahlil yo‘nalishi:</h4>
                <div className="grid grid-cols-1 gap-1.5 text-[11px] text-[#85818A]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#EC008C]" />
                    <span>100 ballik CEFR baholash tizimi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#EC008C]" />
                    <span>Grammatika va so‘z xatolarining o‘zbekcha izohi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#EC008C]" />
                    <span>Zaif jumlalarni akademik uslubda kuchaytirish</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#EC008C]" />
                    <span>Shaxsiy takomillashtirish rejasi va to‘liq namuna</span>
                  </div>
                </div>
              </div>

              {/* Saved Drafts List */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-[#242124]">Oxirgi saqlangan insholar:</span>
                <div className="space-y-2">
                  {essays.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectEssay(item)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all text-xs ${
                        item.id === currentEssayId
                          ? 'bg-[#FFF0F7] border-[#EC008C]'
                          : 'bg-white border-[#F5E6EF] hover:border-[#EC008C]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#242124] truncate">{item.title}</span>
                        {item.score && (
                          <span className="font-extrabold text-[#EC008C]">{item.score} ball</span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#85818A] truncate mt-0.5">{item.topic || item.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
