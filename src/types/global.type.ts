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

export type TApiResponse = {
  data?: any;
  error: TApiError;
};
