
export interface UserInfo {
    [key: string] : any;
    firstname : string;
    lastname: string;
    ocupation: string;
    ocupationId: number;
    description: string;
    imageurl: string;
    phone: string;
    email: string;
    username: string;
}

export interface OcupationResponse{
    response: { isSuccess : boolean, value: string; }
    ocupations:Ocupation[];
}
export interface Ocupation {
    ocupationId: number;
    description: string;
}
