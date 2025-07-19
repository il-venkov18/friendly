import styles from "./interest-step.module.scss";
import { useEffect, useState } from "react";
import { OnboardingStepProps } from "@/features/onboarding/lib/models/types";
import { Button } from "@/shared/ui/button/button";
import { ProgressBar } from "../progress-bar/ProgressBar";

import musicPlaceholder from '@/shared/assets/images/music-placeholder.jpg';
import gamesPlaceholder from '@/shared/assets/images/games-placeholder.jpg';
import moviesPlaceholder from '@/shared/assets/images/movies-placeholder.jpg';
import lifestylePlaceholder from '@/shared/assets/images/lifestyle-placeholder.jpg';
import studyPlaceholder from '@/shared/assets/images/study-placeholder.jpg';
import vibePlaceholder from '@/shared/assets/images/vibe-placeholder.jpg';

const INTEREST_CLUSTERS = [
  {
    id: 1,
    name: "Музыка",
    placeholder: musicPlaceholder,
    interests: [
      { label: "Рэп\nХип-хоп", img: musicPlaceholder },
      { label: "Рок", img: musicPlaceholder },
      { label: "Электро", img: musicPlaceholder },
      { label: "Поп", img: musicPlaceholder },
      { label: "Джаз\nи блюз", img: musicPlaceholder },
      { label: "Классика", img: musicPlaceholder },
    ],
  },
  {
    id: 2,
    name: "Игры",
    placeholder: gamesPlaceholder,
    interests: [
      { label: "Шутеры", img: gamesPlaceholder },
      { label: "RPG", img: gamesPlaceholder },
      { label: "Симуляторы", img: gamesPlaceholder },
      { label: "Экшн", img: gamesPlaceholder },
      { label: "Хоррор", img: gamesPlaceholder },
      { label: "Настольные\n игры", img: gamesPlaceholder },
    ],
  },
  {
    id: 3,
    name: "Кино и сериалы",
    placeholder: moviesPlaceholder,
    interests: [
      { label: "Фэнтези", img: moviesPlaceholder },
      { label: "Детективы", img: moviesPlaceholder },
      { label: "Романтика", img: moviesPlaceholder },
      { label: "Комедии", img: moviesPlaceholder },
      { label: "Ужасы", img: moviesPlaceholder },
      { label: "Аниме", img: moviesPlaceholder },
    ],
  },
  {
    id: 4,
    name: "Образ жизни",
    placeholder: lifestylePlaceholder,
    interests: [
      { label: "Спорт", img: lifestylePlaceholder },
      { label: "Путешествия", img: lifestylePlaceholder },
      { label: "Медитация", img: lifestylePlaceholder },
      { label: "Вечеринки", img: lifestylePlaceholder },
      { label: "Волонтерство", img: lifestylePlaceholder },
      { label: "Активный\n отдых", img: lifestylePlaceholder },
    ],
  },
  {
    id: 5,
    name: "Учёба и развитие",
    placeholder: studyPlaceholder,
    interests: [
      { label: "IT", img: studyPlaceholder },
      { label: "Предприни-\nмательство", img: studyPlaceholder },
      { label: "Научпоп", img: studyPlaceholder },
      { label: "Изучение\nязыков", img: studyPlaceholder },
      { label: "Худ.\nлитература", img: studyPlaceholder },
      { label: "Хакатоны", img: studyPlaceholder },
    ],
  },
  {
    id: 6,
    name: "Вайб",
    placeholder: vibePlaceholder,
    interests: [
      { label: "Мемы", img: vibePlaceholder },
      { label: "Глубокие\nразговоры", img: vibePlaceholder },
      { label: "Чилл", img: vibePlaceholder },
      { label: "Романтика", img: vibePlaceholder },
      { label: "Спонтан-\nность", img: vibePlaceholder },
    ],
  },
];

const MIN_SELECTED_PER_CLUSTER = 3;
const MAX_SELECTED_PER_CLUSTER = 6;

