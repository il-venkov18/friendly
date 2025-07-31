import styles from "./interest-step.module.scss"

import { useEffect, useRef, useState } from "react"

import { OnboardingStepProps } from "@/features/onboarding/lib/models/types"

import { CheckmarkIcon } from "@/shared/assets/icons/CheckmarkIcon"
import gamesPlaceholder from "@/shared/assets/images/games-placeholder.jpg"
import lifestylePlaceholder from "@/shared/assets/images/lifestyle-placeholder.jpg"
import moviesPlaceholder from "@/shared/assets/images/movies-placeholder.jpg"
import musicPlaceholder from "@/shared/assets/images/music-placeholder.jpg"
import studyPlaceholder from "@/shared/assets/images/study-placeholder.jpg"
import vibePlaceholder from "@/shared/assets/images/vibe-placeholder.jpg"
import { Button } from "@/shared/ui/button/button"

import arrowLeftSvg from "../icons/arrow-left.svg"
import { ProgressBar } from "../progress-bar/ProgressBar"

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
]

const MIN_SELECTED_PER_CLUSTER = 3
const MAX_SELECTED_PER_CLUSTER = 6

const useTimedError = (duration = 2000) => {
  const [error, setError] = useState(false);
  
  const triggerError = () => {
    setError(true);
    const timer = setTimeout(() => setError(false), duration);
    return () => clearTimeout(timer);
  };

  return [error, triggerError] as const;
};

export const InterestStep = ({ onNext, onBack }: OnboardingStepProps) => {
  const [currentClusterIndex, setCurrentClusterIndex] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<{
    [key: string]: number[]
  }>({});
  const [showValidationError, setShowValidationError] = useState(false);
  const [countError, triggerCountError] = useTimedError();

  const currentCluster = INTEREST_CLUSTERS[currentClusterIndex];
  const isLastCluster = currentClusterIndex === INTEREST_CLUSTERS.length - 1;
  const currentClusterId = currentCluster.id.toString();
  const currentSelectedCount = selectedInterests[currentClusterId]?.length || 0;
  const formSectionRef = useRef<HTMLDivElement>(null);

  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    const isValidSelection =
      currentSelectedCount >= MIN_SELECTED_PER_CLUSTER &&
      currentSelectedCount <= MAX_SELECTED_PER_CLUSTER;
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
        [currentClusterId]: currentClusterSelected.filter(
          (i) => i !== interestIndex
        ),
      }));
    } else if (currentClusterSelected.length < MAX_SELECTED_PER_CLUSTER) {
      setSelectedInterests((prev) => ({
        ...prev,
        [currentClusterId]: [...currentClusterSelected, interestIndex],
      }));
    }
  };

  const handleNext = () => {
    console.log('Current selected count:', currentSelectedCount); // Добавим лог для отладки
    
    if (currentSelectedCount < MIN_SELECTED_PER_CLUSTER) {
      scrollToTop();
      console.log('Validation failed'); // Лог для отладки
      setShowValidationError(true);
      triggerCountError();
      return;
    }

    scrollToTop();
    console.log('Validation passed'); // Лог для отладки
    setShowValidationError(false);

    if (formSectionRef.current) {
        formSectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
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

  useEffect(() => {
    console.log('Selected count updated:', currentSelectedCount);
  }, [currentSelectedCount]);

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
      <div 
        className={styles.selectedChips}
        style={{ 
          color: countError ? 'rgba(229, 57, 53, 1)' : 'rgba(153, 236, 255, 1)',
          animation: countError ? `${styles.pulse} 1s ease-in-out` : 'none'
        }}
      >
        <span>
          Выбрано: {currentSelectedCount} из {MAX_SELECTED_PER_CLUSTER}
        </span>
      </div>
    );
  };

  return (
    <>
    <div ref={topRef} />
      <div className={styles.onboardingForm} ref={formSectionRef}>
        <div className={styles.formHeader}>
          <button className={styles.formHeaderBack} onClick={onBack}>
            <img src={arrowLeftSvg} alt="back" />
          </button>
          <ProgressBar currentStep={2} totalSteps={4} />
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>
            интересы{" "}
            <span className={styles.sectionAccent}>
              – {currentCluster.name.toLowerCase()}
            </span>
          </div>
          <div className={styles.progressIndicators}>
            <div className={styles.leftIndicator}>{renderProgressDots()}</div>
            <div className={styles.rightIndicator}>{renderSelectedChips()}</div>
          </div>

          <div className={styles.sectionSubtitle}>
            выбирай осознанно, твой выбор влияет на точность рекомендаций
          </div>

          {showValidationError && (
            <div className={styles.validationError}>
              
              Выберите минимум 3 интереса в этой категории
            </div>
          )}

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
                  <div
                    className={`
                      ${styles.checkmarkContainer} 
                      ${selectedInterests[currentClusterId]?.includes(idx) ? styles.selected : ""}
                    `}
                  >
                    {selectedInterests[currentClusterId]?.includes(idx) && (
                      <CheckmarkIcon />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </div>
      <div className={styles.nextFooter}>
        <Button onClick={handleNext}>
          {isLastCluster ? "Далее" : "Продолжить"}
        </Button>
      </div>
    </>
  );
};