// src/pages/welcome/welcome-page.tsx
import { Button } from '@/shared/ui/button/button';
import { useNavigate } from 'react-router-dom';
import styles from './welcome-page.module.scss';

export const WelcomePage = () => {
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate('/onboarding'); // Или ваш путь к онбордингу
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
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
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