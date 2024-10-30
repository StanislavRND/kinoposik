import { Profile } from '@/shared/components';

const ProfileSubscription = () => {
  return (
    <div className="profile">
      <div className="profile__container-subscriptions container">
        <Profile />
        <div className="profile__subscription">
          <div className="profile__subscription-title">1 месяц</div>
          <div className="profile__subscription-price">299₽</div>
          <button className="profile__subscription-button">30 дней за 299₽</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSubscription;
