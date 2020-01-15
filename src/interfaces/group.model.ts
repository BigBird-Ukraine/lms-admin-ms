import { ICourse } from './course.model';
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
}

export interface IGroupSubject {
    _id: string;
    label: string;
    course: ICourse;
    city: string;
    started_at: string;
    finished_at: string;
    users_list: IUserSubject[];
    created_at: string;
    updated_at: string;
}
