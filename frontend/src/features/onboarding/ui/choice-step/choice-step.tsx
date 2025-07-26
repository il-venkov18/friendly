import styles from "./choice-step.module.scss"
import { useEffect, useRef, useState } from "react"
import { CheckmarkIcon } from "@/shared/assets/icons/CheckmarkIcon"
import { Button } from "@/shared/ui/button/button"
import { OnboardingStepProps } from "../../lib/models/types"
import { ProgressBar } from "../progress-bar/ProgressBar"

// Данные для первого шага (вайб)
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
]

// Данные для второго шага (суперсила в общении)
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
]

export const ChoiceStep = ({ onNext }: OnboardingStepProps) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [selectedVibeId, setSelectedVibeId] = useState<number | null>(null)
  const [selectedCommunicationId, setSelectedCommunicationId] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Сбрасываем позицию слайдера при смене шага
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo(0, 0)
    }
  }, [currentStep])

  const handleCardSelection = (id: number) => {
    if (currentStep === 1) {
      setSelectedVibeId(id)
    } else {
      setSelectedCommunicationId(id)
    }
  }

  const validateForm = () => {
    if (currentStep === 1) return selectedVibeId !== null
    return selectedCommunicationId !== null
  }

  const handleNext = () => {
    if (!validateForm()) return
    
    if (currentStep === 1) {
      setCurrentStep(2)
    } else {
      onNext()
    }
  }

  const currentData = currentStep === 1 ? vibeData : communicationData
  const selectedId = currentStep === 1 ? selectedVibeId : selectedCommunicationId

  return (
    <div className={styles.onboardingForm}>
      <div className={styles.formContent}>
        <div className={styles.formHeader}>
          <ProgressBar currentStep={currentStep === 1 ? 3 : 4} totalSteps={4} />
        </div>
        <div className={styles.formSection}>
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
                    className={`${styles.card} ${
                      selectedId === card.id ? styles.selected : ""
                    }`}
                    onClick={() => handleCardSelection(card.id)}>
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
        </div>
      </div>
      <div className={styles.nextFooter}>
        <Button onClick={handleNext}>
          {currentStep === 1 ? "Далее" : "Завершить"}
        </Button>
      </div>
    </div>
  )
}