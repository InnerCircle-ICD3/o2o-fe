export interface Recommendation {
  value: string;
  field: string;
  storeId: number;
}

export interface SearchResult {
  suggestionList: Recommendation[];
}
