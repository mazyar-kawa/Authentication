"use server";

import { signIn } from "@/auth";

export async function SignIn(
  prevState:
    | {
        errors: {
          email: string;
          password: string;
        };
      }
    | undefined,
  formData: FormData
) {
  if (formData.get("email") && formData.get("password")) {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  }
  return {
    errors: {
      email: "email",
      password: "password",
    },
  };
}
