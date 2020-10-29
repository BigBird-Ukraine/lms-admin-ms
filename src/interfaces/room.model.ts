import { IGroup , IIP } from './../interfaces';

export interface IRoom {
  _id: string;
  label: string;
  description: string;
  count_all_places: number;
  free_places: number;
  start_at: Date;
  close_at: Date;
  city: string;
  groups: Array<Partial<IGroup>>;
  booked_users: IBookUser[];
  owner_id: string;
  created_at: Date;
  ip_address: string | IIP;
}

export interface IBookUser {
  _id?: string;
  user_id?: string;
  table_number: number;
  rent_start: string;
  rent_end: string;
  confirm_status: number;
  cron_job_touched?: number;
}

export interface ISettingRoom {
  label: string;
  start_at: ITime;
  close_at: ITime;
  count_places: number;
  cities: string[];
}

export interface ITime {
  hour: number;
  minute: number;
  second: number;
}

export interface ICutRoom {
  _id: string;
  label: string;
  description: string;
  start_at: Date;
  close_at: Date;
  city: string;
  count_all_places: number;
  countBookedPlaces?: number;
  numbersPlaces?: number[];
  idPlaces?: number[];
}
