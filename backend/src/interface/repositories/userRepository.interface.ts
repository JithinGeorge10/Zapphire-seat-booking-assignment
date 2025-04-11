import { AddUserInput, AddUserOutput, GetUserOutput } from "./userRepository.types";

export interface IUserRepository {
  addUser(userData: AddUserInput): Promise<AddUserOutput>;  
  getUserByEmail(email: string) : Promise<GetUserOutput>;
}
