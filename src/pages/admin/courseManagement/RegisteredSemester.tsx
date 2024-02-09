import { Button, Table, TableColumnsType } from "antd";

import { useGetAllRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import { TRegisterSemester } from "../../../types/courseManagement.type";
// import { TQueryParams } from "../../../types";
// import { useState } from "react";

export type TTableData = Pick<TRegisterSemester, "startDate" | "endDate">;

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
  },
  {
    title: "Action",
    key: "x",
    render: () => {
      return (
        <div>
          <Button>Update</Button>
        </div>
      );
    },
  },
];

const RegisteredSemester = () => {
  //   const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const { data: registeredSemesterData, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);
  // console.log(semesterData);
  const tableData = registeredSemesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester.name}-${academicSemester.year}`,
      startDate,
      endDate,
    })
  );

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

export default RegisteredSemester;
