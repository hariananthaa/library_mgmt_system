import WithRole from "@/app/common/with_role";
import WithAuth from "@/app/common/withAuth";
import { Role } from "@/app/lib/definitions";
import React, { ReactElement } from "react";

export default function AddBookLayout({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  return (
    <WithAuth>
      <WithRole role={[Role.ADMIN]}>{children}</WithRole>
    </WithAuth>
  );
}
