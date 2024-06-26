export interface User {
  success: boolean;
  message: string;
  imageLabel: string;
  imageTitle: string;
  userInfo: UserInfo;
}
export interface PropertyBasicInfoEvent {
  title: string | null;
  price: number;
  location: Location | null;
  type: Type | null;
  category: Category | null;
  status: Status | null;
  amenity: Amenity[] | null;
}
export interface PropertyShortDescriptionEvent {
  ShortDescription : string  | null;
}
export interface PropertyShortDescription{
  shortDescription : string;
}
export interface PropertyDescription{
  Description: string;
}
export interface PropertyDescriptionEvent {
  Description : string;
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
export interface iImage {
  id?: number;
  alt: string;
  url: string;
  description: string;
}

export interface AmenityResponse {
  response: ApiResponse;
  amenities: Amenity[];
}
export interface TypeReponse {
  response: ApiResponse;
  types: Type[];
  countItems?: number;
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

export interface Property {
  propertyId: number;
  title: string;
  status: string;
  type: string;
  category: string;
  location: string;
  price: number;
  agent: string;
}

export interface Info {
  countItems: number;
  currentPage: number;
}

export interface LocationResponse {
  response: Response
  locations: Location[]
}

export interface Response {
  isSuccess: boolean
  value: string
}

export interface Location {
  id: number
  description: string
}


export interface PropertyResponseInfo {
  apiResponse: ApiResponse
  responseDTO: ResponseDto
}

export interface ResponseDto {
  propertyId: number
  title: string
  status: Status
  description: string
  publishDate: string
  address: any
  type: Type
  category: Category
  location: Location;
  shortDescription: string;
  price: number
  agent: Agent
  images: ResImage[];
  ameneties: Amenety[]
  comments: any[]
  commentsCount: number
}
export interface ResImage{
  label:string;
  value: ResponseImage;
}
export interface ResponseImage{
  Title:string;
  Images:string;
  Description:string;
}
export interface Status {
  statusId: number
  status: string
}

export interface Agent {
  info: any
  fullName: string
  image: string
  ocupation: string
}

export interface Amenety {
  id: number
  description: string
}

export interface  PropertyBasic{
location: any;
Price: any;
 title: string | null;
 type: Type | null;
 category: Category | null;
 status: Status | null;
 amenity: Amenity[] | null | any;
} 

export interface ImageInfo {
  Title: string;
  Description: string;
  Image: File;
}

export interface PropertyDTO {
  PropertyId: number;
  Title?: string;
  Money: number;
  ShortDescription?: string;
  Description?: string;
  IsInOffer: number;
  TypeId: number;
  StatusId: number;
  CategoryId: number;
  AmenityIds?: string;
  Images?: ImageInfo[];
}