export interface IAdminSignIn {
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IPatchApplication {
  applicationId: string;
  status: string;
}
