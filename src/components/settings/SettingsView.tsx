import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SHEEP_AVATARS, PinkSheepMascot } from '../common/PinkSheepMascot';
import { Save, LogOut, CheckCircle2, RotateCcw } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { user, updateProfile, setActiveTab, resetAllData } = useApp();

  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [selectedAvatarId, setSelectedAvatarId] = useState(user.avatarId);

  const handleSave = () => {
    updateProfile({
      username: username.trim() || user.username,
      bio: bio.trim(),
      avatarId: selectedAvatarId
    });
  };

  const handleLogout = () => {
    setActiveTab('landing');
  };

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header Bar (Matches Screenshot 17) */}
      <div>
        <span className="text-xs font-extrabold tracking-wider text-[#EC008C] uppercase">
          Sozlamalar
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242124] tracking-tight">
          Sizning profilingiz
        </h1>
        <p className="text-sm text-[#85818A] mt-0.5">
          Boshqa yozuvchilar sizni peshqadamlar jadvalida va ommaviy profilda shunday ko‘rishadi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Avatar Coat & Info (8 cols) (Matches Screenshot 17) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E6EF] shadow-xs space-y-6">
          {/* Avatar Coat Selector */}
          <div>
            <h3 className="text-sm font-bold text-[#242124]">Pink Sheep ko‘rinishini tanlang</h3>
            <p className="text-xs text-[#85818A] mt-0.5">
              Har bir avatar boshqacha tusdagi o‘sha quvnoq qo‘zichoqdir.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mt-4">
              {SHEEP_AVATARS.map((avatar) => {
                const isSelected = selectedAvatarId === avatar.id;
                return (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatarId(avatar.id)}
                    className={`p-1 rounded-full transition-all duration-200 ${
                      isSelected
                        ? 'ring-3 ring-[#EC008C] ring-offset-2 scale-110'
                        : 'opacity-80 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <PinkSheepMascot avatarId={avatar.id} size="md" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Username Input */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider">
              Foydalanuvchi nomi (Username)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={20}
              className="w-full px-4 py-3 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-sm font-semibold text-[#242124] focus:outline-none focus:border-[#EC008C]"
            />
            <span className="text-[11px] text-[#85818A] block">
              3–20 ta belgi. Harflar, raqamlar va pastki chiziqdan foydalaning.
            </span>
          </div>

          {/* Short Bio Textarea */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider">
              Qisqacha bio (Maqsadlaringiz)
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={280}
              rows={4}
              placeholder="Qaysi grant yoki universitetga ariza topshirmoqdasiz? Qanday soha bo‘yicha ishlayapsiz?"
              className="w-full p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-sm text-[#242124] focus:outline-none focus:border-[#EC008C] resize-none"
            />
            <div className="flex justify-end text-[11px] text-[#85818A]">
              <span>{bio.length} / 280</span>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-2xl shadow-md shadow-[#EC008C]/25 transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>O‘zgarishlarni saqlash</span>
            </button>
          </div>
        </div>

        {/* Right Info: Live Preview & Session (4 cols) (Matches Screenshot 17) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Preview Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs text-center flex flex-col items-center space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#85818A]">
              Jonli ko‘rinish
            </span>

            <PinkSheepMascot avatarId={selectedAvatarId} size="xl" />

            <div>
              <h3 className="text-base font-bold text-[#242124]">
                {username || user.username}
              </h3>
              <p className="text-xs font-semibold text-[#EC008C] mt-0.5">
                Level {user.level} · {user.pinkCoins} Pink Coin
              </p>
              <p className="text-[11px] text-[#85818A] mt-1">{user.email}</p>
            </div>
          </div>

          {/* Session / Logout Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#242124]">Sessiya</h3>
            <p className="text-xs text-[#85818A] leading-relaxed">
              Tizimdan chiqish ushbu qurilmadagi faollikni yakunlaydi. Barcha ballaringiz va insholaringiz saqlanadi.
            </p>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-[#242124] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Tizimdan chiqish</span>
            </button>
          </div>

          {/* Reset Demo Data Card */}
          <div className="p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#85818A]">
              Boshlang‘ich holat
            </span>
            <p className="text-[11px] text-[#85818A]">
              Barcha tangalar va tahlillarni dastlabki namoyish holatiga qaytarish:
            </p>
            <button
              onClick={resetAllData}
              className="text-xs font-bold text-[#EC008C] hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Dastlabki holatga qaytarish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
