import { Storage } from '@google-cloud/storage';
import * as path from 'path';

export const googleDeleter = async (fileName: string, projectId: string,
                                    bucketName: string, id: string) => {
  const serviceKey = path.join(process.cwd(), fileName);

  const gc = new Storage({
    keyFilename: serviceKey,
    projectId
  });

  const bucket = gc.bucket(bucketName);

  bucket.getFiles({prefix: id}, (err, files) => {
    if (files) {
      files.forEach(file => file.delete());
    }
  });
};
