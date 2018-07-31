// @flow

type User = {
  firstName: string,
  lastName: string,
  pictureUrl: string
};

type UserProfileData = {
  firstName: string,
  lastName: string,
  profilePicture: string,
  email: string,
  licensePlate: string,
  phone: string
};

type MyProfileState = {
  loading: boolean,
  user: UserProfileData | null
};
