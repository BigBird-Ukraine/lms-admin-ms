export interface IIP {
    _id?: string;
    title: string;
    fullAddress: IAddress;
    ip: string;
    city: string;
}

export interface IAddress {
    address?: string;
    latitude: number;
    longitude: number;
}
