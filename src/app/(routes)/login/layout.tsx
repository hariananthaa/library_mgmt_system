import WithAuth from "@/app/common/with_auth";
import { ReactElement } from "react";

function Layout({ children }: { children: ReactElement }): ReactElement {
  return <WithAuth routeRole="auth">{children}</WithAuth>;
}

export default Layout;
