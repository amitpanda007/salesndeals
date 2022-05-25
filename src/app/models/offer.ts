export interface Offer {
  name: string;
  description: string;
  offerContent: string;
  startDate: any;
  endDate: any;
  city: string;
  isVerified?: boolean;
  backgroundImage?: string;
}