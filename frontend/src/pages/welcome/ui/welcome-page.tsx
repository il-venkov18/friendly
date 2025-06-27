import { useOnboarding } from '@/features/onboarding/lib/hooks/use-onboarding';
import { Button } from '@/shared/ui/button/button';

export const WelcomePage = () => {
  const { next } = useOnboarding();

  return (
    <div className="flex flex-col min-h-screen p-6 bg-[#1C1C1C]">
      {/* Основной контент */}
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        {/* Заголовок */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Добро пожаловать!
        </h1>
        
        {/* Описание - теперь белый текст */}
        <p className="text-white mb-8 max-w-md">
          Текст-заполнитель — это текст, который имеет некоторые характеристики 
          реального письменного текста, но является случайным набором слов
        </p>
        
        {/* Аватар */}
        <div className="w-24 h-24 bg-gray-700 rounded-full mb-6"></div>
      </div>

      {/* Футер с кнопкой и текстом */}
      <div className="space-y-4">
        {/* Текст остается серым (#787878) как в variables.scss */}
        <p className="text-xs text-[#787878] text-center px-4">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
        
        <Button 
          onClick={next}
          className="w-full py-4"
        >
          Создать анкету
        </Button>
      </div>
    </div>
  );
};