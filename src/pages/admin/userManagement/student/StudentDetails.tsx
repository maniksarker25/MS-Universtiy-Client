import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();

  return <div>Student details : {studentId}</div>;
};

export default StudentDetails;
