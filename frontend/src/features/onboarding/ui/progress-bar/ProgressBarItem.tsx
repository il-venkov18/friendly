import React from 'react';
import styles from './ProgressBarItem.module.scss';

interface ProgressBarItemProps {
  isActive?: boolean;
}

export const ProgressBarItem: React.FC<ProgressBarItemProps> = ({ isActive = false }) => {
  return (
    <div className={`${styles.progressBarItem} ${isActive ? styles.active : ''}`}></div>
  );
};