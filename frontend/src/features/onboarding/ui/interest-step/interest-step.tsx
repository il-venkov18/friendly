import styles from "./interest-step.module.scss"

import { useEffect, useState } from "react"

import { OnboardingStepProps } from "@/features/onboarding/lib/models/types"

import { Button } from "@/shared/ui/button/button"

import { ProgressBar } from "../progress-bar/ProgressBar"

const INTEREST_CLUSTERS = [
  {
    id: 1,
    name: "Музыка",
    interests: [
      { label: "Рэп и Хип-хоп", img: "/assets/interests/music/rap.jpg" },
      { label: "Рок", img: "/assets/interests/music/rock.jpg" },
      { label: "Электронная", img: "/assets/interests/music/electronic.jpg" },
      { label: "Поп", img: "/assets/interests/music/pop.jpg" },
      { label: "Джаз и блюз", img: "/assets/interests/music/jazz.jpg" },
      { label: "Классическая", img: "/assets/interests/music/classic.jpg" },
    ],
  },
  {
    id: 2,
    name: "Игры",
    interests: [
      { label: "Шутеры", img: "/assets/interests/games/shooters.jpg" },
      { label: "RPG", img: "/assets/interests/games/rpg.jpg" },
      { label: "Симуляторы", img: "/assets/interests/games/simulators.jpg" },
      { label: "Экшн", img: "/assets/interests/games/action.jpg" },
      { label: "Хоррор", img: "/assets/interests/games/horror.jpg" },
      { label: "Настольные игры", img: "/assets/interests/games/board.jpg" },
    ],
  },
  {
    id: 3,
    name: "Кино и сериалы",
    interests: [
      { label: "Фэнтези", img: "/assets/interests/movies/fantasy.jpg" },
      { label: "Детективы", img: "/assets/interests/movies/detective.jpg" },
      { label: "Романтические", img: "/assets/interests/movies/romantic.jpg" },
      { label: "Комедии", img: "/assets/interests/movies/comedy.jpg" },
      { label: "Ужасы", img: "/assets/interests/movies/horror.jpg" },
      { label: "Аниме", img: "/assets/interests/movies/anime.jpg" },
    ],
  },
  {
    id: 4,
    name: "Образ жизни",
    interests: [
      { label: "Спорт", img: "/assets/interests/lifestyle/sport.jpg" },
      { label: "Путешествия", img: "/assets/interests/lifestyle/travel.jpg" },
      { label: "Медитация", img: "/assets/interests/lifestyle/meditation.jpg" },
      { label: "Вечеринки", img: "/assets/interests/lifestyle/parties.jpg" },
      {
        label: "Волонтерство",
        img: "/assets/interests/lifestyle/volunteer.jpg",
      },
      {
        label: "Активный отдых",
        img: "/assets/interests/lifestyle/active.jpg",
      },
    ],
  },
  {
    id: 5,
    name: "Учёба и развитие",
    interests: [
      { label: "IT", img: "/assets/interests/study/it.jpg" },
      {
        label: "Предпринимательство",
        img: "/assets/interests/study/business.jpg",
      },
      { label: "Научпоп", img: "/assets/interests/study/science.jpg" },
      { label: "Книги", img: "/assets/interests/study/books.jpg" },
      {
        label: "Изучение языков",
        img: "/assets/interests/study/languages.jpg",
      },
      { label: "Хакатоны", img: "/assets/interests/study/hackathons.jpg" },
    ],
  },
  {
    id: 6,
    name: "Вайб",
    interests: [
      { label: "Мемы", img: "/assets/interests/vibe/memes.jpg" },
      { label: "Глубокие разговоры", img: "/assets/interests/vibe/talks.jpg" },
      { label: "Чилл", img: "/assets/interests/vibe/chill.jpg" },
      { label: "Романтика", img: "/assets/interests/vibe/romance.jpg" },
      { label: "Спонтанность", img: "/assets/interests/vibe/spontaneous.jpg" },
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
