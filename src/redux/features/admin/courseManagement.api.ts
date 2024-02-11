import { TReduxResponse } from "../../../types";
import {
  TCourse,
  TRegisterSemester,
} from "../../../types/courseManagement.type";
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
    createCourse: builder.mutation({
      query: (data) => {
        return {
          url: "/courses/create-course",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["course"],
    }),
    getAllCourses: builder.query({
      query: () => {
        return {
          url: "/courses",
          method: "GET",
        };
      },
      transformResponse: (response: TReduxResponse<TCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["course"],
    }),
    assignFaculty: builder.mutation({
      query: (args) => {
        return {
          url: `/courses/${args.courseId}/assign-faculties`,
          method: "PUT",
          body: args.data,
        };
      },
      invalidatesTags: ["course"],
    }),
    getCourseFaculties: builder.query({
      query: (courseId) => {
        return {
          url: `/courses/${courseId}/get-faculties`,
          method: "GET",
        };
      },
      // transformResponse: (response: TReduxResponse<TCourse[]>) => {
      //   return {
      //     data: response.data,
      //     meta: response.meta,
      //   };
      // },
      providesTags: ["course"],
    }),
    createOfferedCourse: builder.mutation({
      query: (data) => {
        return {
          url: "/offered-courses",
          method: "POST",
          body: data,
        };
      },
    }),
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
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useAssignFacultyMutation,
  useGetCourseFacultiesQuery,
  useCreateOfferedCourseMutation,
} = courseManagementApi;
