import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const PermissionProvider = ({
  children,
  permissionRouteMap,
  userPermissions,
  strictMode = false,
}: {
  children: ReactNode;
  permissionRouteMap: any;
  userPermissions: string[];
  strictMode?: boolean;
}) => {
  const router = useRouter();
  const { pathname } = router;
  const [hasRoutePermission, setHasRoutePermission] = useState(false);

  const setUserPermissionList = (value: string) => {
    Cookies.set("user_permissions", value, {
      expires: 1,
    });
  };

  const getUserPermissions = () => {
    return Cookies.get("user_permissions");
  };

  // * setting the user permisisons in cookie
  useEffect(() => {
    const permisisons = getUserPermissions();
    if (!permisisons) {
      console.warn("setting permisisons");
      const jsonData = JSON.stringify(userPermissions);
      setUserPermissionList(jsonData);
    }
  }, []);

  // * getting the permision for this route
  const getRequiredPermissionForThisRoute = () => {
    const urlPathValues = pathname.replace("/", "").split("/");
    console.log({ pathname });
    let gotAtleastOnePathInPermissionMap = false;
    const requiredPermissionForThisRoute = [];
    let permissionsOfThisRoute = permissionRouteMap;

    urlPathValues.forEach((urlPathValue) => {
      if (permissionsOfThisRoute[urlPathValue]) {
        gotAtleastOnePathInPermissionMap = true;
        permissionsOfThisRoute = permissionsOfThisRoute[urlPathValue];
      }
    });
    if (gotAtleastOnePathInPermissionMap) {
      for (let i in permissionsOfThisRoute) {
        requiredPermissionForThisRoute.push(permissionsOfThisRoute[i]);
      }
    }
    return requiredPermissionForThisRoute;
  };

  // * checking if the url contains ther required permisisons
  const checkRouteHasPermission = () => {
    const requiredPermissionForThisRoute = getRequiredPermissionForThisRoute();
    console.log({ requiredPermissionForThisRoute });
    if (pathname == "/") {
      return true;
    }
    if (requiredPermissionForThisRoute.length == 0 && !strictMode) {
      return true;
    }
    if (userPermissions) {
      if (
        userPermissions.some((group) =>
          requiredPermissionForThisRoute.includes(group)
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const ForBiddenPage = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold">403</h1>
        <h2 className="text-3xl font-bold">Forbidden</h2>
        <h3>Access to this resource on this page is denied</h3>
      </div>
    );
  };

  useEffect(() => {
    if (pathname !== "/404") {
      const routePermission = checkRouteHasPermission();
      console.log({ routePermission });
      if (routePermission) {
        setHasRoutePermission(true);
      }
    }
  }, [pathname]);

  return <div>{!hasRoutePermission ? <ForBiddenPage /> : children}</div>;
};

export default PermissionProvider;
