export interface ISignIn {
  name: string;
  contact: string;
  password: string;
}

export interface IChangePassword {
  password: string;
}


export interface IUserPatch {
  name: string;
  password: string;
  contact: string;
  departmentId: string;
}
export interface IUserResponse {
  id: string;
  name: string;
  password: string;
  contact: string;
  departmentId: string;
  salary: number;
}