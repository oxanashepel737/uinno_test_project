export type SignInStructure = {
  email: string;
  password: string;
};

export type TokenStructure = {
  type: string;
  value: string;
  role: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  userId: number;
  created_at: string;
  updated_at: string;
};

export type PostPayload = {
  title: string;
  content: string;
};

export type User = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type UserPayload = {
  fullName: string;
  email: string;
  password?: string;
  role: string;
};
