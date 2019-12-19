export interface IModule {
    _id?: string;
    label: string;
    description?: string;
    tags?: [string];
    courses_id: [string];
    lessons: [string];
}
