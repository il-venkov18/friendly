// src/pages/welcome/welcome-page.tsx
import { Button } from '@/shared/ui/button/button';
import { useNavigate } from 'react-router-dom';
import styles from './welcome-page.module.scss';

export const WelcomePage = () => {
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate('/onboarding');
  };

  const handlePrivacyPolicyClick = () => {
    // Здесь можно добавить переход на страницу политики конфиденциальности
    // Например: navigate('/privacy-policy');
    console.log('Переход к политике конфиденциальности');
  };

  return (
    <div className={styles.container}>
      <div className={styles.skeletonTop}></div>
      <div className={styles.skeletonLarge}></div>
      
      <div className={styles.contant}>
        <p className={styles.text}>
          Текст-заполнитель — это текст, который имеет некоторые характеристики 
          реального письменного текста, но является случайным набором слов
        </p>
        <p className={styles.agreement}>
          Нажимая кнопку, вы соглашаетесь с{' '}
          <span 
            className={styles.privacyLink}
            onClick={handlePrivacyPolicyClick}
          >
            политикой конфиденциальности
          </span>
        </p>
      </div>

      <div className={styles.footer}>
        <Button onClick={handleCreateProfile}>
          Создать анкету
        </Button>
      </div>
    </div>
  );
};