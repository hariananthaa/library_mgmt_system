import WithAuth from "@/app/common/withAuth";
import { ReactElement } from "react";

function Layout({ children }: { children: ReactElement }): ReactElement {
  return <WithAuth routeRole="auth">{children}</WithAuth>;
}

export default Layout;
