export interface ILesson {
  _id?: string;
  number: string | number;
  label: string;
  description: string;
  video_path: string;
  tags: [string];
  module_id: string;
  questions_id?: [string];
  user_id?: string;
  last_valid_version: string;
}
