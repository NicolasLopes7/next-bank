type AuthenticateProps = { email: string; password: string };
export type Authenticate = (data: AuthenticateProps) => Promise<void>;
type CreateAccountProps = AuthenticateProps & { name: string };
export type CreateAccount = (data: CreateAccountProps) => Promise<void>;

export type AuthContextType = {
  isAuthorized: boolean;
  authenticate: Authenticate;
  createAccount: CreateAccount;
};

export type AuthorizeProps = { acessToken: string; refreshToken: string };

export type LoginHTTPResponse = {
  acessToken: string;
  refreshToken: string;
};
export type CreateUserHTTPResponse = {
  acessToken: string;
  refreshToken: string;
};
