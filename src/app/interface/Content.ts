export interface User{
    success:boolean;
    message:string;
    imageLabel: string;
    imageTitle:string;
    userInfo: UserInfo;
}
 export interface UserInfo {
    [key: string] : any;
    firstname : string;
    lastname: string;
    ocupation: string;
    ocupationId: number;
    description: string;
    image: string;
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
