// import { useEffect, useState } from "react";

// const PermissionButton = ({
//   permissionName,
//   children,
// }: {
//   permissionName: string,
//   children: any,
// }) => {
//   const permissions = AUTH.getUserPermissionList();
//   const permissionList = permissions ? JSON.parse(permissions) : null;
//   const [valid, setValid] = useState(false);
//   useEffect(() => {
//     if (permissionList) {
//       if (permissionList.includes(permissionName)) {
//         setValid(true);
//       } else {
//         setValid(false);
//       }
//     }
//   }, [permissions, permissionName]);
//   return valid ? children : null;
// };

// export default PermissionButton;

import React from "react";

const PermissionButton = () => {
  return <div>PermissionButton</div>;
};

export default PermissionButton;
