export interface IUser {
    _id?: string;
    name: string;
    surname: string;
    phone_number: string;
    email: string;
    password: string;
    status: string | number;
    role: string | number;
    photo_path: string;
    created_at: string;
    updated_at?: string;
    group_id: string;
    passed_tests_id: [string];
}
