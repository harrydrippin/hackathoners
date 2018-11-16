export interface ApiListResponse {
  compare: string[],
  target: string[]
}

export interface ApiCrawlInfoResponse {
  timestamp: number;
  is_ongoing: boolean;
}