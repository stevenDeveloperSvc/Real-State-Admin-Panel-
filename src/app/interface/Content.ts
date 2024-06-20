export interface User {
  success: boolean;
  message: string;
  imageLabel: string;
  imageTitle: string;
  userInfo: UserInfo;
}
export interface PropertyBasicInfoEvent {
  title: string | null;
  type: Type | null;
  category: Category | null;
  status: Status | null;
  amenity: Amenity[] | null;
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

export type ApiResponse = {
  isSuccess: boolean;
  value: string;
}

export interface StatusResponse {
  response: ApiResponse;
  status: Status[];
}

export interface OcupationResponse {
  response: ApiResponse;
  ocupations: Ocupation[];
}

export interface AmenityResponse {
  response: ApiResponse;
  amenities: Amenity[];
}
export interface TypeReponse {
  response: ApiResponse;
  types: Type[];
}
export interface CategoryReponse {
  response: ApiResponse;
  categories: Category[];
}
export interface Category {
  id?: number;
  description?: string;
}
export interface Type {
  id?: number;
  description?: string;
}
export interface Amenity {
  id?: number;
  description?: string | null;
}
export interface Ocupation {
  ocupationId?: number | null;
  description?: string | null;
}
export interface Status {
  statusId: number;
  status: string;
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
