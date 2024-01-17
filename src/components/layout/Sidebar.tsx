import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";

const Sidebar = () => {
  return (
    <Sider
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
        items={sidebarItemsGenerator(adminPaths, "admin")}
      />
    </Sider>
  );
};

export default Sidebar;
