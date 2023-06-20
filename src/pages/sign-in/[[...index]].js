import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex h-[75vh] justify-center items-center">
      <SignIn />
    </div>
  );
}