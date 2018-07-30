// @flow

type User = {
  firstName: string,
  lastName: string,
  pictureUrl: string
};

type MyProfileState = {
  loading: boolean,
  user: User | null
};
