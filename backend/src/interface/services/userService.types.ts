export type UserSignupInput = {
  username: string;
  email: string;
  phone: string;
  password: string;
};

export type UserSignupOutput = {
  readonly _id: string;
  readonly username: string;
  readonly email: string;
  readonly phone: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly accessToken: string;
  readonly refreshToken: string;
};

