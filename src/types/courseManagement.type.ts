import { TAcademicSemester } from "./academicManagement.type";

export type TRegisterSemester = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

//
export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: PreRequisiteCourse[];
  isDeleted: boolean;
  __v: number;
};

export interface PreRequisiteCourse {
  course: Course;
  isDeleted: boolean;
  _id: string;
}

export interface Course {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: PreRequisiteCourse2[];
  isDeleted: boolean;
  __v: number;
}

export interface PreRequisiteCourse2 {
  course: string;
  isDeleted: boolean;
  _id: string;
}
