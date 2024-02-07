import { z } from "zod";
import { bloodGroup, gender } from "../../constant/userManagement";

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string(),
  lastName: z.string(),
});

export const createAdminValidationSchema = z.object({
  designation: z.string({ required_error: "Please enter designation" }),
  name: createUserNameValidationSchema,
  gender: z.enum([...gender] as [string, ...string[]]),
  dateOfBirth: z.date({ required_error: "Date of Birth is required" }),
  email: z.string().email(),
  contactNo: z.string({ required_error: "Contact No is required" }),
  emergencyContactNo: z.string({
    required_error: "Please enter emergency contact",
  }),
  bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]),
  presentAddress: z.string({
    required_error: "Please enter present address",
  }),
  permanentAddress: z.string({
    required_error: "Please enter permanent address",
  }),
});
