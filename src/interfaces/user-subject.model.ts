export interface IUserSubjectModel {
    _id: string;
    name: string;
    surname: string;
    role_id: number;
    status_id: number;
    email?: string;
    photo_path?: string;
    groups_id?: [string];
}
