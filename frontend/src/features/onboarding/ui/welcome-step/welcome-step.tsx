// src/features/onboarding/ui/welcome-step.tsx
import { OnboardingStepProps } from '@/features/onboarding/lib/models/types';
import styles from './welcome-step.module.scss';
import { Button } from '@/shared/ui/button/button';
import { ProgressBar } from '../progress-bar/ProgressBar';

const currentOnboardingStep = 1;

export const WelcomeStep = ({ onNext }: OnboardingStepProps) => {
  return (
    <div className={styles.onboardingForm}>
      <div className={styles.formHeader}>
        <ProgressBar currentStep={currentOnboardingStep} totalSteps={4} />
      </div>
      
      <div className={styles.formSection}>
        <div className={styles.sectionTitle}>профиль</div>
        
        <div className={styles.sectionContent}>
          {/* Имя и пол */}
        <input
            type="text"
            className={styles.formInput}
            placeholder="Имя"
            defaultValue="Илья"
          />
          <select className={styles.formSelect}>
            <option value="">Пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>

        {/* Дата рождения */}
        <div className={styles.formField}>
          <input
            type="date"
            className={styles.formInput}
          />
        </div>

        {/* Местоположение и образование */}
        <input
              type="text"
              className={styles.formInput}
              placeholder="Город"
              defaultValue="Москва"
            />

        <select className={styles.formSelect}>
              <option value="">ВУЗ</option>
              <option value="msu">МГУ</option>
              <option value="hse">ВШЭ</option>
            </select>

        <select className={styles.formSelect}>
          <option value="">Факультет</option>
          <option value="cs">Компьютерные науки</option>
          <option value="economics">Экономика</option>
        </select>
        
        <select className={styles.formSelect}>
          <option value="">Курс</option>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} курс</option>
          ))}
        </select>
        
        <select className={styles.formSelect}>
          <option value="">Степень</option>
          <option value="bachelor">Бакалавр</option>
          <option value="master">Магистр</option>
        </select>

        {/* Цели знакомства */}
        <div className={styles.formField}>
          <div className={styles.formRow}>
            <span className={styles.formOption}>Дружба</span>
            <span className={styles.formOption}>Отношения</span>
          </div>
          <p className={styles.formHint}>Выберите минимум одно значение</p>
          
          <h3 className={styles.formSubtitle}>КОГО ИЩУ</h3>
          <div className={styles.formCheckboxGroup}>
            <label className={styles.formCheckbox}>
              <input type="checkbox" />
              <span>Парни</span>
            </label>
            <label className={styles.formCheckbox}>
              <input type="checkbox" />
              <span>Девушки</span>
            </label>
          </div>
        </div>
        </div>
      </div>
      <div className={styles.nextFooter}>
        <Button onClick={onNext}>
        Далее
      </Button>
      </div>
    </div>
  );
};