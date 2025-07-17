// /types/auth.ts

export type AuthUser = {
  id: string;
  nombre: string;
  email: string;
};

export type AuthStore = {
  user: AuthUser | null;
  token: string | null;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
};