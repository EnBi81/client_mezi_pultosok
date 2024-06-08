export interface SunEvent {
  type: 'sunrise' | 'sunset' | 'golden-hour-evening' | 'golden-hour-end-morning';
  startAt: Date;
  getDisplayTextUntil: () => string;
}
