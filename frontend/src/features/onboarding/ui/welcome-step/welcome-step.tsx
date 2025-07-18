import styles from "./welcome-step.module.scss"

import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { OnboardingStepProps } from "@/features/onboarding/lib/models/types"

import { ArrowRightIcon } from "@/shared/assets/icons/ArrowRightIcon"
import { CheckmarkIcon } from "@/shared/assets/icons/CheckmarkIcon"
import { CloseIcon } from "@/shared/assets/icons/CloseIcon"
import { SortUpDownIcon } from "@/shared/assets/icons/SortUpDownIcon"
import { Button } from "@/shared/ui/button/button"
import { CustomSelect } from "@/shared/ui/custom-select/CustomSelect"

import { ProgressBar } from "../progress-bar/ProgressBar"

const currentOnboardingStep = 1

const availableCities = ["Москва", "Санкт-Петербург"]

const availableUniversities = [
  "Московский Государственный Университет им. М.В. Ломоносова (МГУ)",
  "Санкт-Петербургский Государственный Университет (СПбГУ)",
  "Национальный исследовательский университет «Высшая школа экономики» (НИУ ВШЭ)",
  "Московский физико-технический институт (МФТИ)",
  "Московский государственный технический университет им. Н.Э. Баумана (МГТУ)",
  "Национальный исследовательский технологический университет «МИСиС» (МИСиС)",
  "Российский экономический университет имени Г.В. Плеханова (РЭУ им. Плеханова)",
  "Финансовый университет при Правительстве РФ",
  "МГИМО (У) МИД России",
  "Первый Московский государственный медицинский университет имени И.М. Сеченова",
]

const allDatingGoals = ["Дружба", "Отношения", "Учёба", "Тусовки", "Нетворкинг"]

const genderOptions = [
  { value: "", label: "Пол" },
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
]

const degreeOptions = [
  { value: "", label: "Степень" },
  { value: "bachelor", label: "Бакалавр" },
  { value: "master", label: "Магистр" },
  { value: "phd", label: "Аспирант" },
]

