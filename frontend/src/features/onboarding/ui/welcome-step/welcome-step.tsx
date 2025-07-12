// src/features/onboarding/ui/welcome-step.tsx
import styles from "./welcome-step.module.scss"

import { useState } from "react"
// Импорты для react-datepicker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

// Обязательно импортировать стили

import { OnboardingStepProps } from "@/features/onboarding/lib/models/types"

import { ArrowRightIcon } from "@/shared/assets/icons/ArrowRightIcon"
import { CheckmarkIcon } from "@/shared/assets/icons/CheckmarkIcon"
import { CloseIcon } from "@/shared/assets/icons/CloseIcon"
// Общие иконки, которые теперь будут использоваться в CustomSelect
import { SortUpDownIcon } from "@/shared/assets/icons/SortUpDownIcon"
import { Button } from "@/shared/ui/button/button"
import { CustomSelect } from "@/shared/ui/custom-select/CustomSelect"

import { ProgressBar } from "../progress-bar/ProgressBar"

// Импортируем новый компонент

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
]

const allDatingGoals = ["Дружба", "Отношения", "Учёба", "Тусовки", "Нетворкинг"]

// Опции для CustomSelect
const genderOptions = [
  { value: "", label: "Пол" },
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
]

const universityOptions = [
  { value: "", label: "ВУЗ" },
  ...availableUniversities.map((uni) => ({ value: uni, label: uni })),
]

const courseOptions = [
  { value: "", label: "Курс" },
  ...[1, 2, 3, 4, 5].map((num) => ({
    value: String(num),
    label: `${num} курс`,
  })),
]

const degreeOptions = [
  { value: "", label: "Степень" },
  { value: "bachelor", label: "Бакалавр" },
  { value: "master", label: "Магистр" },
]

