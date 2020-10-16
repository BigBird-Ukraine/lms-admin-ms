import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { IP, IPScheme, IPType } from '../../database/models';
import { IIP } from '../../interfaces';

class IpService {
  createIp(ip: IIP): Promise<void> {
    const newIp = new IP(ip);

    return newIp.save() as any;
  }

  getIpById(id: string): Promise<IIP> {
    const IpModel = model<IPType>(DatabaseTablesEnum.IP_COLLECTION_NAME, IPScheme);

    return IpModel.findById(id) as any;
  }

  getIps(): Promise<any> {
    const IpModel = model<IPType>(DatabaseTablesEnum.IP_COLLECTION_NAME, IPScheme);

    return IpModel.find() as any;
  }

  deleteIp(ip_id: string): Promise<void> {
    const IpModel = model<IPType>(DatabaseTablesEnum.IP_COLLECTION_NAME, IPScheme);

    return IpModel.findByIdAndDelete(ip_id) as any;
  }

  getIpByIp(ip: string): Promise<IIP> {
    const IpModel = model<IPType>(DatabaseTablesEnum.IP_COLLECTION_NAME, IPScheme);

    return IpModel.findOne({ip}) as any;
  }
}

export const ipService = new IpService();
