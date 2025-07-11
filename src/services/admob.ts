
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

export class AdMobService {
  private static readonly BANNER_AD_ID = 'ca-app-pub-8168731240539272/8413732470';
  private static readonly TEST_BANNER_AD_ID = 'ca-app-pub-3940256099942544/6300978111'; // Test ad ID

  static async initialize() {
    try {
      await AdMob.initialize({
        testingDevices: ['YOUR_DEVICE_ID_HERE'], // Add your device ID for testing
        initializeForTesting: false,
      });
      console.log('AdMob initialized successfully');
    } catch (error) {
      console.error('AdMob initialization failed:', error);
    }
  }

  static async showBannerAd() {
    const options: BannerAdOptions = {
      adId: this.BANNER_AD_ID,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: false, // Set to true for testing
    };

    try {
      await AdMob.showBanner(options);
      console.log('Banner ad shown successfully');
    } catch (error) {
      console.error('Failed to show banner ad:', error);
    }
  }

  static async hideBannerAd() {
    try {
      await AdMob.hideBanner();
      console.log('Banner ad hidden successfully');
    } catch (error) {
      console.error('Failed to hide banner ad:', error);
    }
  }

  static async showInterstitialAd() {
    const options = {
      adId: this.BANNER_AD_ID, // Using same ID, you can create separate interstitial ad ID
      isTesting: false,
    };

    try {
      await AdMob.prepareInterstitial(options);
      await AdMob.showInterstitial();
      console.log('Interstitial ad shown successfully');
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
    }
  }
}
