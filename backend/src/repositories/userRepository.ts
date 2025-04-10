import { IUserRepository } from "../interface/repositories/userRepository.interface";
import {
    AddUserInput,
    AddUserOutput,
    GetUserOutput,
} from "../interface/repositories/userRepository.types";
import { UniqueConstraintError } from "sequelize";
import { User } from '../models/User';

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



}

