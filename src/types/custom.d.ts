declare namespace Express {
  export interface Response {
    $scaffold?: {
      url?: string;
    };
  }
}
