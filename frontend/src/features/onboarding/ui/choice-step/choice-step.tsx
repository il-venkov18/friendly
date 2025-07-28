import styles from "./choice-step.module.scss"

import { useEffect, useRef, useState } from "react"

import { CheckmarkIcon } from "@/shared/assets/icons/CheckmarkIcon"
import { Button } from "@/shared/ui/button/button"

import { OnboardingStepProps } from "../../lib/models/types"
import arrowLeftSvg from "../icons/arrow-left.svg"
import { ProgressBar } from "../progress-bar/ProgressBar"

const vibeData = [
  { id: 1, icon: "😊", label: "Лояльный парень" },
  { id: 2, icon: "😎", label: "Самодостаточный" },
  { id: 3, icon: "😍", label: "Романтичный" },
  { id: 4, icon: "😜", label: "Шутник" },
  { id: 5, icon: "🤔", label: "Глубокий мыслитель" },
  { id: 6, icon: "💪", label: "Целеустремленный" },
]

const communicationData = [
  {
    id: 1,
    icon: "🤝",
    label: "Нахожу общий язык со всеми",
    description: "Как дипломат в мире эмоций",
  },
  {
    id: 2,
    icon: "💬",
    label: "Отличный слушатель",
    description: "Создаешь пространство для искренности",
  },
  {
    id: 3,
    icon: "🎭",
    label: "Мастер импровизации",
    description: "Превращаешь обычный разговор в искусство",
  },
  {
    id: 4,
    icon: "🤩",
    label: "Заряжаю энергией",
    description: "Как кофе для уставшей беседы",
  },
  {
    id: 5,
    icon: "🧠",
    label: "Глубокие темы",
    description: "Разговор с тобой — это путешествие",
  },
  {
    id: 6,
    icon: "😂",
    label: "Разряжаю обстановку",
    description: "Твой юмор — как глоток свежего воздуха",
  },
]

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
]

const communicationComments = {
  1: "Ты как универсальный ключ — находишь подход к любому замку!",
  2: "Ты — тихая гавань, где каждый чувствует себя услышанным",
  3: "Твои слова — как весенний дождь: освежают и вдохновляют",
  4: "Ты как аккумулятор — заряжаешь атмосферу в чате!",
  5: "Твои мысли — как глубокий океан, в котором хочется плавать",
  6: "Ты — как солнечный луч, который разгоняет тучи неловкости",
}

