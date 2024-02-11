import { Button, Modal, Table, TableColumnsType } from "antd";

import {
  useAssignFacultyMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TCourse } from "../../../types/courseManagement.type";
import { useState } from "react";
import PhForm from "../../../components/form/PhForm";
import PhSelect from "../../../components/form/PhSelect";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/userManagement.api";
import { TApiResponse } from "../../../types";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";

// import { TQueryParams } from "../../../types";
// import { useState } from "react";

export type TTableData = Pick<TCourse, "title" | "code" | "credits">;

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, code, credits }) => ({
    key: _id,
    title,
    code,
    credits,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Credits",
      dataIndex: "credits",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AssignFacultyModal facultyInfo={item} />;
      },
    },
  ];

  //   const onChange: TableProps<TTableData>["onChange"] = (
  //     _pagination,
  //     filters,
  //     _sorter,
  //     extra
  //   ) => {
  //     if (extra.action === "filter") {
  //       const queryParams: TQueryParams[] = [];
  //       filters?.name?.forEach((item) =>
  //         queryParams.push({ name: "name", value: item })
  //       );
  //       filters?.year?.forEach((item) =>
  //         queryParams.push({ name: "year", value: item })
  //       );
  //       setParams(queryParams);
  //     }
  //   };

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
      />
    </div>
  );
};

const AssignFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignFaculties] = useAssignFacultyMutation();
  const { data: faculties } = useGetAllFacultyQuery(undefined);

  // console.log(faculties);
  const facultyOptions = faculties?.data?.map((item: any) => ({
    label: item?.fullName,
    value: item?._id,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Assigning...");
    const facultyData = {
      courseId: facultyInfo.key,
      data: data,
    };
    try {
      const res = (await assignFaculties(facultyData)) as TApiResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculties assigned successfully", { id: toastId });
        handleCancel();
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PhForm onSubmit={handleSubmit}>
          <PhSelect
            name="faculties"
            options={facultyOptions}
            label="Faculties"
            mode="multiple"
          />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Modal>
    </>
  );
};

export default Courses;
