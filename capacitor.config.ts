
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.961fa8a5e99f49ba8d1d090a08c0e999',
  appName: 'cosmetic-ai-insight',
  webDir: 'dist',
  server: {
    url: 'https://961fa8a5-e99f-49ba-8d1d-090a08c0e999.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#8B5CF6',
      showSpinner: false
    }
  }
};

export default config;
