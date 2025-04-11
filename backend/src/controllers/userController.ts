import { Request } from "express";
import { IUserController } from "../interface/controllers/userController.interface";
import { ControllerResponse } from "../interface/controllers/userController.types";
import { IUserService } from "../interface/services/userService.interface";
import { CustomRequest } from "../middlewares/validators/jwt/authentication";
export class UserController implements IUserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  userSignup = async (httpRequest: Request): Promise<ControllerResponse> => {
    try {
      const { username, email, phone, password } =
        httpRequest.body;
      console.log('usercontroller' + username)
      console.log(username, email, phone, password)
      const user = await this.userService.userSignup({
        username,
        email,
        phone,
        password
      });
      const { accessToken, refreshToken } = user;

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: user,
        accessToken,
        refreshToken,
      };
    } catch (e: any) {
      console.log(e);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: e.statusCode || 500,
        body: {
          error: e.message,
        },
      };
    }
  };

  userLogin = async (httpRequest: Request): Promise<ControllerResponse> => {
    try {
      const { email, password } = httpRequest.body;

      const user = await this.userService.userLogin(email, password);
      const { accessToken, refreshToken } = user;

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: user,
        accessToken,
        refreshToken,
      };
    } catch (e: any) {
      console.log(e);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: e.statusCode || 500,
        body: {
          error: e.message,
        },
      };
    }
  };

}
