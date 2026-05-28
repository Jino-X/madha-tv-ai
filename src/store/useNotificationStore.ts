import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationSettings } from '../types';

interface NotificationStore {
  settings: NotificationSettings;
  scheduledIds: Record<string, string[]>;
  toggleSetting: (key: keyof NotificationSettings) => void;
  updateTime: (key: string, time: string) => void;
  setSettings: (settings: Partial<NotificationSettings>) => void;
}

const defaultSettings: NotificationSettings = {
  morningGospel: true,
  morningGospelTime: '07:00',
  eveningReflection: false,
  eveningReflectionTime: '21:30',
  angelus: true,
  angelusTimes: ['06:00', '12:00', '18:00'],
  rosary: false,
  rosaryTime: '17:00',
  communityIntercession: true,
  communityRequests: true,
  spiritualDiaryPrompt: false,
  spiritualDiaryTime: '20:00',
};

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      scheduledIds: {},

      toggleSetting: (key: keyof NotificationSettings) => {
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: !state.settings[key],
          },
        }));
      },

      updateTime: (key: string, time: string) => {
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: time,
          },
        }));
      },

      setSettings: (newSettings: Partial<NotificationSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },
    }),
    {
      name: 'notification-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
