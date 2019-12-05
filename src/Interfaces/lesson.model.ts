export interface ILesson {
    number: string | number;
    label: string;
    description: string;
    video_path: string;
    tags: [string];
    module_id: string;
    tests: [string];
}
