import { useState } from "react"
import React from "react"
import { BasicInfoStep } from "@/features/onboarding/ui/basic-info-step/basic-info-step"
import { BioStep } from "@/features/onboarding/ui/bio-step/bio-step"
import { InterestStep } from "@/features/onboarding/ui/interest-step/interest-step"
import { WelcomeStep } from "@/features/onboarding/ui/welcome-step/welcome-step"
import { ProgressBar } from "@/widgets/progress/ui/progress-bar"
import QuestionsLayout from "@/shared/ui/layouts/questions-layout/questions-layout"

type StepComponent = (onNext: () => void) => React.ReactElement

const WELCOME_STEPS: StepComponent[] = [
  (onNext) => <WelcomeStep onNext={onNext} />,
  (onNext) => <BasicInfoStep onNext={onNext} />,
  (onNext) => <BioStep onNext={onNext} />,
  (onNext) => <InterestStep onNext={onNext} />,
]

const WelcomeScreen = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, WELCOME_STEPS.length))
  }

  if (currentStep >= WELCOME_STEPS.length) {
    return (
      <QuestionsLayout>
        <div>
          <h2>Спасибо! 🎉</h2>
          <p>Вы завершили приветствие.</p>
        </div>
      </QuestionsLayout>
    )
  }

  return (
    <div>
      <ProgressBar
        currentStep={currentStep}
        totalSteps={WELCOME_STEPS.length}
      />
      <div>{WELCOME_STEPS[currentStep](handleNext)}</div>
    </div>
  )
}

export default WelcomeScreen
