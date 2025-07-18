import styles from "./interest-step.module.scss"

import { useEffect, useState } from "react"

import { OnboardingStepProps } from "@/features/onboarding/lib/models/types"

import { Button } from "@/shared/ui/button/button"

import { ProgressBar } from "../progress-bar/ProgressBar"

import musicPlaceholder from '@/shared/assets/images/music-placeholder.jpg'
import gamesPlaceholder from '@/shared/assets/images/games-placeholder.jpg'
import moviesPlaceholder from '@/shared/assets/images/movies-placeholder.jpg'
import lifestylePlaceholder from '@/shared/assets/images/lifestyle-placeholder.jpg'
import studyPlaceholder from '@/shared/assets/images/study-placeholder.jpg'
import vibePlaceholder from '@/shared/assets/images/vibe-placeholder.jpg'

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
      { label: "Романтические", img: moviesPlaceholder },
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
      {
        label: "Волонтерство",
        img: lifestylePlaceholder,
      },
      {
        label: "Активный\n отдых",
        img: lifestylePlaceholder,
      },
    ],
  },
  {
    id: 5,
    name: "Учёба и развитие",
    placeholder: studyPlaceholder,
    interests: [
      { label: "IT", img: studyPlaceholder },
      {
        label: "Предприни-\nмательство",
        img: studyPlaceholder,
      },
      { label: "Научпоп", img: studyPlaceholder },
      {
        label: "Изучение\nязыков",
        img: studyPlaceholder,
      },
      {
        label: "Худ.\nлитература",
        img: studyPlaceholder,
      },
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

const MAX_SELECTED_INTERESTS = 6

export const InterestStep = ({ onNext }: OnboardingStepProps) => {
  const [currentClusterIndex, setCurrentClusterIndex] = useState(0)
  const [selectedInterests, setSelectedInterests] = useState<{
    [key: string]: number[]
  }>({})
  const [totalSelected, setTotalSelected] = useState(0)
  const [isNextDisabled, setIsNextDisabled] = useState(false)

  const currentCluster = INTEREST_CLUSTERS[currentClusterIndex]
  const isLastCluster = currentClusterIndex === INTEREST_CLUSTERS.length - 1

  useEffect(() => {
    // Calculate total selected interests
    const total = Object.values(selectedInterests).reduce(
      (sum, arr) => sum + arr.length,
      0
    )
    setTotalSelected(total)

    // Disable next button only on last cluster if less than 3 selected
    setIsNextDisabled(isLastCluster && total < 3)
  }, [selectedInterests, isLastCluster])

  const handleToggle = (interestIndex: number) => {
    const clusterId = currentCluster.id.toString()
    const isSelected = selectedInterests[clusterId]?.includes(interestIndex)
    const currentClusterSelected = selectedInterests[clusterId] || []

    if (isSelected) {
      // Deselect
      setSelectedInterests((prev) => ({
        ...prev,
        [clusterId]: currentClusterSelected.filter((i) => i !== interestIndex),
      }))
    } else if (totalSelected < MAX_SELECTED_INTERESTS) {
      // Select new interest
      setSelectedInterests((prev) => ({
        ...prev,
        [clusterId]: [...currentClusterSelected, interestIndex],
      }))
    }
  }

  const handleNext = () => {
    if (isLastCluster) {
      // Prepare data for saving
      const allSelectedInterests = INTEREST_CLUSTERS.flatMap((cluster) => {
        const selected = selectedInterests[cluster.id.toString()] || []
        return selected.map((idx) => ({
          cluster: cluster.name,
          interest: cluster.interests[idx].label,
          img: cluster.interests[idx].img,
        }))
      })

      // Save to localStorage
      localStorage.setItem(
        "userInterests",
        JSON.stringify(allSelectedInterests)
      )
      onNext()
    } else {
      // Go to next cluster
      setCurrentClusterIndex((prev) => prev + 1)
    }
  }

  const isInterestDisabled = (interestIndex: number) => {
    const clusterId = currentCluster.id.toString()
    const isSelected = selectedInterests[clusterId]?.includes(interestIndex)
    return !isSelected && totalSelected >= MAX_SELECTED_INTERESTS
  }

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
    )
  }

  const renderSelectedChips = () => {
    if (totalSelected === 0) return null

    return (
      <div className={styles.selectedChips}>
        <span>
          Выбрано: {totalSelected} из {MAX_SELECTED_INTERESTS}
        </span>
      </div>
    )
  }

  return (
    <div className={styles.onboardingForm}>
      <div className={styles.formHeader}>
        <ProgressBar currentStep={2} totalSteps={4} />{" "}
        {/* Original progress bar */}
      </div>

      <div className={styles.formSection}>
        <div className={styles.sectionTitle}>
          интересы{" "}
          <span className={styles.sectionAccent}>
            – {currentCluster.name.toLowerCase()}
          </span>
        </div>
        <div className="dots">
          {renderProgressDots()} {/* Cluster progress indicator */}
          {renderSelectedChips()} {/* Selected interests counter */}
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
                ${selectedInterests[currentCluster.id.toString()]?.includes(idx) ? styles.selected : ""}
                ${isInterestDisabled(idx) ? styles.disabled : ""}
              `}
              onClick={() => !isInterestDisabled(idx) && handleToggle(idx)}
              style={{ backgroundImage: `url(${interest.img})` }}>
              <div className={styles.interestCardHeader}>
                <span className={styles.interestLabel}>{interest.label}</span>
                {selectedInterests[currentCluster.id.toString()]?.includes(
                  idx
                ) && <span className={styles.checkmark} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.nextFooter}>
        <Button onClick={handleNext} disabled={isNextDisabled}>
          {isLastCluster ? "Далее" : "Продолжить"}
        </Button>
      </div>
    </div>
  )
}
