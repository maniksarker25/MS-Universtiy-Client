import { Button, Table, TableColumnsType } from "antd";

import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { TCourse } from "../../../types/courseManagement.type";

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
      render: () => {
        return <Button>Assign Faculty</Button>;
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

export default Courses;
