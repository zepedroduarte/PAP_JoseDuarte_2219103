import {AllUserFavouriteAdverts} from "./allUserFavouriteAdverts";

export interface AllUserFavouriteAdvertsPaginated{
  totalCount: number,
  pageSize: number,
  currentPageNumber: number,
  data: AllUserFavouriteAdverts[];
}
