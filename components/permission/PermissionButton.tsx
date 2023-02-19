import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const PermissionButton = ({
  permissionName,
  children,
}: {
  permissionName: string;
  children: any;
}) => {
  const getUserPermissions = () => {
    return Cookies.get("user_permissions");
  };

  const permissions = getUserPermissions();
  const permissionList = permissions ? JSON.parse(permissions) : null;
  const [valid, setValid] = useState(false);
  useEffect(() => {
    if (permissionList) {
      if (permissionList.includes(permissionName)) {
        setValid(true);
      } else {
        setValid(false);
      }
    }
  }, [permissionList, permissionName]);

  return valid ? children : null;
};

export default PermissionButton;
