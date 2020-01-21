import { IModule } from './module.model';

export interface ICourse {
  label: string;
  level?: number | string;
  description: string;
  modules_list: IModule[];
  created_at: string;
  updated_at?: string;
}

export interface ICourseSubject {
  label: string;
  level?: number | string;
  description: string;
  modules_list: string[];
  created_at: string;
  updated_at?: string;
}
