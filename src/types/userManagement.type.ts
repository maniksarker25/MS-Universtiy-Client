import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.type";

export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: "student" | "faculty" | "admin" | "superAdmin";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  _id: string;
  id: string;
  user: TUser;
  name: string;
  gender: "male" | "female" | "other";
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  profileImage?: string;
  isDeleted: boolean;
  fullName: string;
};
