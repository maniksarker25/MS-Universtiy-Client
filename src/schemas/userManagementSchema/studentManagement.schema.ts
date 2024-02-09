import { z } from "zod";

const userNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message:
        "First name must start with an uppercase letter and contain only letters",
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Last name must contain only letters",
    }),
});

// Define a Zod schema for Guardian
const guardianSchema = z.object({
  fatherName: z
    .string({ required_error: "Father name is required" })
    .min(1)
    .trim(),
  fatherOccupation: z
    .string({ required_error: "Father occupation is required" })
    .min(1),
  fatherContactNo: z
    .string({ required_error: "Father contact no is required" })
    .min(1),
  motherName: z
    .string({ required_error: "Mother name is required" })
    .min(1)
    .trim(),
  motherOccupation: z
    .string({ required_error: "Mother occupation is required" })
    .min(1),
  motherContactNo: z
    .string({ required_error: "Mother contact no is required" })
    .min(1),
});

// Define a Zod schema for LocalGuardian
const localGuardianSchema = z.object({
  name: z.string({ required_error: " Name is required" }).min(1),
  occupation: z.string({ required_error: "Occupation is required" }).min(1),
  contactNo: z.string({ required_error: "Contact no is required" }).min(1),
  address: z.string({ required_error: "Address is required" }).min(1).trim(),
});

// Define a Zod schema for Student
export const studentSchema = z.object({
  name: userNameSchema,
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.coerce.date({ required_error: "Date of Birth is required" }),
  email: z.string({ required_error: "Email is required" }).email(),
  contactNo: z.string({ required_error: "Contact no is required" }),
  emergencyContactNo: z.string({
    required_error: "Emergency contact is required",
  }),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string({ required_error: "Present address is required" }),
  permanentAddress: z.string({
    required_error: "Permanent address is required",
  }),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  admissionSemester: z.string({
    required_error: "Admission Semester is required",
  }),
  academicDepartment: z.string({
    required_error: "Academic department is required",
  }),
  // profileImage: z.string().optional(),
});
