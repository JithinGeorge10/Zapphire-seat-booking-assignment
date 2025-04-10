export type AddUserInput = {
  username: string;
  email: string;
  phone: string;
  password: string;
};

export type AddUserOutput = {
  readonly _id: string;
  readonly username: string;
  readonly email: string;
  readonly phone: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type GetUserOutput = {
  readonly _id: string;
  readonly username: string;
  readonly email: string;
  readonly phone: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};


export type GetuserProfileOutput = {
  readonly _id: string;
  readonly username: string;
  readonly email: string;
  readonly phone: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};


export type SuccessResponse ={
  status: string;       
  message: string;      
               
  }
