import { Order } from "./Order";

export interface QueryOptions {
  afterCursor?: string;
  beforeCursor?: string;
  limit?: number;
  order?: Order;
}
