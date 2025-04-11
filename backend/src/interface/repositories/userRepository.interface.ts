import { AddUserInput, AddUserOutput, GetUserOutput } from "./userRepository.types";

export interface IUserRepository {
  bookSeat(user: any, seatNumber: any): unknown;
  addUser(userData: AddUserInput): Promise<AddUserOutput>;  
  getUserByEmail(email: string) : Promise<GetUserOutput>;
}
