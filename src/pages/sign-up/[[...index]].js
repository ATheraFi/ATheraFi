import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-[75vh] justify-center items-center">
      <SignUp />
    </div>
  );
}