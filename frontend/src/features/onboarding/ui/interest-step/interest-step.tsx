import styles from './interest-step.module.scss';
import { useState } from 'react';
import { OnboardingStepProps } from '@/features/onboarding/lib/models/types';
import { Button } from '@/shared/ui/button/button';
import { ProgressBar } from '../progress-bar/ProgressBar';

const INTERESTS = [
  { label: 'рэп\nхип-хоп', img: 'interest-rap.png' },
  { label: 'джаз\nи 20-е', img: 'interest-jazz.png' },
  { label: 'классика', img: 'interest-classic.png' },
  { label: 'non\nмузыка', img: 'interest-nonmusic.png' },
  { label: '', img: 'interest-jell.png' },
  { label: '', img: 'interest-fiol.png' },
];

const currentOnboardingStep = 2;
const maxSelected = 6;

export const InterestStep = ({ onNext }: OnboardingStepProps) => {
  const [selected, setSelected] = useState<number[]>([0, 1, 2]);

  const handleToggle = (idx: number) => {
    setSelected((prev) =>
      prev.includes(idx)
        ? prev.filter((i) => i !== idx)
        : prev.length < maxSelected
          ? [...prev, idx]
          : prev
    );
  };

  return (
    <div className={styles.onboardingForm}>
      <div className={styles.formHeader}>
        <ProgressBar currentStep={currentOnboardingStep} totalSteps={4} />
      </div>
      <div className={styles.formSection}>
        <div className={styles.sectionTitle}>
          интересы <span className={styles.sectionAccent}>– музыка</span>
        </div>
        <div className={styles.sectionSubtitle}>
          выбирай осознанно, твой выбор влияет на точность рекомендаций
        </div>
        <div className={styles.selectedCount}>
          Выбрано {selected.length} из {maxSelected}
        </div>
        <div className={styles.interestGrid}>
          {INTERESTS.map((interest, idx) => (
            <div
              key={idx}
              className={
                styles.interestCard +
                (selected.includes(idx) ? ' ' + styles.selected : '')
              }
              onClick={() => handleToggle(idx)}
              style={{ backgroundImage: `url(/assets/${interest.img})` }}
            >
              <div className={styles.interestCardHeader}>
                <span className={styles.interestLabel}>{interest.label}</span>
                {selected.includes(idx) && <span className={styles.checkmark} />}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.nextFooter}>
        <Button onClick={onNext}>Далее</Button>
      </div>
    </div>
  );
}