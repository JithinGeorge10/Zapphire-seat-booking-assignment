import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT ;

export const PG_URI = () => {
  if (!process.env.PG_URI) throw new Error("PG URI not found in env");
  return String(process.env.PG_URI);
};

export const BCRYPT_SALT = () => {
  if (!process.env.BCRYPT_SALT) throw new Error("Bcrypt salt not found in env");
  return Number(process.env.BCRYPT_SALT);
};

export const FRONTEND_URL = () => {
  if (!process.env.FRONTEND_URL) return null;
  return String(process.env.FRONTEND_URL);
};

export const JWT_SECRET = () => {
  if (!process.env.JWT_SECRET) throw new Error("JWT secret not found in env");
  return String(process.env.JWT_SECRET);
};

export const DB_NAME = () => {
  if (!process.env.DB_NAME) throw new Error("DB_NAME not found in env");
  return String(process.env.DB_NAME);
};

export const DB_USER = () => {
  if (!process.env.DB_USER) throw new Error("DB_USER not found in env");
  return String(process.env.DB_USER);
};

export const DB_PASSWORD = () => {
  if (!process.env.DB_PASSWORD) throw new Error("DB_PASSWORD not found in env");
  return String(process.env.DB_PASSWORD);
};

export const DB_HOST = () => {
  if (!process.env.DB_HOST) throw new Error("DB_HOST not found in env");
  return String(process.env.DB_HOST);
};


export const DB_PORT = () => {
  if (!process.env.DB_PORT) throw new Error("DB_PORT not found in env");
  return String(process.env.DB_PORT);
};

