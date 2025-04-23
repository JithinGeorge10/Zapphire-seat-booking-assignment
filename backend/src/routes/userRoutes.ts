import { Router, Request, Response } from "express";
import { JwtBlackList } from "../models/jwtBlackList";
import { expressCallback } from "../utils/expressCallback";
import { UserController } from "../controllers/userController";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { signupValidator } from "../middlewares/validators/signupValidators";
import { loginValidator } from "../middlewares/validators/loginValidator";
import authMiddleware from "../middlewares/validators/jwt/authentication";

const router = Router();

const repository = new UserRepository();

const service = new UserService(repository);

const controller = new UserController(service);

router
  .route("/signup")
  .post(signupValidator, expressCallback(controller.userSignup));

router
  .route("/login")
  .post(loginValidator, expressCallback(controller.userLogin));

router
  .route("/seatBook")
  .post(authMiddleware, expressCallback(controller.seatBook));

router
  .route("/bookedSeats")
  .get(authMiddleware, expressCallback(controller.bookedSeats));

router
  .route("/resetBookings")
  .post(authMiddleware, expressCallback(controller.resetBookings));

  router
  .route("/verify-jwt")
  .post(expressCallback(controller.verifyJwt));


router.route("/logout").post(async(req: Request, res: Response) => {
  console.log(req.cookies.accessToken)
  const token = req.cookies.accessToken;

  if(token){
    await JwtBlackList.create({ token });
    res.clearCookie("accessToken", {

    });
  
    res.clearCookie("refreshToken", {
  
    });
    res.status(200).json({ message: "Logged out successfully" });
  }

});



export default router;
