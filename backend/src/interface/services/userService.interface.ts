import { UserPayload, UserSignupInput, UserSignupOutput } from "./userService.types";

export interface IUserService {
  seatBook( user: any,seatNumber: any | undefined): unknown;
  userSignup(userData: UserSignupInput): Promise<UserSignupOutput>;
  userLogin(email: string, password: string): Promise<UserSignupOutput>;
}
