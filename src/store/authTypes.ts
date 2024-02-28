type User = {
  isAdmin?: boolean;
  email: string | undefined;
  password: string | undefined;
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
