import Head from "next/head";
import PermissionButton from "@/components/permission/PermissionButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>roles-permission-nextjs</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold">HOME</h1>
        <PermissionButton permissionName="admin.view">
          <button>admin</button>
        </PermissionButton>
        <PermissionButton permissionName="users.view">
          <button>user</button>
        </PermissionButton>
      </div>
    </>
  );
}
