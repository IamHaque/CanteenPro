interface LoginWithTokenApiResponseData {
  name: string;
  email: string;
  userId: string;
  cartId: string;
  balance: number;
  isAdmin: boolean;
}

interface LoginWithTokenApiResponse {
  data: LoginWithTokenApiResponseData;
}

export type { LoginWithTokenApiResponseData, LoginWithTokenApiResponse };
