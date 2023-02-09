import PermissionProvider from "@/components/permission/PermissionProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const PERMISSION_MAP = {
  admins: ["admin.view", "admin.edit"],
  "[admin_id": ["admin.view", "admin.edit", "admin.delete"],
  users: ["users.view", "users.edit", "users.delete"],
  "[user_id]": ["users.view", "users.update", "users.delete"],
  products: ["products.view", "products.delete"],
  "[product_id]": ["products.view", "products.delete", "products.edit"],
};

const USER_PERMISSION = ["admin.view"];
const PUBLIC_PATHNAMES = ["/"];

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PermissionProvider
      permissionRouteMap={PERMISSION_MAP}
      userPermissions={USER_PERMISSION}
      publicPathnames={PUBLIC_PATHNAMES}
    >
      <Component {...pageProps} />
    </PermissionProvider>
  );
}
