import { useCallback, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';

import { type ICookieBanner, type ICookieSettingsItem } from '@/types/common';

export type ConsentUpdateFunction = (consentObject: Record<string, boolean>) => void;

export interface IConsentLogic {
  getAcceptValue?: (allSettings: ICookieSettingsItem[]) => Record<string, boolean>;
  getDeclineValue?: (allSettings: ICookieSettingsItem[]) => Record<string, boolean>;
  getSaveValue?: (
    currentSelection: ICookieSettingsItem[],
    allSettings: ICookieSettingsItem[],
  ) => Record<string, boolean>;
}

const useCookie = (
  key: string,
): [string | null, (value: string, options?: Cookies.CookieAttributes) => void] => {
  const [cookieValue, setCookieValue] = useState<string | null>(() => Cookies.get(key) || null);

  const updateCookie = useCallback(
    (value: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(key, value, { expires: 365, path: '/', ...options });
      setCookieValue(value);
    },
    [key],
  );

  return [cookieValue, updateCookie];
};

const initializeCheckboxValues = (
  cookieValue: string | null,
  cookieSettings: ICookieSettingsItem[],
): ICookieSettingsItem[] => {
  let consentObject: Record<string, boolean> = {};
  if (cookieValue) {
    try {
      consentObject = JSON.parse(cookieValue);
      if (typeof consentObject !== 'object' || consentObject === null) {
        consentObject = {};
      }
    } catch (error) {
      console.error('Error parsing cookie value:', error);
      consentObject = {};
    }
  }

  return cookieSettings.map((setting) => ({
    ...setting,
    isChecked: consentObject[setting.value] === true || setting.isRequired,
  }));
};

const defaultConsentLogic: Required<IConsentLogic> = {
  getAcceptValue: (allSettings) => {
    const consent: Record<string, boolean> = {};
    allSettings.forEach((s) => {
      consent[s.value] = true;
    });
    return consent;
  },
  getDeclineValue: (allSettings) => {
    const consent: Record<string, boolean> = {};
    allSettings.forEach((s) => {
      consent[s.value] = s.isRequired;
    });
    return consent;
  },
  getSaveValue: (currentSelection, allSettings) => {
    const consent: Record<string, boolean> = {};
    currentSelection.forEach((s) => {
      consent[s.value] = s.isChecked;
    });
    allSettings.forEach((s) => {
      if (!(s.value in consent)) {
        consent[s.value] = false;
      }
      if (s.isRequired) {
        consent[s.value] = true;
      }
    });
    return consent;
  },
};

const updateGtagConsent: ConsentUpdateFunction = (consentObject) => {
  if (typeof window === 'undefined') {
    return;
  }
  // @ts-expect-error gtag is not defined in the global scope
  if (typeof window?.gtag !== 'function') {
    console.warn('gtag function not found. Cannot update GA consent.');
    return;
  }
  const consentState = {
    analytics_storage: consentObject?.analytics ? 'granted' : 'denied',
    ad_storage: consentObject?.marketing ? 'granted' : 'denied',
  };
  // @ts-expect-error gtag is not defined in the global scope
  window?.gtag('consent', 'update', consentState);
};

interface IUseCookieBannerProps {
  cookieSettings: ICookieSettingsItem[];
  cookieKey: string;
  consentLogic?: IConsentLogic;
  onConsentChange?: ConsentUpdateFunction;
}

export default function useCookieBanner({
  cookieSettings,
  cookieKey,
  consentLogic = {},
  onConsentChange = updateGtagConsent,
}: IUseCookieBannerProps): ICookieBanner {
  const [cookieValue, updateCookie] = useCookie(cookieKey);
  const [checkboxValues, setCheckboxValues] = useState<ICookieSettingsItem[]>(() =>
    initializeCheckboxValues(cookieValue, cookieSettings),
  );
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const effectiveConsentLogic = useMemo(() => {
    return { ...defaultConsentLogic, ...consentLogic };
  }, [consentLogic]);

  const handleOpenSettings = useCallback(() => setIsSettingsOpen(true), []);
  const handleCloseSettings = useCallback(() => setIsSettingsOpen(false), []);

  const handleCookieUpdate = useCallback(
    (value: Record<string, boolean>) => {
      const cookieString = JSON.stringify(value);
      updateCookie(cookieString);
      setIsCookieBannerVisible(false);
      setIsSettingsOpen(false);
      setCheckboxValues(initializeCheckboxValues(cookieString, cookieSettings));
      onConsentChange(value);
    },
    [updateCookie, cookieSettings, onConsentChange],
  );

  const handleAcceptClick = useCallback(() => {
    const valueToSet = effectiveConsentLogic.getAcceptValue(cookieSettings);
    handleCookieUpdate(valueToSet);
  }, [handleCookieUpdate, cookieSettings, effectiveConsentLogic]);

  const handleDeclineClick = useCallback(() => {
    const valueToSet = effectiveConsentLogic.getDeclineValue(cookieSettings);
    handleCookieUpdate(valueToSet);
  }, [handleCookieUpdate, cookieSettings, effectiveConsentLogic]);

  const handleSaveClick = useCallback(() => {
    const valueToSet = effectiveConsentLogic.getSaveValue(checkboxValues, cookieSettings);
    handleCookieUpdate(valueToSet);
  }, [handleCookieUpdate, checkboxValues, cookieSettings, effectiveConsentLogic]);

  useEffect(() => {
    if (cookieValue === null) {
      setIsCookieBannerVisible(true);
    } else {
      setIsCookieBannerVisible(false);
      const currentValues = initializeCheckboxValues(cookieValue, cookieSettings);
      setCheckboxValues(currentValues);

      const consentObject: Record<string, boolean> = JSON.parse(cookieValue);
      onConsentChange(consentObject);
    }
  }, [cookieValue, cookieSettings, onConsentChange]);

  const handleCheckboxChange = useCallback((index: number) => {
    setCheckboxValues((prevValues) =>
      prevValues.map((checkbox, i) => {
        if (i === index && !checkbox.isRequired) {
          return { ...checkbox, isChecked: !checkbox.isChecked };
        }
        return checkbox;
      }),
    );
  }, []);

  return {
    isCookieBannerVisible,
    checkboxValues,
    handleCheckboxChange,
    handleAcceptClick,
    handleDeclineClick,
    handleSaveClick,
    isCookieSettingsOpen: isSettingsOpen,
    handleOpenCookieSettings: handleOpenSettings,
    handleCloseCookieSettings: handleCloseSettings,
  };
}