export const InterestStep = ({ onNext }: OnboardingStepProps) => {
  const [currentClusterIndex, setCurrentClusterIndex] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<{
    [key: string]: number[]
  }>({});
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [showValidationError, setShowValidationError] = useState(false);

  const currentCluster = INTEREST_CLUSTERS[currentClusterIndex];
  const isLastCluster = currentClusterIndex === INTEREST_CLUSTERS.length - 1;
  const currentClusterId = currentCluster.id.toString();
  const currentSelectedCount = selectedInterests[currentClusterId]?.length || 0;

  useEffect(() => {
    const isValidSelection = currentSelectedCount >= MIN_SELECTED_PER_CLUSTER && 
                           currentSelectedCount <= MAX_SELECTED_PER_CLUSTER;
    setIsNextDisabled(!isValidSelection);
    if (isValidSelection) {
      setShowValidationError(false);
    }
  }, [selectedInterests, currentCluster]);

  const handleToggle = (interestIndex: number) => {
    const isSelected = selectedInterests[currentClusterId]?.includes(interestIndex);
    const currentClusterSelected = selectedInterests[currentClusterId] || [];

    if (isSelected) {
      setSelectedInterests((prev) => ({
        ...prev,
        [currentClusterId]: currentClusterSelected.filter((i) => i !== interestIndex),
      }));
    } else if (currentClusterSelected.length < MAX_SELECTED_PER_CLUSTER) {
      setSelectedInterests((prev) => ({
        ...prev,
        [currentClusterId]: [...currentClusterSelected, interestIndex],
      }));
    }
  };

  const handleNext = () => {
    if (currentSelectedCount < MIN_SELECTED_PER_CLUSTER) {
      setShowValidationError(true);
      return;
    }

    if (isLastCluster) {
      const allSelectedInterests = INTEREST_CLUSTERS.flatMap((cluster) => {
        const selected = selectedInterests[cluster.id.toString()] || [];
        return selected.map((idx) => ({
          cluster: cluster.name,
          interest: cluster.interests[idx].label,
          img: cluster.interests[idx].img,
        }));
      });

      localStorage.setItem("userInterests", JSON.stringify(allSelectedInterests));
      onNext();
    } else {
      setCurrentClusterIndex((prev) => prev + 1);
      setShowValidationError(false);
    }
  };

  const isInterestDisabled = (interestIndex: number) => {
    const isSelected = selectedInterests[currentClusterId]?.includes(interestIndex);
    return !isSelected && currentSelectedCount >= MAX_SELECTED_PER_CLUSTER;
  };

  const renderProgressDots = () => {
    return (
      <div className={styles.clusterProgress}>
        {INTEREST_CLUSTERS.map((_, index) => (
          <div
            key={index}
            className={`${styles.progressDot} ${
              index === currentClusterIndex ? styles.activeDot : ""
            }`}
          />
        ))}
      </div>
    );
  };

  const renderSelectedChips = () => {
    return (
      <div className={styles.selectedChips}>
        <span>
          Выбрано: {currentSelectedCount} из {MAX_SELECTED_PER_CLUSTER}
        </span>
      </div>
    );
  };

  return (
    <div className={styles.onboardingForm}>
      <div className={styles.formHeader}>
        <ProgressBar currentStep={2} totalSteps={4} />
      </div>

      <div className={styles.formSection}>
        <div className={styles.sectionTitle}>
          интересы{" "}
          <span className={styles.sectionAccent}>
            – {currentCluster.name.toLowerCase()}
          </span>
        </div>
        <div className={styles.dots}>
          {renderProgressDots()}
          {renderSelectedChips()}
        </div>

        <div className={styles.sectionSubtitle}>
          выбирай осознанно, твой выбор влияет на точность рекомендаций
        </div>

        <div className={styles.interestGrid}>
          {currentCluster.interests.map((interest, idx) => (
            <div
              key={idx}
              className={`
                ${styles.interestCard}
                ${selectedInterests[currentClusterId]?.includes(idx) ? styles.selected : ""}
                ${isInterestDisabled(idx) ? styles.disabled : ""}
              `}
              onClick={() => !isInterestDisabled(idx) && handleToggle(idx)}
              style={{ backgroundImage: `url(${interest.img})` }}
            >
              <div className={styles.imageOverlay} />
              <div className={styles.interestCardHeader}>
                <span className={styles.interestLabel}>{interest.label}</span>
                {selectedInterests[currentClusterId]?.includes(idx) && (
                  <span className={styles.checkmark} />
                )}
              </div>
            </div>
          ))}
        </div>

        {showValidationError && (
          <div className={styles.validationError}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16C3.5816 16 0 12.4184 0 8C0 3.5816 3.5816 0 8 0C12.4184 0 16 3.5816 16 8C16 12.4184 12.4184 16 8 16ZM8 1.6C4.4656 1.6 1.6 4.4656 1.6 8C1.6 11.5344 4.4656 14.4 8 14.4C11.5344 14.4 14.4 11.5344 14.4 8C14.4 4.4656 11.5344 1.6 8 1.6Z" fill="#FF4D4F"/>
              <path d="M8 4V8.8" stroke="#FF4D4F" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 11.2C8.44183 11.2 8.8 10.8418 8.8 10.4C8.8 9.95817 8.44183 9.6 8 9.6C7.55817 9.6 7.2 9.95817 7.2 10.4C7.2 10.8418 7.55817 11.2 8 11.2Z" fill="#FF4D4F"/>
            </svg>
            Выберите минимум 3 интереса в этой категории
          </div>
        )}
      </div>

      <div className={styles.nextFooter}>
        <Button onClick={handleNext} disabled={isNextDisabled}>
          {isLastCluster ? "Далее" : "Продолжить"}
        </Button>
      </div>
    </div>
  );
};