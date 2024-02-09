import { TReduxResponse } from "../../../types";
import { TRegisterSemester } from "../../../types/courseManagement.type";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRegisterSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["registeredSemester"],
    }),
    getAllRegisteredSemester: builder.query({
      query: () => {
        return {
          url: "/semester-registrations",
          method: "GET",
        };
      },
      transformResponse: (response: TReduxResponse<TRegisterSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["registeredSemester"],
    }),
    updateRegisteredSemester: builder.mutation({
      query: (args) => {
        return {
          url: `/semester-registrations/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["registeredSemester"],
    }),
    // createAcademicDepartment: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/academic-departments/create-academic-department",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    // }),
    // getAllAcademicDepartment: builder.query({
    //   query: () => {
    //     return {
    //       url: "/academic-departments",
    //       method: "GET",
    //     };
    //   },
    //   transformResponse: (response: TReduxResponse<TAcademicDepartment[]>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),
  }),
});

export const {
  useCreateRegisterSemesterMutation,
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredSemesterMutation,
} = courseManagementApi;
