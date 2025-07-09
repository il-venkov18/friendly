import React, { useState, useRef, useEffect } from 'react';
import styles from './custom-select.module.scss'; // Создадим этот SCSS файл позже
import { SortUpDownIcon } from '@/shared/assets/icons/SortUpDownIcon';
import { ArrowDownIcon } from '@/shared/assets/icons/ArrowDownIcon'; // Для поля "Пол"
import { CheckmarkIcon } from '@/shared/assets/icons/CheckmarkIcon';

interface Option {
  value: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Если нужны иконки для опций
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  arrowIcon?: 'sortUpDown' | 'arrowDown'; // Тип стрелки
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  arrowIcon = 'sortUpDown', // По умолчанию используем SortUpDownIcon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOptionLabel = options.find(option => option.value === value)?.label || placeholder;

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Закрытие дропдауна при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const ArrowComponent = arrowIcon === 'sortUpDown' ? SortUpDownIcon : ArrowDownIcon;

  return (
    <div className={styles.customSelectWrapper} ref={selectRef}>
      <div className={styles.customSelectInput} onClick={() => setIsOpen(!isOpen)}>
        {selectedOptionLabel}
        <ArrowComponent className={styles.selectArrowIcon} fill="#78797E" />
      </div>

      {isOpen && (
        <div className={styles.customSelectDropdown}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.customSelectDropdownItem} ${value === option.value ? styles.selected : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              <span>{option.label}</span>
              {value === option.value && <CheckmarkIcon className={styles.checkmarkIcon} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};