// export const adminPaths2 = [
//   {
//     name: "Dashboard",
//     path: "dashboard",
//     element: "ADMIN_DASHBOARD",
//   },
//   {
//     name: "User Management",
//     children: [
//       {
//         name: "Create Admin",
//         path: "create-admin",
//         element: "CREATE_ADMIN",
//       },
//       {
//         name: "Create Faculty",
//         path: "create-faculty",
//         element: "CREATE_FACULTY",
//       },
//       {
//         name: "Create Student",
//         path: "create-student",
//         element: "CREATE_STUDENT",
//       },
//     ],
//   },
// ];

// //! menuplate path for routes

// // const newArray = adminPaths2.reduce((acc, item) => {
// //   if (item.path && item.element) {
// //     acc.push({
// //       path: item.path,
// //       element: item.element,
// //     });
// //   }
// //   if (item.children) {
// //     item.children.forEach((child) => {
// //       acc.push({
// //         path: child.path,
// //         element: child.element,
// //       });
// //     });
// //   }
// //   return acc;
// // }, []);

// //! manuplate path for layout path -----------
// const newArray = adminPaths2.reduce((acc, item) => {
//   if (item.name && item.path) {
//     acc.push({
//       key: item.name,
//       label: `<NavLink to=${item.path}></NavLink>`,
//     });
//   }
//   if (item.children) {
//     acc.push({
//       key: item.name,
//       label: item.name,
//       children: item.children.map((child) => ({
//         key: child.name,
//         label: `<NavLink to=${child.path}></NavLink>`,
//       })),
//     });
//   }
//   return acc;
// }, []);
// console.log(JSON.stringify(newArray));

//! serializable object and non-serializable object ---------

//* serialize object
const obj = {
  name: "manik",
  role: "student",
  age: 18,
};

console.log(JSON.stringify(obj));

//* non-serialize object
const obj2 = {
  name: "manik",
  role: "student",
  age: 18,
  greet: () => {
    return "hello world";
  },
};

console.log(JSON.stringify(obj2));
