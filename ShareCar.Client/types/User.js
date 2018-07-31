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
<<<<<<< HEAD
  loading: boolean,
  user: UserProfileData | null
=======
    loading: boolean,
    user: User | null
>>>>>>> 349e9d8572c2da4339635e24d83351681a0fefb2
};

type Address = {
    country: string,
    city: string,
    street: string,
    number: string
};