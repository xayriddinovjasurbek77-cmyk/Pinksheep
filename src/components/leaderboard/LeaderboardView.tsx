import React from 'react';
import { useApp } from '../../context/AppContext';
import { PinkSheepMascot } from '../common/PinkSheepMascot';
import { Trophy, Medal, Award, Flame, Sparkles } from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { leaderboard, user } = useApp();

  const currentUserRank = leaderboard.find(u => u.id === user.id)?.rank || 1;

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header Bar (Matches Screenshot 14) */}
      <div>
        <span className="text-xs font-extrabold tracking-wider text-[#EC008C] uppercase">
          Reyting
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242124] tracking-tight">
          Pink Coin bo‘yicha reyting
        </h1>
        <p className="text-sm text-[#85818A] mt-0.5">
          Faqat haqiqiy ta'limiy faoliyat tanga beradi — tahlil qilingan insholar va g‘alaba qozonilgan o‘yinlar. Reytinglar avtomatik qayta hisoblanadi.
        </p>
      </div>

      {/* Your Position Pink Banner (Matches Screenshot 14) */}
      <div className="bg-gradient-to-r from-[#EC008C] to-[#FF4DA6] text-white rounded-3xl p-5 sm:p-6 shadow-xl shadow-[#EC008C]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md shrink-0">
            <PinkSheepMascot avatarId={user.avatarId} size="sm" />
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/80 block">
              Sizning o‘rningiz
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {user.username}
              </h2>
              <span className="text-sm font-black bg-white/20 px-2 py-0.5 rounded-lg">
                #{currentUserRank}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-auto">
          <div className="text-right">
            <span className="text-xs text-white/80 block font-semibold">To‘plangan</span>
            <span className="text-lg font-black text-white tabular-nums">
              {user.pinkCoins} Ⓟ
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            Level {user.level}
          </div>
        </div>
      </div>

      {/* Leaderboard Table (Matches Screenshot 14) */}
      <div className="bg-white rounded-3xl border border-[#F5E6EF] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF8FC] border-b border-[#FAF0F5] text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">O‘rin</th>
                <th className="py-4 px-6">Yozuvchi</th>
                <th className="py-4 px-6">Daraja</th>
                <th className="py-4 px-6">Pink Coin</th>
                <th className="py-4 px-6">Insholar</th>
                <th className="py-4 px-6">G‘alabalar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF0F5]">
              {leaderboard.map((writer) => {
                const isCurrentUser = writer.id === user.id;

                return (
                  <tr
                    key={writer.id}
                    className={`transition-colors ${
                      isCurrentUser
                        ? 'bg-[#FFF0F7]/70 font-semibold'
                        : 'hover:bg-[#FFF8FC]'
                    }`}
                  >
                    {/* Rank with special icons for top 3 */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {writer.rank === 1 ? (
                        <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-black text-xs shadow-xs">
                          👑
                        </div>
                      ) : writer.rank === 2 ? (
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-black text-xs">
                          🥈
                        </div>
                      ) : writer.rank === 3 ? (
                        <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xs">
                          🥉
                        </div>
                      ) : (
                        <span className="font-bold text-[#85818A] pl-2 tabular-nums">
                          #{writer.rank}
                        </span>
                      )}
                    </td>

                    {/* Writer name & avatar */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <PinkSheepMascot avatarId={writer.avatarId} size="xs" />
                        <div>
                          <p className={`font-bold ${isCurrentUser ? 'text-[#EC008C]' : 'text-[#242124]'}`}>
                            {writer.username}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                writer.isOnline ? 'bg-emerald-500' : 'bg-gray-300'
                              }`}
                            />
                            <span className="text-[10px] text-[#85818A]">
                              {writer.isOnline ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Level Badge */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FFF0F7] text-[#EC008C] border border-[#FCE7F3]">
                        Level {writer.level}
                      </span>
                    </td>

                    {/* Pink Coins */}
                    <td className="py-4 px-6 whitespace-nowrap font-extrabold text-[#EC008C] tabular-nums">
                      {writer.pinkCoins}
                    </td>

                    {/* Essays */}
                    <td className="py-4 px-6 whitespace-nowrap font-medium text-[#242124] tabular-nums">
                      {writer.essays}
                    </td>

                    {/* Victories */}
                    <td className="py-4 px-6 whitespace-nowrap font-medium text-[#242124] tabular-nums">
                      {writer.victories}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
