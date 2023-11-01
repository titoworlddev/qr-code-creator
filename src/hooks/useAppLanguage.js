export default function useAppLanguage() {
  const appLanguage = navigator.language.includes('es')
    ? navigator.language.split('-')[0]
    : 'en';

  const setDocumentLang = () => {
    if (appLanguage === 'es') {
      document.documentElement.lang = appLanguage;
    }
  };

  return { appLanguage, setDocumentLang };
}
