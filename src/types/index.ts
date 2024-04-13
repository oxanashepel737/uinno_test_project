export interface ISignIn {
  email: string;
  password: string;
}

export interface ITokenStructure {
  type: string;
  value: string;
  role: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface IPostPayload {
  title: string;
  content: string;
}

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserPayload {
  fullName: string;
  email: string;
  password?: string;
  role: string;
}
