import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";

import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { semesterStatusOptions } from "../../../constant/semester";

import { toast } from "sonner";

import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PhDatePicker from "../../../components/form/PhDatePicker";
import PhInput from "../../../components/form/PhInput";
import { useCreateRegisterSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TApiResponse } from "../../../types";

const SemesterRegistration = () => {
  const [createRegisterSemester] = useCreateRegisterSemesterMutation();
  const { data: academicSemesterData } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);
  const academicSemesterOptions = academicSemesterData?.data?.map((item) => ({
    label: `${item.name} - ${item.year}`,
    value: item._id,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    console.log(semesterData);
    try {
      const res = (await createRegisterSemester(
        semesterData
      )) as TApiResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester registered successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PhSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PhSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          />
          <PhDatePicker name="startDate" label="Start Date" />
          <PhDatePicker name="endDate" label="End Date" />
          <PhInput name="minCredit" label="Min Credit" type="text" />
          <PhInput name="maxCredit" label="Max Credit" type="text" />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
