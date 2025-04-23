import { UserPayload, UserSignupInput, UserSignupOutput } from "./userService.types";

export interface IUserService {
  [x: string]: any;
  cancelTicket(userId: string | undefined): unknown;
  bookedSeat(): unknown;
  seatBook( user: any,seatNumber: any | undefined): unknown;
  userSignup(userData: UserSignupInput): Promise<UserSignupOutput>;
  userLogin(email: string, password: string): Promise<UserSignupOutput>;
}
