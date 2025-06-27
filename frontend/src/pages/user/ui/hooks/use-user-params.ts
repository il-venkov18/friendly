import { useParams } from 'react-router-dom';

export const useUserParams = () => {
  const { userId } = useParams<{ userId: string }>();
  return { userId };
};