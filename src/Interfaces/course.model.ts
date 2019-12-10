export interface ICourse {
    _id?: string;
    label: string;
    level: number;
    description: string;
    modules_list: [string];
}
