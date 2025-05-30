import { IUserRepository } from "../interface/repositories/userRepository.interface";
import { IUserService } from "../interface/services/userService.interface";
import {
    UserPayload,
    UserSignupInput,
    UserSignupOutput,
} from "../interface/services/userService.types";

import { comparePassword, encryptPassword } from "../utils/encryption";
import { AppError } from "../utils/errors";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/generateJWT";

export class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    userSignup = async (userData: UserSignupInput): Promise<UserSignupOutput> => {
        try {
            console.log('reached user service')
            const encryptedPassword = encryptPassword(userData.password);

            const user = await this.userRepository.addUser({
                ...userData,
                password: encryptedPassword,
            });

            const accessToken = generateAccessToken(user._id, "user");
            const refreshToken = generateRefreshToken(user._id, "user");

            return { ...user, accessToken, refreshToken };
        } catch (error: any) {
            console.log("Error in user service", error.message);
            throw new Error(error.message);
        }
    };

    userLogin = async (
        email: string,
        password: string
    ): Promise<UserSignupOutput> => {
        try {
            const user = await this.userRepository.getUserByEmail(email);

            const isValidPassword = comparePassword(password, user.password);
            if (!isValidPassword) throw new AppError("Invalid Credentials", 401);

            const accessToken = generateAccessToken(user._id, "user");
            const refreshToken = generateRefreshToken(user._id, "user");

            return {
                _id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                accessToken,
                refreshToken,
            };
        } catch (error: any) {
            console.log("Error in user service", error.message);
            throw new Error(error.message);
        }
    };

    seatBook = async (user: UserPayload, seatNumber: any) => {
        try {

            const seat = await this.userRepository.bookSeat(user.id, seatNumber);
            return { seat }
        } catch (error: any) {
            console.log("Error in user service", error.message);
            throw new Error(error.message);
        }
    };

    bookedSeat = async () => {
        try {

            const seat = await this.userRepository.bookedSeat();
            return { seat }
        } catch (error: any) {
            console.log("Error in user service", error.message);
            throw new Error(error.message);
        }
    };

    cancelTicket = async (userId: any) => {
        try {
            const seat = await this.userRepository.cancelSeat(userId);
            return { seat }
        } catch (error: any) {
            console.log("Error in user service", error.message);
            throw new Error(error.message);
        }
    };

    verifyJwt = async (token: any) => {
        try {
            const seat = await this.userRepository.verifyJwt(token);
            return { seat }
        } catch (error: any) {
            console.log("Error in user service", error.message);
            throw new Error(error.message);
        }
    };

}
