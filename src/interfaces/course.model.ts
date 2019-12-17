export interface ICourse {
    _id?: string;
    label: string;
    level?: number | string;
    description: string;
    modules_list: [string];
}
