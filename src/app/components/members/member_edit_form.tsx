"use client";

import { Button } from "@/app/common/button";
import CustomDropDown from "@/app/common/custom_drop_down";
import InputField from "@/app/common/input_field";
import { updateMember } from "@/app/lib/member_actions";
import { ArrowPathIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { memberRoles } from "./member_add_form";
import { useRouter } from "next/navigation";
import { LOGIN_ROUTE, MEMBERS_ROUTE } from "@/app/constant";
import { toast } from "react-toastify";

export default function EditMemberForm({
  member,
  isView,
}: {
  member: any;
  isView: boolean;
}) {
  const router = useRouter();
  const memberSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: yup
      .string()
      .optional()
      .length(10, "Phone number must be 10 digits")
      .matches(/^([6-9]\d{9})$/, "Invalid phone number"),
    role: yup.string().required("Role type is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isLoading, isSubmitting, isValidating },
  } = useForm({
    resolver: yupResolver(memberSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const res = await updateMember(
          member.id,
          JSON.parse(JSON.stringify(values))
        );
        if (!res.result) {
          toast.error(res.message);
          if (res.status == 403 || res.status === 401) {
            router.push(LOGIN_ROUTE);
          }
        } else {
          toast.success("Member info updated successfully!");
          router.push(MEMBERS_ROUTE);
        }
      })}
    >
      <div className="rounded-md gap-3 bg-gray-50 p-4 md:p-6 grid grid-cols-1 xl:grid-cols-2">
        <div className=" col-span-1 xl:col-span-2">
          <InputField
            id="name"
            label="Name"
            register={register}
            error={errors.name}
            disabled={isView}
            type="text"
            defaultValue={member.name}
            placeholder="Enter the member name"
          />
        </div>
        <div className=" col-span-1">
          <InputField
            id="email"
            label="Email"
            register={register}
            error={errors.email}
            disabled={isView}
            type="email"
            defaultValue={member.email}
            placeholder="Enter the email"
          />
        </div>
        {!isView && (
          <div className=" col-span-1">
            <InputField
              id="password"
              label="Password"
              register={register}
              error={errors.password}
              disabled={isView}
              type="password"
              placeholder="Enter the password"
            />
          </div>
        )}

        <div className=" col-span-1">
          <InputField
            id="phone"
            label="Phone"
            register={register}
            error={errors.phone}
            disabled={isView}
            type="number"
            defaultValue={member.phone}
            placeholder="Enter the phone"
          />
        </div>

        <div className=" col-span-1">
          <CustomDropDown
            prefixIcon={
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2 text-gray-500" />
            }
            register={register}
            label={"Choose a role"}
            disabled={isView}
            id={"role"}
            defaultValue={member.role}
            options={memberRoles}
          />
        </div>
      </div>
      {!isView && (
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href={MEMBERS_ROUTE}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button
            disabled={isLoading || isSubmitting || isValidating}
            type="submit"
          >
            {isLoading || isSubmitting || isValidating ? (
              <ArrowPathIcon className="pointer-events-none h-[20px] w-[20px] animate-spin text-white" />
            ) : (
              "Save member"
            )}
          </Button>
        </div>
      )}
    </form>
  );
}
