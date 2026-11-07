import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { SHEEP_AVATARS, PinkSheepMascot } from '../common/PinkSheepMascot';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Save, LogOut, RotateCcw, Globe } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { user, updateProfile, logoutUser, resetAllData } = useApp();
  const { t } = useLanguage();

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

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header Bar */}
      <div>
        <span className="text-xs font-extrabold tracking-wider text-[#EC008C] uppercase">
          {t('settings.title')}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242124] tracking-tight">
          {t('settings.profileCardTitle')}
        </h1>
        <p className="text-sm text-[#85818A] mt-0.5">
          {t('settings.subtitle')}
        </p>
      </div>

      {/* Language Selection Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E6EF] shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF0F7] border border-[#FCE7F3] flex items-center justify-center text-[#EC008C]">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#242124]">
              {t('settings.langCardTitle')}
            </h3>
            <p className="text-xs text-[#85818A]">
              {t('settings.langCardDesc')}
            </p>
          </div>
        </div>

        <LanguageSwitcher variant="inline" className="pt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Avatar Coat & Info (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E6EF] shadow-xs space-y-6">
          {/* Avatar Coat Selector */}
          <div>
            <h3 className="text-sm font-bold text-[#242124]">{t('profile.chooseAvatar')}</h3>
            <p className="text-xs text-[#85818A] mt-0.5">
              PinkSheep mascot
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mt-4">
              {SHEEP_AVATARS.map((avatar) => {
                const isSelected = selectedAvatarId === avatar.id;
                return (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatarId(avatar.id)}
                    className={`p-1 rounded-full transition-all duration-200 cursor-pointer ${
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
              {t('auth.usernameLabel')}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={20}
              className="w-full px-4 py-3 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-sm font-semibold text-[#242124] focus:outline-none focus:border-[#EC008C]"
            />
          </div>

          {/* Short Bio Textarea */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider">
              {t('profile.bioLabel')}
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={280}
              rows={4}
              placeholder="Academic goals, target scholarships, university aspirations..."
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
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-2xl shadow-md shadow-[#EC008C]/25 transition-all active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t('common.save')}</span>
            </button>
          </div>
        </div>

        {/* Right Info: Live Preview & Session (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Preview Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs text-center flex flex-col items-center space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#85818A]">
              Preview
            </span>

            <PinkSheepMascot avatarId={selectedAvatarId} size="xl" />

            <div>
              <h3 className="text-base font-bold text-[#242124]">
                {username || user.username}
              </h3>
              <p className="text-xs font-semibold text-[#EC008C] mt-0.5">
                {t('common.level')} {user.level} · {user.pinkCoins} {t('common.coins')}
              </p>
              <p className="text-[11px] text-[#85818A] mt-1">{user.email}</p>
            </div>
          </div>

          {/* Session / Logout Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#242124]">{t('common.logout')}</h3>
            <p className="text-xs text-[#85818A] leading-relaxed">
              Safe session termination. All essays, coins, and achievements remain securely stored in your account.
            </p>

            <button
              onClick={logoutUser}
              className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-[#242124] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('common.logout')}</span>
            </button>
          </div>

          {/* Reset Demo Data Card */}
          <div className="p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#85818A]">
              {t('settings.dangerZoneTitle')}
            </span>
            <p className="text-[11px] text-[#85818A]">
              {t('settings.dangerZoneDesc')}
            </p>
            <button
              onClick={resetAllData}
              className="text-xs font-bold text-[#EC008C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t('settings.resetBtn')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
