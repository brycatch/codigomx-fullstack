export interface IUser {
  userId?: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday: Date;
  gender: number;
  isActive?: boolean;
}
