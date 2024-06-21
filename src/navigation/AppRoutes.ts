import { AppRoute } from '../interfaces/AppRoute';

export const AppRoutes: AppRoutesCollection = {
  schedule: {
    name: 'Schedule',
  },
  settings: {
    name: 'Settings',
  },
  whatsNew: {
    name: 'WhatsNew',
  },
  debugGradient: {
    name: 'DebugGradient',
  },
};

interface AppRoutesCollection {
  schedule: AppRoute;
  settings: AppRoute;
  whatsNew: AppRoute;
  debugGradient: AppRoute;
}
