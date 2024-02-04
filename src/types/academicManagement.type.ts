export type TAcademicSemester = {
  _id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicDepartment: string;
  academicFaculty: {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
