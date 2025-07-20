// Path: /app/providers/language-provider.tsx
// Language provider for multi-language support (future Sanity integration)

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'it' | 'de' | 'fr' | 'es' | 'ar' | 'zh' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: LanguageOption[];
}

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Available languages with native names and flags
const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
];

// Temporary translations - will be replaced by Sanity CMS
const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.how_it_works': 'How It Works',
    'nav.professionals': 'Professionals',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'hero.headline': 'Your Trusted Partner for Italian Property Investment',
    'hero.subheadline': 'Connect with verified professionals and manage your entire property project in one platform',
    'hero.cta': 'Start Your Project',
  },
  it: {
    'nav.home': 'Home',
    'nav.how_it_works': 'Come Funziona',
    'nav.professionals': 'Professionisti',
    'nav.login': 'Accedi',
    'nav.register': 'Registrati',
    'hero.headline': 'Il Tuo Partner di Fiducia per Investimenti Immobiliari in Italia',
    'hero.subheadline': 'Connettiti con professionisti verificati e gestisci il tuo intero progetto immobiliare in una piattaforma',
    'hero.cta': 'Inizia il Tuo Progetto',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.how_it_works': 'So funktioniert es',
    'nav.professionals': 'Fachleute',
    'nav.login': 'Anmelden',
    'nav.register': 'Registrieren',
    'hero.headline': 'Ihr vertrauenswürdiger Partner für Immobilieninvestitionen in Italien',
    'hero.subheadline': 'Verbinden Sie sich mit verifizierten Fachleuten und verwalten Sie Ihr gesamtes Immobilienprojekt auf einer Plattform',
    'hero.cta': 'Projekt starten',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.how_it_works': 'Comment ça marche',
    'nav.professionals': 'Professionnels',
    'nav.login': 'Connexion',
    'nav.register': 'S\'inscrire',
    'hero.headline': 'Votre Partenaire de Confiance pour l\'Investissement Immobilier en Italie',
    'hero.subheadline': 'Connectez-vous avec des professionnels vérifiés et gérez l\'ensemble de votre projet immobilier sur une plateforme',
    'hero.cta': 'Commencer Votre Projet',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.how_it_works': 'Cómo Funciona',
    'nav.professionals': 'Profesionales',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Registrarse',
    'hero.headline': 'Tu Socio de Confianza para la Inversión Inmobiliaria en Italia',
    'hero.subheadline': 'Conéctate con profesionales verificados y gestiona todo tu proyecto inmobiliario en una plataforma',
    'hero.cta': 'Comenzar Tu Proyecto',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.how_it_works': 'كيف يعمل',
    'nav.professionals': 'المحترفون',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    'hero.headline': 'شريكك الموثوق للاستثمار العقاري في إيطاليا',
    'hero.subheadline': 'تواصل مع محترفين موثوقين وأدر مشروعك العقاري بالكامل في منصة واحدة',
    'hero.cta': 'ابدأ مشروعك',
  },
  zh: {
    'nav.home': '首页',
    'nav.how_it_works': '如何运作',
    'nav.professionals': '专业人士',
    'nav.login': '登录',
    'nav.register': '注册',
    'hero.headline': '您在意大利房地产投资的可信赖合作伙伴',
    'hero.subheadline': '与经过验证的专业人士联系，在一个平台上管理您的整个房地产项目',
    'hero.cta': '开始您的项目',
  },
  ru: {
    'nav.home': 'Главная',
    'nav.how_it_works': 'Как это работает',
    'nav.professionals': 'Профессионалы',
    'nav.login': 'Войти',
    'nav.register': 'Регистрация',
    'hero.headline': 'Ваш надежный партнер для инвестиций в недвижимость в Италии',
    'hero.subheadline': 'Свяжитесь с проверенными профессионалами и управляйте всем проектом недвижимости на одной платформе',
    'hero.cta': 'Начать проект',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('apulink-language') as Language;
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      const matchedLang = languages.find(lang => lang.code === browserLang);
      if (matchedLang) {
        setLanguageState(matchedLang.code);
      }
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('apulink-language', lang);
    // Update HTML lang attribute for SEO and accessibility
    document.documentElement.lang = lang;
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
