import { Storage } from '@google-cloud/storage';

import { UploadedFile } from 'express-fileupload';
import * as path from 'path';
import { format } from 'util';
import { v4 as uuidv4 } from 'uuid';

export const googleUploader = async (files: UploadedFile, fileName: string,
                                     projectId: string, bucketName: string) => {
  const serviceKey = path.join(process.cwd(), fileName);
  const id = uuidv4();

  const gc = new Storage({
    keyFilename: serviceKey,
    projectId
  });

  const bucket = gc.bucket(bucketName);

  const blob = bucket.file(id.replace(/ /g, '_'));
  const blobStream = blob.createWriteStream({
    resumable: false
  });

  const url = `https://storage.googleapis.com/${bucket.name}/${id}`;

  await blobStream.on('finish', () => {
    return format(url);
  }).on('error', () => {
    return `Something went wrong`;
  })
    .end(files.data);

  return url;
};
