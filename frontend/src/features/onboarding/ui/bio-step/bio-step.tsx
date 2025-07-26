import styles from "./bio-step.module.scss"

import { useRef, useState } from "react"

import { OnboardingStepProps } from "@/features/onboarding/lib/models/types"

import { Button } from "@/shared/ui/button/button"

import { ProgressBar } from "../progress-bar/ProgressBar"
import arrowLeftSvg from "./icons/arrow-left.svg"
import fireSvg from "./icons/fire.svg"
import playerSvg from "./icons/player.svg"

const maxCountOfLetters = 140
export const USER_DESCRIPTION_KEY = "about"

export const BioStep = ({ onNext, onBack }: OnboardingStepProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [description, setDescription] = useState<string>("")

  const handleChange = (text: string) => {
    setDescription(text.slice(0, maxCountOfLetters))
  }

  const saveDescription = () => {
    localStorage.setItem(USER_DESCRIPTION_KEY, description)
  }

  const handleClick = () => {
    if (description.trim()) {
      saveDescription()
      onNext()
    }
  }

  const handleInputClick = () => {
    inputRef.current?.focus()
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
            placeholder="Введите текст или сгенирируйте с помощью ИИ"
            className={styles.bioTextarea}
            value={description}
            onChange={(e) => handleChange(e.target.value)}></textarea>
          <button className={styles.bioTextareaGenerator}>
            <img src={playerSvg} alt="player" />
            Сгенерировать с помощью ИИ
          </button>
        </div>
        <div className={styles.bioTextareaLength}>
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
        <Button onClick={handleClick} disabled={!description.trim()}>
          Предпросмотр
        </Button>
      </div>
    </>
  )
}
