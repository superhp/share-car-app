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

type Address = {
    country: string,
    city: string,
    street: string,
    number: string
};