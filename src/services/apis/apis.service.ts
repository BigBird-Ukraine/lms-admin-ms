import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { API, ApiScheme, APIType } from '../../database/models';
import { IApi } from '../../interfaces';

class ApisService {
  createApi(api: IApi): Promise<void> {
    const newApi = new API(api);

    return newApi.save() as any;
  }

  getApiById(id: string): Promise<IApi> {
    const ApiModel = model<APIType>(DatabaseTablesEnum.API_COLLECTION_NAME, ApiScheme);

    return ApiModel.findById(id) as any;
  }

  getApis(): Promise<any> {
    const ApiModel = model<APIType>(DatabaseTablesEnum.API_COLLECTION_NAME, ApiScheme);

    return ApiModel.find() as any;
  }

  deleteApi(api_id: string): Promise<void> {
    const ApiModel = model<APIType>(DatabaseTablesEnum.API_COLLECTION_NAME, ApiScheme);

    return ApiModel.findByIdAndDelete(api_id) as any;
  }

  getApiByApi(api: string): Promise<IApi> {
    const ApiModel = model<APIType>(DatabaseTablesEnum.API_COLLECTION_NAME, ApiScheme);

    return ApiModel.findOne({
      api
    }) as any;
  }
}

export const apiService = new ApisService();
