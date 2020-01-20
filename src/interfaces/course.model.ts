import {IModule} from './module.model';

export interface ICourse {
    _id?: string;
    label: string;
    level?: number | string;
    description: string;
    modules_list: IModule[];
    created_at: string;
    updated_at?: string;
}
