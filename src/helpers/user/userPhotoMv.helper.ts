import { UploadedFile } from 'express-fileupload';
import * as fs from 'fs-extra';
import { resolve as resolvePath } from 'path';
import * as uuid from 'uuid';
import { IUser } from '../../interfaces';

export const userPhotoMv = async (registeredUser: IUser, userPhoto: UploadedFile, appRoot: any) => {
    const {_id} = registeredUser;
    const photoDir = `user/${_id}/photo`;
    const photoExtension = userPhoto.name.split('.').pop();
    const photoName = `${uuid.v1()}.${photoExtension}`;

    fs.mkdirSync(resolvePath(`${appRoot}/static/${photoDir}`), {recursive: true});
    await userPhoto.mv(resolvePath(`${appRoot}/static/${photoDir}/${photoName}`));

    return {photoDir, photoName, _id};
};
