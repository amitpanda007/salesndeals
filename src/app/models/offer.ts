export interface Offer {
  id?: string;
  name: string;
  description: string;
  offerContent: string;
  startDate: any;
  endDate: any;
  city: string[];
  isVerified?: boolean;
  backgroundImage?: any;
  owners?: string[];
}

export interface CardOptions {
  isVerified?: boolean;
  isPreview?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
}