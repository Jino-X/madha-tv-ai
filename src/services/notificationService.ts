import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { NotificationSettings } from '../types';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Spiritual Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#8B1A1A',
    });
  }

  return true;
}

export async function scheduleNotification(
  title: string,
  body: string,
  trigger: Notifications.NotificationTriggerInput
): Promise<string> {
  return await Notifications.scheduleNotificationAsync({
    content: { title, body, sound: 'default' },
    trigger,
  });
}

export async function cancelNotification(id: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(id);
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

function createDailyTrigger(hours: number, minutes: number): Notifications.NotificationTriggerInput {
  return {
    type: Notifications.SchedulableTriggerInputTypes.DAILY,
    hour: hours,
    minute: minutes,
  };
}

export async function scheduleFromSettings(settings: NotificationSettings): Promise<Record<string, string[]>> {
  await cancelAllNotifications();
  const ids: Record<string, string[]> = {};

  if (settings.morningGospel) {
    const [hours, minutes] = settings.morningGospelTime.split(':').map(Number);
    const id = await scheduleNotification(
      'Morning Gospel',
      'Start your day with the Word of God',
      createDailyTrigger(hours, minutes)
    );
    ids['morningGospel'] = [id];
  }

  if (settings.eveningReflection) {
    const [hours, minutes] = settings.eveningReflectionTime.split(':').map(Number);
    const id = await scheduleNotification(
      'Evening Reflection',
      'Take a moment to reflect on today\'s blessings',
      createDailyTrigger(hours, minutes)
    );
    ids['eveningReflection'] = [id];
  }

  if (settings.angelus) {
    const angelusIds: string[] = [];
    for (const time of settings.angelusTimes) {
      const [hours, minutes] = time.split(':').map(Number);
      const id = await scheduleNotification(
        'Angelus',
        'The Angel of the Lord declared unto Mary...',
        createDailyTrigger(hours, minutes)
      );
      angelusIds.push(id);
    }
    ids['angelus'] = angelusIds;
  }

  return ids;
}
