import { useNotificationService } from '../../hooks/useNotificationService';

export const NotificationManager = ({ children }: { children: React.ReactNode }) => {
  const { init } = useNotificationService();

  init();

  return children;
};
