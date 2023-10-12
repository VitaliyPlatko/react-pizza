export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESK = 'price',
  PRICE_ASK = '-price',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
}

export interface FilterSliceState {
  serchValue: String;
  categoryID: number;
  sort: Sort;
  currentPage: number,
}