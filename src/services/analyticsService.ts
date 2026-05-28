// Analytics service placeholder
// Integrate with Posthog or similar when ready for production

type EventName =
  | 'app_open'
  | 'message_sent'
  | 'voice_recording_started'
  | 'voice_recording_stopped'
  | 'gospel_read'
  | 'prayer_submitted'
  | 'prayer_joined'
  | 'theme_changed'
  | 'notification_toggled'
  | 'journal_entry_added';

interface EventProperties {
  [key: string]: string | number | boolean;
}

let analyticsEnabled = false;

export function initializeAnalytics(): void {
  analyticsEnabled = true;
}

export function trackEvent(name: EventName, properties?: EventProperties): void {
  if (!analyticsEnabled) return;

  // In production, send to Posthog:
  // posthog.capture(name, properties);
  if (__DEV__) {
    console.log(`[Analytics] ${name}`, properties);
  }
}

export function identifyUser(userId: string, traits?: Record<string, string>): void {
  if (!analyticsEnabled) return;

  // In production:
  // posthog.identify(userId, traits);
  if (__DEV__) {
    console.log(`[Analytics] Identify: ${userId}`, traits);
  }
}

export function resetAnalytics(): void {
  // In production:
  // posthog.reset();
}
