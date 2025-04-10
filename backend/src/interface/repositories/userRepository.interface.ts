import { AddUserInput, AddUserOuput, GetUserOutput ,GetuserProfileOutput,SuccessResponse,PostDatas, CommentDatas} from "./userRepository.types";

export interface IUserRepository {
  addUser(userData: AddUserInput): Promise<AddUserOuput>;
  getUserByEmail(email: string) : Promise<GetUserOutput>;
 
}
