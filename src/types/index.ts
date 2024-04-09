export interface ISignIn {
  email: string;
  password: string;
}

export interface ITokenStructure {
  type: string;
  value: string;
  role: string;
}
