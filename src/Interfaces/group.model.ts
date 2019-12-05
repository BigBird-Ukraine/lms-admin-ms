export interface IGroup {
    _id?: string;
    label: string;
    created_at: string;
    updated_at: string;
    start_at: string;
    finish_at: string;
    users_list: [string];
    course_id: string;
}
