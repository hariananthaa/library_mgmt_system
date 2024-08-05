import clsx from "clsx";
import AcmeLogo from "../login/acme-logo";
import LogoutButton from "../login/logout_button";
import MobileNavLinks from "./mobile_nav_links";
import NavLinks from "./nav-links";

export default function SideNav() {
  return (
    <div
      className={clsx(
        "w-full sticky flex-none top-0 bg-white z-10 transition-all md:w-[230px] lg:w-[250px] px-2"
      )}
    >
      <div className="flex h-full flex-col py-3 space-y-2 md:px-2 md:h-full md:overflow-y-auto">
        <AcmeLogo />
        <div className="flex justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 md:h-full md:pb-2">
          <MobileNavLinks />
          <div className="hidden md:block md:space-y-2">
            <NavLinks />
          </div>
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
