import CustomPopup from "@/app/common/custom_popup";
import UsernameComponent from "@/app/common/user_name";
import WithAuth from "@/app/common/with_auth";
import SideNav from "@/app/components/dashboard/sidenav";
import { ReactElement } from "react";

/**
 * Layout component that wraps the entire application.
 *
 * @param children The main content of the application.
 * @returns The JSX element representing the layout.
 */
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <WithAuth routeRole="all">
      <>
        {/* Main container element */}
        <div className="flex w-full h-screen relative flex-col md:flex-row md:overflow-hidden">
          <SideNav />
          {/* Main content area */}
          <div className="w-full px-3 pt-1 pb-5 md:px-0 md:pb-0 md:pt-3 md:pr-2">
            <UsernameComponent />
            {children}
          </div>
        </div>
        <CustomPopup />
      </>
    </WithAuth>
  );
}
