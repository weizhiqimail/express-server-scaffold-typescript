export interface INormalResponse {
  data?: any;
  profile?: {
    page?: number;
    pageSize?: number;
    total?: number;
  };
}

export interface IErrorResponse {
  method?: string;
  url?: string;
  status?: number;
  time?: string;
  error?: string;
}

// 第一个元素代表错误信息，英文描述
// 第二个元素代表错误信息，中文表述
// 第三个元素代表错误码，数字表述，如果不是 HTTP 错误，则可选
export type IResponseCodeItem = [string, string, number?];
