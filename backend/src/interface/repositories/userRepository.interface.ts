import { AddUserInput, AddUserOutput, GetUserOutput } from "./userRepository.types";

export interface IUserRepository {
  addUser(userData: AddUserInput): Promise<AddUserOutput>; 
}
