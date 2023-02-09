import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const PermissionProvider = ({
  children,
  permissionRouteMap,
  userPermissions,
  publicPathnames,
}: {
  children: ReactNode;
  permissionRouteMap: any;
  userPermissions: string[];
  publicPathnames: string[];
}) => {
  const router = useRouter();
  const { pathname } = router;
  const [hasRoutePermission, setHasRoutePermission] = useState(false);

  const setUserPermissionList = (value: string) => {
    Cookies.set("user_permissions", value, {
      expires: 1,
    });
  };

  // * getting the permision for this route
  const getRequiredPermissionForThisRoute = () => {
    const urlPathValues = pathname.replace("/", "").split("/");
    console.log({ pathname });

    const requiredPermissionForThisRoute = [];

    let permissionsOfThisRoute = permissionRouteMap;
    urlPathValues.forEach((urlPathValue) => {
      if (permissionsOfThisRoute[urlPathValue]) {
        permissionsOfThisRoute = permissionsOfThisRoute[urlPathValue];
      }
    });
    for (let i in permissionsOfThisRoute) {
      requiredPermissionForThisRoute.push(permissionsOfThisRoute[i]);
    }
    return requiredPermissionForThisRoute;
  };

  // * checking if the url contains ther required permisisons
  const checkRouteHasPermission = () => {
    const requiredPermissionForThisRoute = getRequiredPermissionForThisRoute();
    console.log({ requiredPermissionForThisRoute });
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

  // * checking public pathname
  const checkRouteIsPublic = () => {
    return publicPathnames.includes(pathname);
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
      const publicRoute = checkRouteIsPublic();
      if (routePermission || publicRoute) {
        setHasRoutePermission(true);
      }
    }
  }, [pathname]);

  return (
    <div>
      <p>Munna</p>
      {!hasRoutePermission ? <ForBiddenPage /> : children}
    </div>
  );
};

export default PermissionProvider;
