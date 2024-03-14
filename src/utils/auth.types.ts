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

interface ErrorResponse {
  code: number;
  message: string;
}

interface LoginWithTokenApiResponse {
  data: LoginApiResponseData;
  error: ErrorResponse;
}

interface LoginApiResponse {
  data: LoginApiResponseData;
  error: LoginApiResponseValidationError;
}

interface AllUserData {
  name: string;
  email: string;
  userId: string;
  balance: number;
}
interface AllProductData {
  price: number;
  title: string;
  category: string;
  quantity: number;
  productId: string;
  thumbnail: string;
  description: string;
}

interface AllProductApiResponse {
  data: {
    items: AllProductData[];
    totalCount: number;
  };
}

interface AllUserApiResponse {
  data: {
    items: AllUserData[];
    totalCount: number;
  };
}
interface DeleteUserApiResponse {
  data: {
    item: AllUserData;
    deleted: boolean;
  };
}
interface UpdatedUserApiResponse {
  data: {
    item: AllUserData;
    updated: boolean;
  };
}

interface InsertedProductApiResponse {
  data: {
    item: AllProductData;
    added: boolean;
  };
  error: ErrorResponse;
}

interface UpdatedProductApiResponse {
  data: {
    item: AllProductData;
    updated: boolean;
  };
  error: ErrorResponse;
}

interface DeletedProductApiResponse {
  data: {
    item: AllProductData;
    deleted: boolean;
  };
  error: ErrorResponse;
}

export type {
  LoginApiResponse,
  AllUserApiResponse,
  AllProductApiResponse,
  DeleteUserApiResponse,
  UpdatedUserApiResponse,
  LoginWithTokenApiResponse,
  InsertedProductApiResponse,
  UpdatedProductApiResponse,
  DeletedProductApiResponse,
};
