import { Lead } from './lead';

export interface EstimateItem {
  item_name: string;
  price: number;
  quantity: number;
}

export interface Estimate {
  _id: string;
  lead_id: Lead;
  items: EstimateItem[];
  status: string;
  createdAt: string;
}