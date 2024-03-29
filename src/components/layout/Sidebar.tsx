import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import {
  TUser,
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

//
export const USER_ROLE = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};
const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  let sidebarItems;
  switch ((user as TUser)!.role) {
    case USER_ROLE.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, USER_ROLE.ADMIN);
      break;
    case USER_ROLE.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, USER_ROLE.FACULTY);
      break;
    case USER_ROLE.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, USER_ROLE.STUDENT);
      break;

    default:
      break;
  }
  return (
    <Sider
      style={{
        height: "100vh",
        position: "sticky",
        top: "0",
        left: "0",
      }}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Ph University</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        // admin sidebar items come from admin.routes.tsx
        // items={adminSidebarItems}
        //* now it's make a utils function
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
