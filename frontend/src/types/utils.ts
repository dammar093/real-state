
export interface Meta {
  total: number;
  limit: number;
  pages: number;
  page: number;
}
export interface Params {
  page?: number;
  limit?: number;
  search?: string;
}