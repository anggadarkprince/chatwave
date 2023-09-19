import Image from "next/image";
import AuthForm from "@/app/(site)/components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center">
          <Image src={'/images/logo.png'} alt={'Logo'} height={48} width={48} className="mr-2" />
          <p className="text-blue-600 text-3xl">Chat<span className="font-bold">Wave</span></p>
        </div>
        <h2 className="mt-5 text-center text-xl font-semibold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  )
}
