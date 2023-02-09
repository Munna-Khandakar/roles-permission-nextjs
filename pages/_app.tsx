import PermissionProvider from "@/components/permission/PermissionProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PermissionProvider>
      <Component {...pageProps} />
    </PermissionProvider>
  );
}
