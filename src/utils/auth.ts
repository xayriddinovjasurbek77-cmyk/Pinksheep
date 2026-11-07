/**
 * Secure Authentication Utility
 * Implements salted SHA-256 cryptographic password hashing using the native Web Crypto API.
 * Plain-text passwords are never stored in localStorage or transmitted insecurely.
 */

const SALT = 'pinksheep_edtech_platform_salt_2026_';

export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(SALT + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export interface StoredUserAccount {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  avatarId: number;
  joinedDate: string;
}

const ACCOUNTS_STORAGE_KEY = 'pinksheep_accounts_registry_v2';
const SESSION_STORAGE_KEY = 'pinksheep_active_session_v2';

export async function registerAccount(
  username: string,
  email: string,
  passwordPlain: string
): Promise<{ success: boolean; error?: string; user?: StoredUserAccount }> {
  try {
    const accounts = getStoredAccounts();
    const normalizedEmail = email.trim().toLowerCase();

    if (accounts.some(a => a.email.toLowerCase() === normalizedEmail)) {
      return { success: false, error: "Ushbu elektron pochta manzili bilan allaqachon hisob ochilgan." };
    }

    const passwordHash = await hashPassword(passwordPlain);
    const newAccount: StoredUserAccount = {
      id: `usr_${Date.now()}`,
      username: username.trim(),
      email: normalizedEmail,
      passwordHash,
      avatarId: 1,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    accounts.push(newAccount);
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    saveActiveSession(newAccount.id);

    return { success: true, user: newAccount };
  } catch (err: any) {
    return { success: false, error: err.message || "Ro'yxatdan o'tishda xatolik yuz berdi." };
  }
}

export async function loginAccount(
  email: string,
  passwordPlain: string
): Promise<{ success: boolean; error?: string; user?: StoredUserAccount }> {
  try {
    const accounts = getStoredAccounts();
    const normalizedEmail = email.trim().toLowerCase();
    const user = accounts.find(a => a.email.toLowerCase() === normalizedEmail);

    if (!user) {
      return { success: false, error: "Ushbu elektron pochta manziliga ega foydalanuvchi topilmadi." };
    }

    const providedHash = await hashPassword(passwordPlain);
    if (providedHash !== user.passwordHash) {
      return { success: false, error: "Kiritilgan parol noto'g'ri. Qayta urinib ko'ring." };
    }

    saveActiveSession(user.id);
    return { success: true, user };
  } catch (err: any) {
    return { success: false, error: err.message || "Kirishda xatolik yuz berdi." };
  }
}

export function getStoredAccounts(): StoredUserAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) {
      // Seed default demo user with pre-hashed password
      const seed: StoredUserAccount = {
        id: 'user_azizbek_01',
        username: 'AzizbekOtabekov',
        email: 'dilnurateshayeva58@gmail.com',
        // Hash for demo password 'password123'
        passwordHash: 'e79c2354f9a0c3bb084fc6d4e5f78cbb42e03884b6480b2d6a59dc3e4299b877',
        avatarId: 1,
        joinedDate: '2026-11-02'
      };
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify([seed]));
      return [seed];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveActiveSession(userId: string) {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, userId);
  } catch {
    // ignore
  }
}

export function getActiveSessionUserId(): string | null {
  try {
    return localStorage.getItem(SESSION_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function clearActiveSession() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // ignore
  }
}
