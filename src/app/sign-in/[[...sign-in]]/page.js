import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
      <>
      <div className="flex items-center bg-[#34353c] justify-center h-screen">
          <SignIn/>
      </div>
      </>
    );
}
