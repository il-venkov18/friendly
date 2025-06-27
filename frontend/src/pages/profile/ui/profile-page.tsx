import { useProfileData } from './hooks/use-profile-data';
import css from './profile-page.module.scss';

export const ProfilePage = () => {
  const { userData } = useProfileData();

  if (!userData) return <div>Loading...</div>;

  return (
    <div className={css.container}>
      <img 
        src={userData.photo_url} 
        alt={`${userData.first_name} ${userData.last_name}`} 
        className={css.avatar}
      />
      <h1>{userData.first_name} {userData.last_name}</h1>
      <p className={css.username}>@{userData.username}</p>
    </div>
  );
};