export interface ApiListResponse {
  result: number,
  compare: string[],
  target: string[]
}

export interface ApiCrawlInfoResponse {
  timestamp: number;
  is_ongoing: boolean;
}

export interface Report {
  name: string,
  url: string,
  commits: number,
  alive_branch_count: number,
  license: string | boolean | undefined,
  languages: [
      {
          name: string,
          percent: number
      }
  ],
  alive_branches: string[],
  issue_open: string,
  issue_closed: string,
  pr_open: string,
  pr_closed: string,
  contributors: any,
  contributors_count: number,
  commit_graph: {
      total: number[],
      week: number[]
  }
}