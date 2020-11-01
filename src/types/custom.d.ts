declare namespace Express {
  export interface Request {}

  export interface Response {
    $scaffold?: {
      url?: string;
    };
  }
}
