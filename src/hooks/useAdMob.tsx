
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { AdMobService } from '@/services/admob';

export const useAdMob = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    const initializeAdMob = async () => {
      if (Capacitor.isNativePlatform()) {
        setIsNative(true);
        try {
          await AdMobService.initialize();
          setIsInitialized(true);
        } catch (error) {
          console.error('AdMob initialization error:', error);
        }
      }
    };

    initializeAdMob();
  }, []);

  const showBannerAd = async () => {
    if (isNative && isInitialized) {
      await AdMobService.showBannerAd();
    }
  };

  const hideBannerAd = async () => {
    if (isNative && isInitialized) {
      await AdMobService.hideBannerAd();
    }
  };

  const showInterstitialAd = async () => {
    if (isNative && isInitialized) {
      await AdMobService.showInterstitialAd();
    }
  };

  return {
    isInitialized,
    isNative,
    showBannerAd,
    hideBannerAd,
    showInterstitialAd,
  };
};
