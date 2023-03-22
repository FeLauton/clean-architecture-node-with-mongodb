export interface Authentication {
  auth(authentication: AuthenticationParams): Promise<string>;
}

export interface AuthenticationParams {
  email: string;
  password: string;
}
