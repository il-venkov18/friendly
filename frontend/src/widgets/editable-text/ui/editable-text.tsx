import { useState } from 'react';
import css from './editable-text.module.scss';

interface Props {
  value: string | number;
  onChange?: (value: string) => void;
  className?: string;
}

export const EditableText = ({ value, onChange, className }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(String(value));

  const handleSave = () => {
    setIsEditing(false);
    onChange?.(text);
  };

  return (
    <div className={`${css.container} ${className}`}>
      {isEditing ? (
        <input
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className={css.input}
        />
      ) : (
        <span onClick={() => setIsEditing(true)} className={css.text}>
          {text}
        </span>
      )}
    </div>
  );
};