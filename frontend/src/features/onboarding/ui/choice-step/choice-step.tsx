import styles from "./choice-step.module.scss"

import { useEffect, useRef, useState } from "react"

import { CheckmarkIcon } from "@/shared/assets/icons/CheckmarkIcon"
import { Button } from "@/shared/ui/button/button"

import { OnboardingStepProps } from "../../lib/models/types"
import arrowLeftSvg from "../icons/arrow-left.svg"
import { ProgressBar } from "../progress-bar/ProgressBar"

const cardData = [
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

export const ChoiceStep = ({ onNext, onBack }: OnboardingStepProps) => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null)
  const [startIndex, setStartIndex] = useState(0) // Для управления видимыми карточками
  const sliderRef = useRef<HTMLDivElement>(null) // Ссылка на контейнер слайдера

  const handleCardSelection = (id: number) => {
    setSelectedCardId(id)
  }

  // Автоматическая прокрутка к выбранной карточке (если она вне видимости)
  useEffect(() => {
    if (selectedCardId !== null && sliderRef.current) {
      const selectedIndex = cardData.findIndex(
        (card) => card.id === selectedCardId
      )
      if (selectedIndex >= 0) {
        const visibleStart = startIndex
        const visibleEnd = startIndex + 2 // Предполагаем 3 видимых карточки

        if (selectedIndex < visibleStart) {
          setStartIndex(selectedIndex)
        } else if (selectedIndex > visibleEnd) {
          setStartIndex(Math.max(0, selectedIndex - 2)) // Центрируем выбранную карточку
        }
      }
    }
  }, [selectedCardId, startIndex])

  const validateForm = () => {
    return selectedCardId !== null
  }

  const handleNext = () => {
    if (validateForm()) {
      // Здесь можно сохранить выбранный вайб в localStorage или состоянии
      // Например: localStorage.setItem('onboardingVibe', selectedCardId.toString());
      onNext()
    }
  }

  return (
    <>
      <div className={styles.onboardingForm}>
        <div className={styles.formContent}>
          <div className={styles.formHeader}>
            <button className={styles.formHeaderBack} onClick={onBack}>
              <img src={arrowLeftSvg} alt="back" />
            </button>
            <ProgressBar currentStep={3} totalSteps={4} />
          </div>
          <div className={styles.formSection}>
            <div className={styles.sectionT}>
              <div className={styles.sectionTitle}>
                Личность и стиль общения
              </div>
              <div className={styles.questionText}>Где ты на перерыве?</div>
            </div>

            {/* Обернем слайдер в контейнер с overflow: hidden */}
            <div className={styles.sliderWrapper}>
              <div className={styles.questionSection}>
                <div className={styles.sectionSubtitle}>Выбери 1 вариант</div>
              </div>
              <div className={styles.sliderContainer} ref={sliderRef}>
                <div className={styles.sliderTrack}>
                  {cardData.map((card) => (
                    <div
                      key={card.id}
                      className={`${styles.card} ${
                        selectedCardId === card.id ? styles.selected : ""
                      }`}
                      onClick={() => handleCardSelection(card.id)}>
                      <div className={styles.cardIcon}>{card.icon}</div>
                      {selectedCardId === card.id && (
                        <CheckmarkIcon className={styles.checkmarkIcon} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {selectedCardId !== null && (
              <p className={styles.successMessage}>
                Учли! Ты {cardData.find((c) => c.id === selectedCardId)?.label}!
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.nextFooter}>
        <Button onClick={handleNext}>Далее</Button>
      </div>
    </>
  )
}
