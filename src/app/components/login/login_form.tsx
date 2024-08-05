"use client";

import { Button } from "@/app/common/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { lusitana } from "./fonts";
import { loginFunction } from "@/app/lib/auth_actions";
import { HOME_ROUTE } from "@/app/constant";
import InputField from "@/app/common/input_field";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "@/app/zustand/auth_store";

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
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
    resolver: yupResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const res = await loginFunction(values.email, values.password);
        if (!res.result) {
          toast.error(res.message);
        } else {
          toast.success("Authenticated successfully!");
          router.push(HOME_ROUTE);
        }
      })}
      className="space-y-3 "
    >
      <div className="flex-1 rounded-b-lg bg-opacity-80 bg-gray-50 px-6 pb-4 pt-3">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-center`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <InputField
            id="email"
            label="Email"
            register={register}
            error={errors.email}
            type="email"
            placeholder="Enter the email"
          />
          <br />
          <InputField
            id="password"
            label="Password"
            register={register}
            error={errors.password}
            type="password"
            placeholder="Enter the password"
          />
        </div>
        <Button
          className="mt-4 w-full"
          aria-disabled={isLoading || isSubmitting || isValidating}
          type="submit"
        >
          {!isLoading && !isSubmitting && !isValidating ? (
            <span className="flex justify-between w-full">
              Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </span>
          ) : (
            <span className="w-full flex justify-center">Loading...</span>
          )}
        </Button>
      </div>
    </form>
  );
}
