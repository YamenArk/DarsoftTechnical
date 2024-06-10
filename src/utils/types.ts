
export type createUserParams = {
    email: string;
    firstName: string;
    secondName: string;
    lastName: string;
    password: string;
  }

export type loginParams = {
  email: string;
  password: string;
}

export type updateProfileParams = {
  firstName: string;
  secondName: string;
  lastName: string;
  phoneNumber: string;
  birthDay: string;
  gender: string;
}


export type CreateAddressParams = {
  name: string;
  city : string;
  street : string;
  Latitude: number;
  Longitude: number;

}

export type createNewsParams = {
  title: string;
  description: string;
}






  