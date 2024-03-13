interface LoginApiResponseData {
  name: string;
  email: string;
  token: string;
  userId: string;
  cartId: string;
  balance: number;
  isAdmin: boolean;
}

interface LoginApiResponseError {
  name: string;
  email: string;
  balance: string;
  password: string;
  password2: string;
}

interface LoginApiResponseValidationError {
  message: string;
  validationErrors: LoginApiResponseError;
}

interface LoginWithTokenApiResponse {
  data: LoginApiResponseData;
}

interface LoginApiResponse {
  data: LoginApiResponseData;
  error: LoginApiResponseValidationError;
}

export type { LoginApiResponse, LoginWithTokenApiResponse };
