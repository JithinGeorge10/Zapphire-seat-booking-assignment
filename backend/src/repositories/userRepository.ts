import { IUserRepository } from "../interface/repositories/userRepository.interface";
import { Op } from 'sequelize';
import {
    AddUserInput,
    AddUserOutput,
    GetUserOutput,
} from "../interface/repositories/userRepository.types";
import { UniqueConstraintError } from "sequelize";
import { User } from '../models/User';
import { Seat } from "../models/Seats";
import { UserPayload } from "../interface/services/userService.types";
import jwt from 'jsonwebtoken'
import { JwtBlackList } from "../models/jwtBlackList";
import {JWT_SECRET} from '../utils/constants'

export class UserRepository implements IUserRepository {
    addUser = async (userData: AddUserInput): Promise<AddUserOutput> => {
        try {
            console.log('reached respository')
            const user = await User.create({
                username: userData.username,
                email: userData.email,
                phone: userData.phone,
                password: userData.password,
            });
            console.log('repo user details' + user)
            return {
                _id: user.id.toString(),
                username: user.username,
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        } catch (error: any) {
            console.error("Error adding user:", error);

            if (error instanceof UniqueConstraintError) {
                const field = error.errors[0].path;
                const value = error.errors[0].value;
                throw new Error(`${field} '${value}' already exists.`);
            }

            throw new Error(error.message || "Something went wrong while adding user.");
        }
    };

    getUserByEmail = async (email: string): Promise<GetUserOutput> => {
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) throw new Error("User not found");

            return {
                _id: user.id.toString(),
                username: user.username,
                email: user.email,
                phone: user.phone,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        } catch (error: any) {
            console.error("Error retrieving user by email:", error);
            throw new Error(error.message || "Something went wrong while retrieving user.");
        }
    };

    bookSeat = async (userId: UserPayload, seatNumber: any) => {
        try {
            const bookings = seatNumber.map((seatNumber: any) => ({
                seatNumber,
                bookedBy: userId,
            }));

            await Seat.bulkCreate(bookings);

            return { success: true, message: 'Seats booked successfully' };
        } catch (error) {
            console.log(error);
        }
    }


    bookedSeat = async () => {
        try {
            const seats = await Seat.findAll({
                attributes: ['seatNumber']
            });

            const seatNumbers = seats.map(seat => seat.seatNumber);
            console.log(seatNumbers);
            return seatNumbers;
        } catch (error) {
            console.log('Error fetching seats:', error);
        }
    };



    cancelSeat = async (userId: any) => {
        try {
            const seats = await Seat.findAll({
                where: { bookedBy: userId },
                attributes: ['seatNumber']
            });

            const seatNumbers = seats.map(seat => seat.seatNumber);

            // Delete all seats booked by this user
            await Seat.destroy({
                where: { bookedBy: userId }
            });

            return seatNumbers; // returning the cancelled seat numbers

        } catch (error) {
            console.log(error);
        }
    }



     verifyJwt = async (token: any) => {
        try {
            if (!token) {
                return 'you are not authenticated';
            }
    
            const isBlackListed = await JwtBlackList.findOne({ where: { token: token } });
            if (isBlackListed) {
                return 'Token is not valid';
            }
    
            return new Promise((resolve, reject) => {
                jwt.verify(token, JWT_SECRET(), (err:any, payload:any) => {
                    if (err) {
                        resolve('token is not valid');
                    } else {
                        resolve({ success: 'true' });
                    }
                });
            });
    
        } catch (error) {
            console.log(error);
            return 'Something went wrong';
        }
    };
    
}
