import { ExpoConfig, ConfigContext } from '@expo/config';

// Define version and build number dynamically if needed (e.g., via environment variables)
const VERSION = '1.0.0';
const BUILD_NUMBER = '1';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'CallGuard',
  slug: 'callguard-app',
  version: VERSION,
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: 'callguard',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#0A0F18', // Cor do tema do Firewall
  },
  assetBundlePatterns: ['**/*'],
  
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.callguard.app',
    buildNumber: BUILD_NUMBER,
    infoPlist: {
      // No iOS, não temos o mesmo nível de controle em tempo real,
      // mas preparamos para o Call Directory Extension
      LSApplicationCategoryType: 'public.app-category.utilities',
    },
  },
  
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#0A0F18',
    },
    package: 'com.callguard.app',
    versionCode: parseInt(BUILD_NUMBER, 10),
    permissions: [
      'android.permission.READ_PHONE_STATE',
      'android.permission.READ_CALL_LOG',
      'android.permission.BIND_SCREENING_SERVICE', // Permissão crucial para o serviço nativo
    ],
  },
  
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/favicon.png',
  },
  
  plugins: [
    'expo-router',
    [
      'expo-build-properties',
      {
        android: {
          // A API CallScreeningService exige Android 8.0 (API 26) no mínimo
          minSdkVersion: 26,
          compileSdkVersion: 34,
          targetSdkVersion: 34,
        },
        ios: {
          deploymentTarget: '13.0',
        },
      },
    ],
    // Plugin do nosso módulo nativo customizado que criaremos para interceptar as ligações
    './src/infrastructure/native-call-screener',
  ],
  
  experiments: {
    tsconfigPaths: true,
  },
  
  extra: {
    eas: {
      projectId: 'your-eas-project-id', // Substituir no CI/CD
    },
  },
});
