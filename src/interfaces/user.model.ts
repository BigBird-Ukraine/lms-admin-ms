import { IGroupSubject } from './group.model';

export interface IUser {
  _id: string;
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  password: string;
  status_id: number;
  city: string;
  role_id: number;
  photo_path?: string;
  created_at: string;
  updated_at?: string;
  groups_id?: string[];
  passed_tests_id: [string];
}

export interface IUserSubject {
  _id: string;
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  city: string;
  status_id: number;
  role_id: number;
  photo_path?: string;
  created_at: string;
  updated_at?: string;
  groups_id: IGroupSubject[];
  passed_tests_id: [string];
}
