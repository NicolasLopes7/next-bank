type AuthenticateProps = { email: string; password: string };
export type Authenticate = (data: AuthenticateProps) => Promise<void>;
