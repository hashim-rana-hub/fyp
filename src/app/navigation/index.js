import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import CatProfile from '../../screens/CatProfile';
import Notifications from '../../screens/Notifications';
import Otp from '../../screens/Otp';
import Signin from '../../screens/Signin';
import routes from '../routes';
import EditCatProfile from '../../screens/CatProfile/EditCatProfile';
import Lessons from '../../screens/Lessons';
import Tricks from '../../screens/Tricks';
import CatName from '../../screens/CatName';
import CatAvatar from '../../screens/CatAvatar';
import CatGender from '../../screens/CatGender';
import CatBirthDate from '../../screens/CatBirthDate';
import CatBreed from '../../screens/CatBreed';
import Rewards from '../../screens/Rewards';

export const authScreens = () => {
  return [
    {
      id: 1,
      route: routes.SIGN_IN,
      component: Signin,
    },
    {
      id: 2,
      route: routes.OTP,
      component: Otp,
    },
  ];
};

export const appScreens = () => {
  return [
    {
      id: 1,
      route: routes.BOTTOM_NAVIGATION,
      component: BottomNavigation,
    },
    {
      id: 2,
      route: routes.CAT_PROFILE,
      component: CatProfile,
    },
    {
      id: 3,
      route: routes.EDIT_CAT_PROFILE,
      component: EditCatProfile,
    },
    {
      id: 4,
      route: routes.NOTIFICATIIONS,
      component: Notifications,
    },
    {
      id: 5,
      route: routes.LESSONS,
      component: Lessons,
    },
    {
      id: 6,
      route: routes.TRICKS,
      component: Tricks,
    },
    {
      id: 8,
      route: routes.CAT_NAME,
      component: CatName,
    },

    {
      id: 9,
      route: routes.CAT_GENDER,
      component: CatGender,
    },
    {
      id: 10,
      route: routes.CAT_DOB,
      component: CatBirthDate,
    },
    {
      id: 11,
      route: routes.CAT_BREED,
      component: CatBreed,
    },
    {
      id: 12,
      route: routes.CAT_AVATAR,
      component: CatAvatar,
    },
    {
      id: 13,
      route: routes.REWARDS,
      component: Rewards,
    },
  ];
};
