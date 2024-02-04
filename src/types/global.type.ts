import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TApiError = {
  status: number;
  data: {
    success: boolean;
    errorDetails: object;
    message: string;
    errorMessage: string;
    stack: string;
  };
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TApiResponse<T> = {
  data?: T;
  error: TApiError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TReduxResponse<T> = TApiResponse<T> & BaseQueryApi;

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};
