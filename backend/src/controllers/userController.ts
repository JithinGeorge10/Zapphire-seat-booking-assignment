import { Request } from "express";
import { IUserController } from "../interface/controllers/userController.interface";
import { ControllerResponse } from "../interface/controllers/userController.types";
import { IUserService } from "../interface/services/userService.interface";
import { CustomRequest } from "../middlewares/validators/jwt/authentication";
import { JwtBlackList } from "../models/jwtBlackList";
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../../src/utils/constants'; // adjust path
interface UserPayload extends JwtPayload {
  id: string;
  role?: string;
  user?: UserPayload;
}

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


  seatBook = async (req: CustomRequest): Promise<ControllerResponse> => {
    try {

      const user = req.user;
      const seatNumber = req.body;
      const bookedSeat = await this.userService.seatBook(user, seatNumber);


      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: bookedSeat
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



  bookedSeats = async (req: CustomRequest): Promise<ControllerResponse> => {
    try {

      const bookedSeat = await this.userService.bookedSeat();
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: bookedSeat
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

  resetBookings = async (req: CustomRequest): Promise<ControllerResponse> => {
    try {
      const userId = req.user?.id
      const cancelTicket = await this.userService.cancelTicket(userId);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: cancelTicket
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



  verifyJwt = async (req: Request) => {
    try {
      const token = req.cookies.refreshToken
      const verifyStatus = await this.userService.verifyJwt(token);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
         body: verifyStatus
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




