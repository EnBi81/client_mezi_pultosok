import { UseNotificationService } from '../../hooks/useNotificationService';

export const NotificationManager = ({ children }: { children: React.ReactNode }) => {
  const { init } = UseNotificationService();

  init();

  return children;
};
