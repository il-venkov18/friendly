import styles from "./choice-step.module.scss";
import { useEffect, useRef, useState } from "react";
import { CheckmarkIcon } from "@/shared/assets/icons/CheckmarkIcon";
import { Button } from "@/shared/ui/button/button";
import { OnboardingStepProps } from "../../lib/models/types";
import { ProgressBar } from "../progress-bar/ProgressBar";

const vibeData = [
  {
    id: 1,
    icon: "😊",
    label: "Лояльный парень",
  },
  {
    id: 2,
    icon: "😎",
    label: "Самодостаточный",
  },
  {
    id: 3,
    icon: "😍",
    label: "Романтичный",
  },
  {
    id: 4,
    icon: "😜",
    label: "Шутник",
  },
  {
    id: 5,
    icon: "🤔",
    label: "Глубокий мыслитель",
  },
  {
    id: 6,
    icon: "💪",
    label: "Целеустремленный",
  },
];

const communicationData = [
  {
    id: 1,
    icon: "🤝",
    label: "Нахожу общий язык со всеми",
  },
  {
    id: 2,
    icon: "💬",
    label: "Отличный слушатель",
  },
  {
    id: 3,
    icon: "🎭",
    label: "Мастер импровизации",
  },
  {
    id: 4,
    icon: "🤩",
    label: "Заряжаю энергией",
  },
  {
    id: 5,
    icon: "🧠",
    label: "Глубокие темы",
  },
  {
    id: 6,
    icon: "😂",
    label: "Разряжаю обстановку",
  },
];

const chipData = [
  { id: 1, icon: "🧠", label: "Умный" },
  { id: 2, icon: "😄", label: "Веселый" },
  { id: 3, icon: "😌", label: "Спокойный" },
  { id: 4, icon: "💬", label: "Общительный" },
  { id: 5, icon: "✨", label: "Стильный" },
  { id: 6, icon: "💡", label: "Увлеченный" },
  { id: 7, icon: "🔒", label: "Надежный" },
  { id: 8, icon: "🤷‍♂️", label: "Немного крэйзи" },
  { id: 9, icon: "👀", label: "Внимательный" },
  { id: 10, icon: "📚", label: "Эрудированный" },
  { id: 11, icon: "🔍", label: "Загадочный" },
  { id: 12, icon: "🔥", label: "Страстный" },
];

export const ChoiceStep = ({ onNext }: OnboardingStepProps) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedVibeId, setSelectedVibeId] = useState<number | null>(null);
  const [selectedCommunicationId, setSelectedCommunicationId] = useState<number | null>(null);
  const [selectedChips, setSelectedChips] = useState<{ id: number; icon: string; label: string }[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo(0, 0);
    }
  }, [currentStep]);

  const handleCardSelection = (id: number) => {
    if (currentStep === 1) {
      setSelectedVibeId(id);
    } else if (currentStep === 2) {
      setSelectedCommunicationId(id);
    }
  };

  const handleDragStart = (event: React.DragEvent, chip: { id: number; icon: string; label: string }) => {
    event.dataTransfer.setData("chip", JSON.stringify(chip));
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const chip = JSON.parse(event.dataTransfer.getData("chip"));
    
    if (selectedChips.some(c => c.id === chip.id)) {
      setSelectedChips(selectedChips.filter(c => c.id !== chip.id));
    } else if (selectedChips.length < 2) {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const validateForm = () => {
    if (currentStep === 1) return selectedVibeId !== null;
    if (currentStep === 2) return selectedCommunicationId !== null;
    if (currentStep === 3) return selectedChips.length === 2;
    return false;
  };

  const handleNext = () => {
    if (!validateForm()) return;

    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else {
      onNext();
    }
  };

  const currentData = currentStep === 1 ? vibeData : currentStep === 2 ? communicationData : chipData;
  const selectedId = currentStep === 1 ? selectedVibeId : currentStep === 2 ? selectedCommunicationId : null;

  return (
    <div className={styles.onboardingForm}>
      <div className={styles.formContent}>
        <div className={styles.formHeader}>
          <ProgressBar currentStep={currentStep} totalSteps={4} />
        </div>
        <div className={styles.formSection}>
          {currentStep !== 3 ? (
            <>
              <div className={styles.sectionT}>
                <div className={styles.sectionTitle}>Личность и стиль общения</div>
                <div className={styles.questionText}>
                  {currentStep === 1 ? "Где ты на перерыве?" : "Какая у тебя суперсила в общении?"}
                </div>
              </div>

              <div className={styles.sliderWrapper}>
                <div className={styles.questionSection}>
                  <div className={styles.centeredSubtitle}>Выбери 1 вариант</div>
                </div>
                <div className={styles.sliderContainer} ref={sliderRef}>
                  <div className={styles.sliderTrack}>
                    {currentData.map((card) => (
                      <div
                        key={card.id}
                        className={`${styles.card} ${selectedId === card.id ? styles.selected : ""}`}
                        onClick={() => handleCardSelection(card.id)}
                      >
                        <div className={styles.cardIcon}>{card.icon}</div>
                        <div className={styles.checkmarkContainer}>
                          {selectedId === card.id && (
                            <CheckmarkIcon className={styles.checkmarkIcon} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedId !== null && (
                <p className={styles.successMessage}>
                  Учли! Ты {currentData.find((c) => c.id === selectedId)?.label}!
                </p>
              )}
            </>
          ) : (
            <div>
              <div className={styles.sectionT}>
                <div className={styles.sectionTitle}>Личность и стиль общения</div>
                <div className={styles.questionText}>Что цепляет в людях?</div>
              </div>

              <div className={styles.chipSection}>
                <div className={styles.availableChips}>
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className={styles.dropZone}
                  >
                    {selectedChips.length === 0 ? (
                      <div className={styles.dropZonePlaceholder}>
                        Перетащи сюда 2 качества
                      </div>
                    ) : (
                      selectedChips.map((chip) => (
                        <div 
                          key={chip.id} 
                          className={styles.selectedChip}
                          draggable
                          onDragStart={(e) => handleDragStart(e, chip)}
                        >
                          <span>{chip.icon}</span> {chip.label}
                        </div>
                      ))
                    )}
                  </div>
                  <div className={styles.chipList}>
                    {chipData
                      .filter(chip => !selectedChips.some(c => c.id === chip.id))
                      .map((chip) => (
                        <div
                          key={chip.id}
                          className={styles.chip}
                          draggable
                          onDragStart={(e) => handleDragStart(e, chip)}
                        >
                          <span>{chip.icon}</span> {chip.label}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.nextFooter}>
        <Button onClick={handleNext}>
          {currentStep === 3 ? "Завершить" : "Далее"}
        </Button>
      </div>
    </div>
  );
};