import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { Button } from "antd";

const studentDummyData = {
  password: "student123",
  student: {
    name: {
      firstName: "Manik",
      middleName: "",
      lastName: "Sarker",
    },
    gender: "male",
    dateOfBirth: "1995-08-15T00:00:00.000Z",
    email: "student477@example.com",
    contactNo: "1234567890",
    emergencyContactNo: "9876543210",
    bloodGroup: "A+",
    presentAddress: "123 Main Street, City",
    permanentAddress: "456 Oak Avenue, Town",
    guardian: {
      fatherName: "Michael Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "555-1234",
      motherName: "Anna Doe",
      motherOccupation: "Doctor",
      motherContactNo: "555-5678",
    },
    localGuardian: {
      name: "Susan Johnson",
      occupation: "Teacher",
      contactNo: "555-9876",
      address: "789 Pine Road, Village",
    },
    admissionSemester: "65ba20a627bef55221364229",
    academicDepartment: "65ba1aa18a05588ffc6dfb22",
    isDeleted: false,
  },
};
const CreateStudent = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    //! This is for developement
    //! Only for checking
    console.log(Object.fromEntries(formData));
  };
  return (
    <div>
      <PhForm onSubmit={onSubmit}>
        <PhInput type="name" name="name" label="Name" />
        <Button htmlType="submit">Submit</Button>
      </PhForm>
    </div>
  );
};

export default CreateStudent;