export const WelcomeStep = ({ onNext }: OnboardingStepProps) => {
  const [cityInput, setCityInput] = useState<string>("")
  const [cityError, setCityError] = useState<string>("")
  const [universityInput, setUniversityInput] = useState<string>("")
  const [genderPreference, setGenderPreference] = useState<string[]>([])

  const [selectedGender, setSelectedGender] = useState<string>("")

  const [courseInput, setCourseInput] = useState<string>("")
  const [degreeInput, setDegreeInput] = useState<string>("")

  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(
    new Date(2001, 0, 0)
  ) // Месяцы в JS 0-индексированы: Февраль = 1

  const [selectedDatingGoals, setSelectedDatingGoals] = useState<string[]>([])
  const [isGoalsDropdownOpen, setIsGoalsDropdownOpen] = useState(false)

  // НОВОЕ состояние для управления видимостью календаря
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const handleGenderPreferenceChange = (gender: string) => {
    setGenderPreference((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    )
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    setCityInput(city);
    if (cityError) validateCity(city); // Validate on change if there's already an error
  };

  const validateCity = (city: string) => {
    if (!availableCities.includes(city)) {
      setCityError("Выберите город из списка")
      return false
    }
    setCityError("")
    return true
  }

  const handleRemoveGoal = (goalToRemove: string) => {
    setSelectedDatingGoals((prev) =>
      prev.filter((goal) => goal !== goalToRemove)
    )
  }

  const handleToggleGoalInDropdown = (goal: string) => {
    setSelectedDatingGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    )
  }

  const formatDate = (date: Date | null): string => {
    if (!date) return "дд . мм . гггг"
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  // Обработчик изменения даты в DatePicker
  const handleDateChange = (date: Date | null) => {
    setDateOfBirth(date)
    setIsDatePickerOpen(false) // Закрываем календарь после выбора даты
  }

  const handleNext = () => {
    if (!validateCity(cityInput)) return
    if (selectedDatingGoals.length === 0) return
    onNext()
  }

  return (
    <div className={styles.onboardingForm}>
      <div className={styles.formContent}>
        <div className={styles.formHeader}>
          <ProgressBar currentStep={currentOnboardingStep} totalSteps={4} />
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>профиль</div>

          <div className={styles.sectionContent}>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Имя"
              defaultValue="Илья"
            />

            {/* Заменяем нативный select для Пола на CustomSelect */}
            <CustomSelect
              options={genderOptions}
              value={selectedGender}
              onChange={setSelectedGender}
              placeholder="Пол"
              arrowIcon="arrowDown" // Для пола используем ArrowDownIcon
            />

            {/* БЛОК: Дата рождения с DatePicker (остается без изменений) */}
            <div className={styles.formField}>
              <DatePicker
                selected={dateOfBirth}
                onChange={handleDateChange}
                dateFormat="dd.MM.yyyy"
                showPopperArrow={false}
                customInput={
                  <div
                    className={`${styles.formInput} ${styles.dateInputWrapper}`}
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
                    <span className={styles.dateLabel}>Дата рождения</span>
                    <span className={styles.dateValue}>
                      {formatDate(dateOfBirth)}
                    </span>
                    <ArrowRightIcon className={styles.dateArrowIcon} />
                  </div>
                }
                onSelect={() => setIsDatePickerOpen(false)}
                onCalendarClose={() => setIsDatePickerOpen(false)}
                onCalendarOpen={() => setIsDatePickerOpen(true)}
              />
            </div>

            <div className={styles.formField}>
              <input
                type="text"
                className={`${styles.formInput} ${cityError ? styles.inputError : ""}`}
                placeholder="Город"
                value={cityInput}
                onChange={handleCityChange}
                list="city-suggestions"
              />
              <datalist id="city-suggestions" className={styles.cities}>
                {availableCities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
              {cityError && (
                <p className={`${styles.formHint} ${styles.errorHint}`}>
                  {cityError}
                </p>
              )}
            </div>

            {/* Заменяем нативный select для ВУЗа на CustomSelect */}
            <CustomSelect
              options={universityOptions}
              value={universityInput}
              onChange={setUniversityInput}
              placeholder="ВУЗ"
              arrowIcon="sortUpDown"
            />

            <input
              type="text"
              className={styles.formInput}
              placeholder="Факультет"
            />

            {/* Заменяем нативный select для Курса на CustomSelect */}
            <CustomSelect
              options={courseOptions}
              value={courseInput}
              onChange={setCourseInput}
              placeholder="Курс"
              arrowIcon="sortUpDown"
            />

            {/* Заменяем нативный select для Степени на CustomSelect */}
            <CustomSelect
              options={degreeOptions}
              value={degreeInput}
              onChange={setDegreeInput}
              placeholder="Степень"
              arrowIcon="sortUpDown"
            />

            {/* Цели знакомства block (остается без изменений, так как он уже кастомный) */}
            <div className={styles.formField}>
              <div
                className={`${styles.formInput} ${styles.goalsInputWrapper}`}
                onClick={() => setIsGoalsDropdownOpen(!isGoalsDropdownOpen)}>
                {selectedDatingGoals.length > 0 ? (
                  selectedDatingGoals.map((goal) => (
                    <div key={goal} className={styles.selectedGoalChip}>
                      <span>{goal}</span>
                      <CloseIcon
                        className={styles.chipCloseIcon}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveGoal(goal)
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <span className={styles.goalsPlaceholder}>Цели</span>
                )}
                <SortUpDownIcon
                  className={styles.goalsDropdownArrowIcon}
                  fill="#78797E"
                />
              </div>

              {isGoalsDropdownOpen && (
                <div className={styles.goalsDropdown}>
                  {allDatingGoals.map((goal) => (
                    <div
                      key={goal}
                      className={`${styles.goalsDropdownItem} ${selectedDatingGoals.includes(goal) ? styles.selected : ""}`}
                      onClick={() => handleToggleGoalInDropdown(goal)}>
                      <span>{goal}</span>
                      {selectedDatingGoals.includes(goal) && (
                        <CheckmarkIcon
                          className={styles.dropdownCheckmarkIcon}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {selectedDatingGoals.length === 0 && (
                <p className={`${styles.formHint} ${styles.errorHint}`}>
                  Выберите минимум одно значение
                </p>
              )}

              <h3 className={styles.formSubtitle}>КОГО ИЩУ</h3>
              <div className={styles.formCheckboxGroup}>
                <label className={styles.formCheckbox}>
                  <input
                    type="checkbox"
                    value="male"
                    checked={genderPreference.includes("male")}
                    onChange={() => handleGenderPreferenceChange("male")}
                  />
                  <span>Парни</span>
                  {genderPreference.includes("male") && (
                    <CheckmarkIcon className={styles.checkmarkIcon} />
                  )}
                </label>
                <label className={styles.formCheckbox}>
                  <input
                    type="checkbox"
                    value="female"
                    checked={genderPreference.includes("female")}
                    onChange={() => handleGenderPreferenceChange("female")}
                  />
                  <span>Девушки</span>
                  {genderPreference.includes("female") && (
                    <CheckmarkIcon className={styles.checkmarkIcon} />
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.nextFooter}>
        <Button onClick={handleNext}>Далее</Button>
      </div>
    </div>
  )
}
