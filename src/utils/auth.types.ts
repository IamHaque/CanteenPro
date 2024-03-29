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
  error: ErrorResponse;
}

interface Transaction {
  quantity: number;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    userId: string;
  };
  product: {
    price: number;
    title: string;
    productId: string;
  };
}

interface TransactionApiResponse {
  data: {
    items: Transaction[];
    totalCount: number;
  };
  error: ErrorResponse;
}

interface AllPOTDData {
  quantity: number;
  product: AllProductData;
}

interface AllPOTDApiResponse {
  data: {
    items: AllPOTDData[];
    totalCount: number;
  };
  error: ErrorResponse;
}

interface AllUserApiResponse {
  data: {
    items: AllUserData[];
    totalCount: number;
  };
  error: ErrorResponse;
}
interface DeleteUserApiResponse {
  data: {
    item: AllUserData;
    deleted: boolean;
  };
  error: ErrorResponse;
}
interface UpdatedUserApiResponse {
  data: {
    item: AllUserData;
    updated: boolean;
  };
  error: ErrorResponse;
}

interface InsertedProductApiResponse {
  data: {
    item: AllProductData;
    added: boolean;
  };
  error: ErrorResponse;
}
interface BuyProductApiResponse {
  data: {
    balance: number;
    bought: boolean;
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
  AllPOTDApiResponse,
  BuyProductApiResponse,
  TransactionApiResponse,
  Transaction,
};
