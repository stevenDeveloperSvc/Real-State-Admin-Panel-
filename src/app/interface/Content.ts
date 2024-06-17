export interface User {
  success: boolean;
  message: string;
  imageLabel: string;
  imageTitle: string;
  userInfo: UserInfo;
}
export interface UserInfo {
  [key: string]: any;
  firstname: string;
  lastname: string;
  ocupation: string;
  ocupationId: Ocupation | number;
  description: string;
  image?: string | null;
  phone: string;
  email: string;
  username: string;
  imageLabel: string;
  imageTitle: string;
}

export interface OcupationResponse {
  response: { isSuccess: boolean; value: string };
  ocupations: Ocupation[];
}

export interface Ocupation {
  ocupationId: number;
  description: string;
}
export interface Password {
  Password: string;
  RepeatPassword: string;
  LastPasword: string;
}
export interface PropertyResponse {
  info: Info;
  data: Property[];
}

export interface Info {
  countItems: number;
  currentPage: number;
}

export interface Property {
  propertyId: number;
  title: string;
  status: string;
  type: string;
  category: string;
  price: number;
  agent: string;
  images: any[];
}
