import {GetAdvert} from "./get-advert";

export interface GetAdvertPaginated {
  totalCount: number,
  pageSize: number,
  currentPageNumber: number,
  data: GetAdvert[]
}
