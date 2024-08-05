import WithRole from "@/app/common/with_role";
import WithAuth from "@/app/common/withAuth";
import { Role } from "@/app/lib/definitions";
import React, { ReactElement } from "react";

/**
 * Layout component that wraps the Add Book page.
 * It ensures that only authorized users with the ADMIN role can access the page.
 *
 * @param children The main content of the Add Book page.
 * @returns The JSX element representing the layout.
 */

export default function AddBookLayout({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  return (
    /**
     * WithAuth component ensures that only authorized users can access the page.
     */
    <WithAuth>
      <WithRole role={[Role.ADMIN]}>{children}</WithRole>
    </WithAuth>
  );
}
