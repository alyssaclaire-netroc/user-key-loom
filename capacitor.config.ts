import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ff437d0ab1e942eca7274e3eb56370b5',
  appName: 'user-key-loom',
  webDir: 'dist',
  server: {
    url: 'https://ff437d0a-b1e9-42ec-a727-4e3eb56370b5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#FFFEF7'
    }
  }
};

export default config;