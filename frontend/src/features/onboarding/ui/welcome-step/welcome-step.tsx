// src/features/onboarding/ui/welcome-step.tsx
import styles from "./welcome-step.module.scss"

import { useState } from "react"

import { OnboardingStepProps } from "@/features/onboarding/lib/models/types"

import { ArrowDownIcon } from "@/shared/assets/icons/ArrowDownIcon"

import { SortUpDownIcon } from "@/shared/assets/icons/SortUpDownIcon"

import { Button } from "@/shared/ui/button/button"

import { ProgressBar } from "../progress-bar/ProgressBar"

// Adjust path if necessary

const currentOnboardingStep = 1

const availableCities = [
  "Москва",
  "Санкт-Петербург",
  "Новосибирск",
  "Екатеринбург",
  "Казань",
  "Нижний Новгород",
  "Челябинск",
  "Самара",
  "Омск",
  "Ростов-на-Дону",
  "Уфа",
  "Красноярск",
  "Воронеж",
  "Пермь",
  "Волгоград",
  "Минск",
  "Нур-Султан (Астана)",
  "Бишкек",
  "Ташкент",
  // Добавьте больше городов по необходимости
]

const availableUniversities = [
  "Московский Государственный Университет им. М.В. Ломоносова (МГУ)",
  "Санкт-Петербургский Государственный Университет (СПбГУ)",
  "Национальный исследовательский университет «Высшая школа экономики» (НИУ ВШЭ)",
  "Московский физико-технический институт (МФТИ)",
  "Московский государственный технический университет им. Н.Э. Баумана (МГТУ)",
  "Казанский (Приволжский) федеральный университет (КФУ)",
  "Новосибирский национальный исследовательский государственный университет (НГУ)",
  "Уральский федеральный университет имени первого Президента России Б.Н. Ельцина (УрФУ)",
  "Томский политехнический университет (ТПУ)",
  "Национальный исследовательский технологический университет «МИСиС» (МИСиС)",
  "Российский экономический университет имени Г.В. Плеханова (РЭУ им. Плеханова)",
  "Финансовый университет при Правительстве РФ",
  "МГИМО (У) МИД России",
  "Первый Московский государственный медицинский университет имени И.М. Сеченова",
  "Белорусский государственный университет (БГУ)",
  "Казахский национальный университет имени аль-Фараби (КазНУ)",
  // Add more universities as needed
]

export const WelcomeStep = ({ onNext }: OnboardingStepProps) => {
  const [cityInput, setCityInput] = useState<string>("Москва") // Начальное значение по умолчанию
  const [universityInput, setUniversityInput] = useState<string>("") // NEW state for university input

  return (
    <div className={styles.onboardingForm}>
      <div className={styles.formHeader}>
        <ProgressBar currentStep={currentOnboardingStep} totalSteps={4} />
      </div>

      <div className={styles.formSection}>
        <div className={styles.sectionTitle}>профиль</div>

        <div className={styles.sectionContent}>
          {/* Имя и пол */}
          <input
            type="text"
            className={styles.formInput}
            placeholder="Имя"
            defaultValue="Илья"
          />

          {/* Wrapper for the select and the custom arrow icon */}
          <div className={styles.selectWrapper}>
            <select className={styles.formSelect}>
              <option value="">Пол</option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
            <ArrowDownIcon className={styles.selectArrowIcon} />
          </div>

          {/* Дата рождения */}
          <div className={styles.formField}>
            <input type="date" className={styles.formInput} />
          </div>

          {/* Местоположение и образование */}
          <input
            type="text"
            className={styles.formInput}
            placeholder="Город"
            value={cityInput} // Связываем с состоянием
            onChange={(e) => setCityInput(e.target.value)} // Обновляем состояние при вводе
            list="city-suggestions" // Связываем с datalist по ID
          />
          {/* Datalist для предложений городов */}
          <datalist id="city-suggestions" className={styles.cities}>
            {availableCities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>

          <div className={styles.selectWrapper}>
            <select
              className={styles.formSelect}
              value={universityInput}
              onChange={(e) => setUniversityInput(e.target.value)}
            >
              <option value="">ВУЗ</option>
              {availableUniversities.map((university) => (
                <option key={university} value={university}>
                  {university}
                </option>
              ))}
            </select>
            <SortUpDownIcon className={styles.selectArrowIcon} fill="#78797E" />
          </div>

          <input type="text" className={styles.formInput} placeholder="Факультет" />

          <div className={styles.selectWrapper}>
            <select className={styles.formSelect}>
              <option value="">Курс</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} курс
                </option>
              ))}
            </select>
            <SortUpDownIcon className={styles.selectArrowIcon} fill="#78797E" />
          </div>

          <div className={styles.selectWrapper}>
            <select className={styles.formSelect}>
              <option value="">Степень</option>
              <option value="bachelor">Бакалавр</option>
              <option value="master">Магистр</option>
            </select>
            <SortUpDownIcon className={styles.selectArrowIcon} fill="#78797E" />
          </div>


          {/* Цели знакомства */}
          <div className={styles.formField}>
            <div className={styles.formRow}>
              <span className={styles.formOption}>Дружба</span>
              <span className={styles.formOption}>Отношения</span>
            </div>
            <p className={styles.formHint}>Выберите минимум одно значение</p>

            <h3 className={styles.formSubtitle}>КОГО ИЩУ</h3>
            <div className={styles.formCheckboxGroup}>
              <label className={styles.formCheckbox}>
                <input type="checkbox" />
                <span>Парни</span>
              </label>
              <label className={styles.formCheckbox}>
                <input type="checkbox" />
                <span>Девушки</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.nextFooter}>
        <Button onClick={onNext}>Далее</Button>
      </div>
    </div>
  )
}