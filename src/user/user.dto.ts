export interface ISignIn {
  email: string;
  password: string;
}

export interface IChangePassword {
  password: string;
}

export interface IUserPatch {
  name: string;
  password: string;
  contact: string;
}
export interface IUserResponse {
  id: string;
  name: string;
  password: string;
  contact: string;
  salary: number;
}
