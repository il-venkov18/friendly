import React, { useState, useRef, useEffect } from 'react';
import styles from './custom-select.module.scss';
import { SortUpDownIcon } from '@/shared/assets/icons/SortUpDownIcon';
import { ArrowDownIcon } from '@/shared/assets/icons/ArrowDownIcon';
import { CheckmarkIcon } from '@/shared/assets/icons/CheckmarkIcon';

interface Option {
  value: string;
  label: string;
  shortLabel?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  arrowIcon?: 'sortUpDown' | 'arrowDown';
  hasError?: boolean;
  className?: string;
  displayShortLabel?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  arrowIcon = 'sortUpDown',
  hasError = false,
  className = '',
  displayShortLabel = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);
  const selectedOptionLabel = displayShortLabel && selectedOption?.shortLabel 
    ? selectedOption.shortLabel 
    : selectedOption?.label || placeholder;

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

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
    <div 
      className={`${styles.customSelectWrapper} ${className} ${hasError ? styles.error : ''}`} 
      ref={selectRef}
    >
      <div 
        className={`${styles.customSelectInput} ${hasError ? styles.inputError : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? '' : styles.placeholder}>
          {selectedOptionLabel}
        </span>
        <ArrowComponent 
          className={styles.selectArrowIcon} 
          fill="#78797E" 
          data-arrow-icon={arrowIcon}
        />
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
              {value === option.value && (
                <CheckmarkIcon className={styles.checkmarkIcon} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};