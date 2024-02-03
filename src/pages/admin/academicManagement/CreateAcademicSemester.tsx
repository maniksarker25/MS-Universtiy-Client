import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";

import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
const nameOptions = [
  { label: "Autumn", value: "01" },
  { label: "Summer", value: "02" },
  { label: "Fall", value: "03" },
];
const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data.name);
    const name = nameOptions[Number(data.name) - 1].label;

    const semesterData = {
      name: name,
      code: data.name,
    };
    console.log(semesterData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PhSelect label="Name" name="name" options={nameOptions} />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
