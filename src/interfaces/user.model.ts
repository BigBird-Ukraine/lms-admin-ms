import { IGroupSubject } from './group.model';
import { ITestResultFullModel, ITestResultModel } from './test_result.model';

export interface IUser {
  _id: string;
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  password: string;
  status_id: number;
  population_point: string;
  role_id: number;
  photo_path?: string;
  created_at: string;
  updated_at?: string;
  groups_id?: string[];
  passed_tests?: [ITestResultModel];
  confirm_token?: string;
  reset_token?: string;
}

export interface IUserSubject {
  _id: string;
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  population_point: string;
  status_id: number;
  role_id: number;
  photo_path?: string;
  created_at: string;
  updated_at?: string;
  groups_id: IGroupSubject[];
  passed_tests?: [ITestResultModel];
  confirm_token?: string;
  reset_token?: string;
}

export interface IFullUserTest {
  _id: string;
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  password: string;
  status_id: number;
  role_id: number;
  population_point: string;
  photo_path?: string;
  created_at: string;
  updated_at?: string;
  groups_id?: [string];
  passed_tests?: [ITestResultFullModel];
  confirm_token?: string;
  reset_token?: string;
}
