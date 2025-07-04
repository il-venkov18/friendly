import React from 'react';
import { ProgressBarItem } from './ProgressBarItem';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  currentStep: number; // Текущий активный шаг (от 1 до 4)
  totalSteps?: number; // Общее количество шагов (по умолчанию 4)
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps = 4 }) => {
  const items = Array.from({ length: totalSteps }, (_, index) => (
    <ProgressBarItem key={index} isActive={index < currentStep} />
  ));

  return (
    <div className={styles.progressBarContainer}>
      {items}
    </div>
  );
};