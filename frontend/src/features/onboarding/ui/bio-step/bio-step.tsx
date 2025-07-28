import styles from "./bio-step.module.scss"
import { useRef, useState, useEffect } from "react"
import { OnboardingStepProps } from "@/features/onboarding/lib/models/types"
import { Button } from "@/shared/ui/button/button"
import { ProgressBar } from "../progress-bar/ProgressBar"
import arrowLeftSvg from "../icons/arrow-left.svg"
import fireSvg from "./icons/fire.svg"
import playerSvg from "./icons/player.svg"

const maxCountOfLetters = 140
export const USER_DESCRIPTION_KEY = "about"

export const BioStep = ({ onBack }: OnboardingStepProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [description, setDescription] = useState<string>("")
  const [validationState, setValidationState] = useState<'error' | 'success' | null>(null)
  const [showValidation, setShowValidation] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  useEffect(() => {
    if (validationState) {
      const timer = setTimeout(() => {
        setValidationState(null)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [validationState])

  const handleChange = (text: string) => {
    setDescription(text.slice(0, maxCountOfLetters))
    if (showValidation) {
      setShowValidation(false)
      setValidationState(null)
    }
  }

  const saveDescription = () => {
    localStorage.setItem(USER_DESCRIPTION_KEY, description)
  }

  const validateInput = () => {
    if (description.length === 0) {
      setValidationState('error')
      return false
    } else if (description.length > maxCountOfLetters) {
      setValidationState('error')
      return false
    } else {
      setValidationState('success')
      return true
    }
  }

  const handleClick = () => {
    setShowValidation(true)
    const isValid = validateInput()
    
    if (isValid) {
      saveDescription()
    }
  }

  const handleInputClick = () => {
    inputRef.current?.focus()
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const getCounterClass = () => {
    if (!showValidation) return styles.bioTextareaLength
    
    if (validationState === 'error') {
      return `${styles.bioTextareaLength} ${styles.error}`
    } else if (validationState === 'success') {
      return `${styles.bioTextareaLength} ${styles.success}`
    }
    
    return styles.bioTextareaLength
  }

  return (
    <>
      <div className={styles.bio}>
        <div className={styles.bioHeader}>
          <button className={styles.bioHeaderBack} onClick={onBack}>
            <img src={arrowLeftSvg} alt="back" />
          </button>
          <ProgressBar currentStep={4} totalSteps={4} />
        </div>
        <h2 className={styles.bioTitle}>Твой вайб</h2>
        <div className={styles.bioTextareaWrapper} onClick={handleInputClick}>
          <h3 className={styles.bioTextareaTitle}>О себе</h3>
          <textarea
            ref={inputRef}
            placeholder={isFocused ? "" : "Введите текст или сгенерируйте его с помощью ИИ..."}
            className={styles.bioTextarea}
            value={description}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button className={styles.bioTextareaGenerator}>
            <img src={playerSvg} alt="player" />
            Сгенерировать с помощью ИИ
          </button>
        </div>
        <div className={getCounterClass()}>
          {description.length}/{maxCountOfLetters}
        </div>
        <div className={styles.bioDecor}>
          <img
            className={styles.bioDecorImage}
            src={fireSvg}
            alt="fire decor"
          />
          <h3 className={styles.bioDecorText}>
            Последний<br></br> шаг!
          </h3>
        </div>
      </div>
      <div className={styles.bioFooter}>
        <Button onClick={handleClick}>
          Предпросмотр
        </Button>
      </div>
    </>
  )
}