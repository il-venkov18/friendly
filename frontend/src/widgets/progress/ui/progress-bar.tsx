import css from './progress-bar.module.scss';

type Props = {
  currentStep: number;
  totalSteps: number;
  className?: string;
};

export const ProgressBar = ({ currentStep, totalSteps, className }: Props) => {
  if (currentStep <= 0 || totalSteps <= 1) return null;

  return (
    <div className={`${css.progressBar} ${className}`}>
      {Array.from({ length: totalSteps }).map((_, idx) => (
        <div
          key={idx}
          className={
            idx <= currentStep ? css.progressItemActive : css.progressItem
          }
        />
      ))}
    </div>
  );
};