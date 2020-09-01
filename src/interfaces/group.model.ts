import { IUserSubject } from './user.model';

export interface IGroup {
  _id: string;
  label: string;
  course_id: string;
  city: string;
  started_at: string;
  finished_at: string;
  users_list: string[];
  created_at: string;
  updated_at: string;
  attendance?: IAttendance[];
}

export interface IGroupSubject {
  _id: string;
  label: string;
  course_id: string;
  city: string;
  started_at: string;
  finished_at: string;
  users_list: IUserSubject[];
  attendance: IAttendance[];
  created_at: string;
  updated_at: string;
}

export interface IAttendance {
  _id?: string;
  date: string;
  present_students_id: string[];
  absent_students_id: string[];
}
