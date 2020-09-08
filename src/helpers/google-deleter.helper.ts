import { Storage } from '@google-cloud/storage';
import * as path from 'path';

export const googleDeleter = async (fileName: string, projectId: string,
                                    bucketName: string, video_path: string) => {
  const serviceKey = path.join(process.cwd(), fileName);
  const splitedFiles = video_path.split('/');
  const videoId = splitedFiles[splitedFiles.length - 1];

  const gc = new Storage({
    keyFilename: serviceKey,
    projectId
  });

  const bucket = gc.bucket(bucketName);

  bucket.getFiles({prefix: videoId}, (err, files) => {
    if (files) {
      files.forEach(file => file.delete());
    }
  });
};
