import useAppLanguage from '../../hooks/useAppLanguage';
import { languages } from '../../languages/languages';
import './Header.css';

export default function Header() {
  const { appLanguage } = useAppLanguage();
  const { h1, p } = languages[appLanguage].header;

  return (
    <header>
      <h1>{h1}</h1>
      <p>{p}</p>
    </header>
  );
}
