// src/features/onboarding/ui/welcome-step.tsx
import styles from "./welcome-step.module.scss"

import { useState } from "react"

// Импорты для react-datepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Обязательно импортировать стили

import { OnboardingStepProps } from "@/features/onboarding/lib/models/types"

import { ArrowDownIcon } from "@/shared/assets/icons/ArrowDownIcon"
import { SortUpDownIcon } from "@/shared/assets/icons/SortUpDownIcon"
import { CheckmarkIcon } from "@/shared/assets/icons/CheckmarkIcon"
import { CloseIcon } from "@/shared/assets/icons/CloseIcon"
import { ArrowRightIcon } from "@/shared/assets/icons/ArrowRightIcon"; // Импортируем новую иконку

import { Button } from "@/shared/ui/button/button"

import { ProgressBar } from "../progress-bar/ProgressBar"

const currentOnboardingStep = 1

const availableCities = [
  "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань",
  "Нижний Новгород", "Челябинск", "Самара", "Омск", "Ростов-на-Дону",
  "Уфа", "Красноярск", "Воронеж", "Пермь", "Волгоград",
  "Минск", "Нур-Султан (Астана)", "Бишкек", "Ташкент",
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

const allDatingGoals = ["Дружба", "Отношения", "Серьезные отношения", "Поиск партнера", "Общение", "Совместный досуг"];


export const WelcomeStep = ({ onNext }: OnboardingStepProps) => {
  const [cityInput, setCityInput] = useState<string>("Москва")
  const [universityInput, setUniversityInput] = useState<string>("")
  const [genderPreference, setGenderPreference] = useState<string[]>([]);

  const [selectedGender, setSelectedGender] = useState<string>("");

  const [courseInput, setCourseInput] = useState<string>("");
  const [degreeInput, setDegreeInput] = useState<string>("");

  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date(2002, 2, 20)); // Месяцы в JS 0-индексированы: Февраль = 1

  const [selectedDatingGoals, setSelectedDatingGoals] = useState<string[]>([]);
  const [isGoalsDropdownOpen, setIsGoalsDropdownOpen] = useState(false);

  // НОВОЕ состояние для управления видимостью календаря
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);


  const handleGenderPreferenceChange = (gender: string) => {
    setGenderPreference((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const handleRemoveGoal = (goalToRemove: string) => {
    setSelectedDatingGoals((prev) => prev.filter((goal) => goal !== goalToRemove));
  };

  const handleToggleGoalInDropdown = (goal: string) => {
    setSelectedDatingGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "дд . мм . гггг";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Обработчик изменения даты в DatePicker
  const handleDateChange = (date: Date | null) => {
    setDateOfBirth(date);
    setIsDatePickerOpen(false); // Закрываем календарь после выбора даты
  };


  return (
    <div className={styles.onboardingForm}>
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

          <div className={styles.selectWrapper}>
            <select
              className={styles.formSelect}
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="">Пол</option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
            <ArrowDownIcon className={styles.selectArrowIcon} />
          </div>

          {/* БЛОК: Дата рождения с DatePicker */}
          <div className={styles.formField}>
            {/* CustomInput для DatePicker, имитирующий ваш дизайн */}
            <DatePicker
              selected={dateOfBirth}
              onChange={handleDateChange}
              dateFormat="dd.MM.yyyy"
              showPopperArrow={false} // Скрываем стрелку попапа
              // isOpen={isDatePickerOpen} // Управляем видимостью вручную, если это нужно
              // onClickOutside={() => setIsDatePickerOpen(false)} // Закрываем при клике вне
              // withPortal // Используем портал для рендеринга вне DOM дерева, чтобы избежать проблем со стилями

              // Кастомный инпут для DatePicker, который будет выглядеть как ваш дизайн
              customInput={
                <div
                  className={`${styles.formInput} ${styles.dateInputWrapper}`}
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} // Переключаем видимость при клике
                >
                  <span className={styles.dateLabel}>Дата рождения</span>
                  <span className={styles.dateValue}>{formatDate(dateOfBirth)}</span>
                  <ArrowRightIcon className={styles.dateArrowIcon} />
                </div>
              }
              // Дополнительные пропсы для DatePicker, чтобы он закрывался при выборе даты
              onSelect={() => setIsDatePickerOpen(false)} // Закрыть при выборе даты
              onCalendarClose={() => setIsDatePickerOpen(false)} // Закрыть, если календарь закрылся
              onCalendarOpen={() => setIsDatePickerOpen(true)} // Открыть, если календарь открылся
            />
          </div>

          <input
            type="text"
            className={styles.formInput}
            placeholder="Город"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            list="city-suggestions"
          />
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
            <select
              className={styles.formSelect}
              value={courseInput}
              onChange={(e) => setCourseInput(e.target.value)}
            >
              <option value="">Курс</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={String(num)}>
                  {num} курс
                </option>
              ))}
            </select>
            <SortUpDownIcon className={styles.selectArrowIcon} fill="#78797E" />
          </div>

          <div className={styles.selectWrapper}>
            <select
              className={styles.formSelect}
              value={degreeInput}
              onChange={(e) => setDegreeInput(e.target.value)}
            >
              <option value="">Степень</option>
              <option value="bachelor">Бакалавр</option>
              <option value="master">Магистр</option>
            </select>
            <SortUpDownIcon className={styles.selectArrowIcon} fill="#78797E" />
          </div>


          {/* Цели знакомства block */}
          <div className={styles.formField}>
            <div
              className={`${styles.formInput} ${styles.goalsInputWrapper}`}
              onClick={() => setIsGoalsDropdownOpen(!isGoalsDropdownOpen)}
            >
              {selectedDatingGoals.length > 0 ? (
                selectedDatingGoals.map((goal) => (
                  <div key={goal} className={styles.selectedGoalChip}>
                    <span>{goal}</span>
                    <CloseIcon
                      className={styles.chipCloseIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveGoal(goal);
                      }}
                    />
                  </div>
                ))
              ) : (
                <span className={styles.goalsPlaceholder}>Цели</span>
              )}
              <SortUpDownIcon className={styles.goalsDropdownArrowIcon} fill="#78797E" />
            </div>

            {isGoalsDropdownOpen && (
              <div className={styles.goalsDropdown}>
                {allDatingGoals.map((goal) => (
                  <div
                    key={goal}
                    className={`${styles.goalsDropdownItem} ${selectedDatingGoals.includes(goal) ? styles.selected : ''}`}
                    onClick={() => handleToggleGoalInDropdown(goal)}
                  >
                    <span>{goal}</span>
                    {selectedDatingGoals.includes(goal) && <CheckmarkIcon className={styles.dropdownCheckmarkIcon} />}
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
      <div className={styles.nextFooter}>
        <Button onClick={onNext}>Далее</Button>
      </div>
    </div>
  )
}