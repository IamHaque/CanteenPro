type User = {
  isAdmin?: boolean;
  name?: string | undefined;
  email: string | undefined;
  userId?: string | undefined;
  cartId?: string | undefined;
  balance?: number | undefined;
  password?: string | undefined;
};

type AuthStateData = {
  user: User | null;
  isAuthenticated: boolean;
};

interface AuthState extends AuthStateData {
  logout: () => void;
  login: (userData: AuthStateData['user']) => void;
}

export type { User, AuthState, AuthStateData };