export const ChoiceStep = ({ onNext, onBack }: OnboardingStepProps) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [selectedVibeId, setSelectedVibeId] = useState<number | null>(null)
  const [removingChip, setRemovingChip] = useState<number | null>(null)
  const [selectedCommunicationId, setSelectedCommunicationId] = useState<
    number | null
  >(null)
  const [selectedChips, setSelectedChips] = useState<
    { id: number; icon: string; label: string }[]
  >([])
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo(0, 0)
    }
    setSuccessMessage(null)
    setErrorMessage(null)
  }, [currentStep])

  useEffect(() => {
    if (currentStep === 3) {
      if (selectedChips.length === 2) {
        setSuccessMessage(
          `Круто! Ты выбираешь "${selectedChips[0].label}" и "${selectedChips[1].label}". Мы учли это при мэтчинге`
        )
      } else {
        setSuccessMessage(null)
      }
    }
  }, [selectedChips, currentStep])

  const handleCardSelection = (id: number) => {
    if (currentStep === 1) {
      setSelectedVibeId(id)
      setSuccessMessage(
        `Ты ${vibeData.find((v) => v.id === id)?.label}. Мы это учтём!`
      )
    } else if (currentStep === 2) {
      setSelectedCommunicationId(id)
      const comment =
        communicationComments[id as keyof typeof communicationComments]
      setSuccessMessage(comment)
    }
    setErrorMessage(null)
  }

  const handleDragStart = (
    event: React.DragEvent,
    chip: { id: number; icon: string; label: string }
  ) => {
    event.dataTransfer.setData("chip", JSON.stringify(chip))
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const chip = JSON.parse(event.dataTransfer.getData("chip"))

    if (selectedChips.some((c) => c.id === chip.id)) {
      setSelectedChips(selectedChips.filter((c) => c.id !== chip.id))
    } else if (selectedChips.length < 2) {
      setSelectedChips([...selectedChips, chip])
    }
    setErrorMessage(null)
  }

  const handleChipClick = (chip: {
    id: number
    icon: string
    label: string
  }) => {
    setRemovingChip(chip.id)
    setTimeout(() => {
      setSelectedChips(selectedChips.filter((c) => c.id !== chip.id))
      setRemovingChip(null)
      setErrorMessage(null)
    }, 300) // Длительность анимации
  }

  const handleNext = () => {
    if (currentStep === 1 && !selectedVibeId) {
      setErrorMessage("Пожалуйста, выберите вариант")
      setSuccessMessage(null)
      return
    }
    if (currentStep === 2 && !selectedCommunicationId) {
      setErrorMessage("Пожалуйста, выберите вариант")
      setSuccessMessage(null)
      return
    }
    if (currentStep === 3 && selectedChips.length < 2) {
      setErrorMessage("Пожалуйста, выберите 2 качества")
      setSuccessMessage(null)
      return
    }

    if (currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setCurrentStep(3)
    } else {
      onNext()
    }
  }

  const currentData =
    currentStep === 1
      ? vibeData
      : currentStep === 2
        ? communicationData
        : chipData
  const selectedId =
    currentStep === 1
      ? selectedVibeId
      : currentStep === 2
        ? selectedCommunicationId
        : null

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
            {currentStep !== 3 ? (
              <>
                <div className={styles.sectionT}>
                  <div className={styles.sectionTitle}>
                    Личность и стиль общения
                  </div>
                  <div className={styles.questionText}>
                    {currentStep === 1
                      ? "Где ты на перерыве?"
                      : "Какая у тебя суперсила в общении?"}
                  </div>
                </div>

                <div className={styles.sliderWrapper}>
                  <div className={styles.questionSection}>
                    <div className={styles.centeredSubtitle}>
                      Выбери 1 вариант
                    </div>
                  </div>
                  <div className={styles.sliderContainer} ref={sliderRef}>
                    <div className={styles.sliderTrack}>
                      {currentData.map((card) => (
                        <div key={card.id} className={styles.cardWrapper}>
                          <div
                            className={`${styles.card} ${selectedId === card.id ? styles.selected : ""}`}
                            onClick={() => handleCardSelection(card.id)}>
                            <div className={styles.cardIcon}>{card.icon}</div>
                            <div className={styles.checkmarkContainer}>
                              {selectedId === card.id && (
                                <CheckmarkIcon
                                  className={styles.checkmarkIcon}
                                />
                              )}
                            </div>
                          </div>
                          <div className={styles.cardContent}>
                            <div className={styles.cardLabel}>{card.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {errorMessage && (
                  <div
                    className={`${styles.validationMessage1} ${styles.error}`}>
                    {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div
                    className={`${styles.validationMessage1} ${styles.success}`}>
                    {successMessage}
                  </div>
                )}
              </>
            ) : (
              <div>
                <div className={styles.sectionT}>
                  <div className={styles.sectionTitle}>
                    Личность и стиль общения
                  </div>
                  <div className={styles.questionText}>
                    Что цепляет в людях?
                  </div>
                </div>

                <div className={styles.chipSection}>
                  <div className={styles.availableChips}>
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className={styles.dropZone}
                      style={{
                        height: selectedChips.length === 0 ? "184px" : "123px",
                      }}>
                      {selectedChips.length === 0 ? (
                        <div className={styles.dropZonePlaceholder}>
                          Перетащи сюда только 2 качества
                        </div>
                      ) : (
                        <div className={styles.selectedChipsContainer}>
                          {selectedChips.map((chip) => (
                            <div
                              key={chip.id}
                              className={`${styles.selectedChip} ${
                                removingChip === chip.id ? styles.removing : ""
                              }`}
                              draggable
                              onDragStart={(e) => handleDragStart(e, chip)}
                              onClick={() => handleChipClick(chip)}>
                              <span>{chip.icon}</span> {chip.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {errorMessage && (
                      <div
                        className={`${styles.validationMessage} ${styles.error}`}>
                        {errorMessage}
                      </div>
                    )}

                    {successMessage && (
                      <div
                        className={`${styles.validationMessage} ${styles.success}`}>
                        {successMessage}
                      </div>
                    )}
                    <div className={styles.chipList}>
                      {chipData
                        .filter(
                          (chip) => !selectedChips.some((c) => c.id === chip.id)
                        )
                        .map((chip) => (
                          <div
                            key={chip.id}
                            className={styles.chip}
                            draggable
                            onDragStart={(e) => handleDragStart(e, chip)}>
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
      </div>
      <div className={styles.nextFooter}>
        <Button onClick={handleNext}>
          {currentStep === 3 ? "Далее" : "Продолжить"}
        </Button>
      </div>
    </>
  )
}
