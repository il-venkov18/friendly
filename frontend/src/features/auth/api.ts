// features/auth/api.ts

// Определяем тип для данных Telegram WebApp
export interface InitData {
  query_id?: string;
  user?: {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  };
  auth_date?: string;
  hash: string;
}

export interface AuthResponse {
  user: {
    id: number;
    username?: string;
    first_name: string;
    last_name?: string;
  };
  token: string;
}

export const authByTelegram = async (initData: InitData): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/telegram', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ initData }),
  });

  if (!response.ok) {
    throw new Error('Authentication failed');
  }

  return response.json();
};