export const WelcomeStep = ({ onNext }: OnboardingStepProps) => {
  const [nameInput, setNameInput] = useState<string>("")
  const [nameError, setNameError] = useState<string>("")
  const [cityInput, setCityInput] = useState<string>("")
  const [cityError, setCityError] = useState<string>("")
  const [universityInput, setUniversityInput] = useState<string>("")
  const [displayedUniversity, setDisplayedUniversity] = useState<string>("")
  const [genderPreference, setGenderPreference] = useState<string[]>([])
  const [genderPreferenceError, setGenderPreferenceError] = useState<string>("")
  const [selectedGender, setSelectedGender] = useState<string>("")
  const [genderError, setGenderError] = useState<string>("")
  const [courseInput, setCourseInput] = useState<string>("")
  const [courseOptions, setCourseOptions] = useState<
    { value: string; label: string }[]
  >([{ value: "", label: "Курс" }])
  const [degreeInput, setDegreeInput] = useState<string>("")
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(
    new Date(2001, 0, 0)
  )
  const [selectedDatingGoals, setSelectedDatingGoals] = useState<string[]>([])
  const [isGoalsDropdownOpen, setIsGoalsDropdownOpen] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const handleGenderPreferenceChange = (gender: string) => {
    setGenderPreference((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    )
    if (genderPreferenceError) setGenderPreferenceError("")
  }

  const saveFormDataToLocalStorage = () => {
    const formData = {
      name: nameInput,
      city: cityInput,
      university: universityInput,
      genderPreference,
      gender: selectedGender,
      course: courseInput,
      degree: degreeInput,
      dateOfBirth: dateOfBirth?.toISOString(),
      datingGoals: selectedDatingGoals,
    }

    localStorage.setItem("onboardingFormData", JSON.stringify(formData))
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value
    setCityInput(city)
    if (cityError) validateCity(city)
  }

  const getShortUniversityName = (fullName: string): string => {
    const match = fullName.match(/\(([^)]+)\)/)
    return match ? match[1] : fullName
  }

  const handleUniversityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUniversityInput(value)

    // Если выбранный вуз есть в списке доступных, показываем краткое название
    if (availableUniversities.includes(value)) {
      setDisplayedUniversity(getShortUniversityName(value))
    } else {
      setDisplayedUniversity(value)
    }
  }

  const updateCourseOptions = (degree: string) => {
    let maxCourses = 4 // По умолчанию для бакалавра

    if (degree === "master" || degree === "phd") {
      maxCourses = 2
    }

    const newOptions = [
      { value: "", label: "Курс" },
      ...Array.from({ length: maxCourses }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1} курс`,
      })),
    ]

    setCourseOptions(newOptions)
    setCourseInput("");
  }

  const handleDegreeChange = (value: string) => {
    setDegreeInput(value)
    updateCourseOptions(value)
  }

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

  const handleDateChange = (date: Date | null) => {
    setDateOfBirth(date)
    setIsDatePickerOpen(false)
  }

  const handleGenderSelect = (value: string) => {
    setSelectedGender(value)
    if (value && genderError) {
      setGenderError("")
    }
  }

  const validateForm = () => {
    let isValid = true

    // Validate name
    if (!nameInput.trim()) {
      setNameError("Имя не может быть пустым")
      isValid = false
    } else {
      setNameError("")
    }

    // Validate gender
    if (!selectedGender) {
      setGenderError("Выберите пол")
      isValid = false
    }

    // Validate city
    if (!validateCity(cityInput)) {
      isValid = false
    }

    // Validate dating goals
    if (selectedDatingGoals.length === 0) {
      isValid = false
    }

    // Validate gender preference
    if (genderPreference.length === 0) {
      setGenderPreferenceError("Выберите хотя бы один вариант")
      isValid = false
    } else {
      setGenderPreferenceError("")
    }

    return isValid
  }

  const handleNext = () => {
    if (validateForm()) {
      saveFormDataToLocalStorage()
      onNext()
    }
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
            <div className={styles.formField}>
              <input
                type="text"
                className={`${styles.formInput} ${nameError ? styles.inputError : ""}`}
                placeholder="Имя"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              {nameError && (
                <p className={`${styles.formHint} ${styles.errorHint}`}>
                  {nameError}
                </p>
              )}
            </div>

            <div className={styles.formField}>
              <CustomSelect
                options={genderOptions}
                value={selectedGender}
                onChange={handleGenderSelect}
                placeholder="Пол"
                arrowIcon="arrowDown"
                hasError={!!genderError}
              />
              {genderError && (
                <p className={`${styles.formHint} ${styles.errorHint}`}>
                  {genderError}
                </p>
              )}
            </div>

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
              <datalist id="city-suggestions">
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

            <div className={styles.formField}>
              <input
                type="text"
                className={styles.formInput}
                placeholder="ВУЗ"
                value={displayedUniversity || universityInput}
                onChange={handleUniversityChange}
                list="university-suggestions"
              />
              <datalist id="university-suggestions">
                {availableUniversities.map((uni) => (
                  <option key={uni} value={uni} />
                ))}
              </datalist>
            </div>

            <input
              type="text"
              className={styles.formInput}
              placeholder="Факультет"
            />

            <CustomSelect
              options={degreeOptions}
              value={degreeInput}
              onChange={handleDegreeChange}
              placeholder="Степень"
              arrowIcon="sortUpDown"
            />

            <CustomSelect
              options={courseOptions}
              value={courseInput}
              onChange={setCourseInput}
              placeholder="Курс"
              arrowIcon="sortUpDown"
            />

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
                      className={`${styles.goalsDropdownItem} ${
                        selectedDatingGoals.includes(goal)
                          ? styles.selected
                          : ""
                      }`}
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
            </div>

            <h3 className={styles.formSubtitle}>КОГО ИЩУ</h3>
            <div className={styles.formField}>
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
              {genderPreferenceError && (
                <p className={`${styles.formHint} ${styles.errorHint}`}>
                  {genderPreferenceError}
                </p>
              )}
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
