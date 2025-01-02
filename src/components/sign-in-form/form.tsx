"use client";

import { SignIn } from "@/lib/actions";
import { Button, Input } from "@nextui-org/react";
import { useActionState } from "react";

const initialState = {
  errors: {
    email: "",
    password: "",
  },
};
const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(SignIn, initialState);
  return (
    <form
      action={formAction}
      className="flex flex-col border shadow-sm p-4 rounded-lg items-center max-w-sm w-full space-y-4"
    >
      <h2 className="font-bold text-xl">Sign in</h2>
      <Input
        label="Email"
        type="email"
        variant="bordered"
        name="email"
        errorMessage={state?.errors.email}
      />
      <Input
        label="Password"
        type="password"
        variant="bordered"
        name="password"
        errorMessage={state?.errors.password}
      />
      <Button
        isLoading={isPending}
        fullWidth
        color="primary"
        size="lg"
        type="submit"
      >
        Sign in
      </Button>
    </form>
  );
};

export default SignInForm;
