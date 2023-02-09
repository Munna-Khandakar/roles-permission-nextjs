import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { pathname } = router;

  console.log(pathname);
  return (
    <div>
      <p>Munna</p>
      {children}
    </div>
  );
};

export default PermissionProvider;
