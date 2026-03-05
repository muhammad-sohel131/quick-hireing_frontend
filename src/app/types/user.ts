export enum Role {
    ADMIN = 'admin',
    SUPER_ADMIN = 'super_admin',
} 

export interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}