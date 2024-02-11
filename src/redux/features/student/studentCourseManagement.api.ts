import { TQueryParams, TReduxResponse } from "../../../types";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TReduxResponse<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (passInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        body: passInfo,
      }),
    }),
  }),
});

export const { useGetMyAllOfferedCoursesQuery } = studentCourseApi;
