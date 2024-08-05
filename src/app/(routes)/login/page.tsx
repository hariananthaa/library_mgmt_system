import LoginForm from "@/app/components/login/login_form";
import Image from "next/image";

export default async function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen w-full relative">
      <Image
        src="/bool_shelf.jpg"
        alt="book shelf"
        className="absolute blur-sm h-full w-full object-cover"
        height={1080}
        width={1920}
      />
      <div className="relative mx-auto flex w-full max-w-[400px] shadow-md rounded-md flex-col px-3">
        <div
          className="flex h-20 w-full font-bold text-4xl text-white items-center justify-center 
        rounded-t-lg bg-blue-500 bg-opacity-80 p-3 sm:h-36"
        >
          ZIT LIBRARY
        </div>
        <LoginForm />
      </div>
      <div className="w-full bg-orange-400 absolute bottom-0 left-0 right-0 h-10 flex justify-center items-center">
        <div className="text-white text-lg  mx-auto w-max ">
          Image by{" "}
          <a href="https://pixabay.com/users/geralt-9301/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=67049">
            Gerd Altmann
          </a>{" "}
          from{" "}
          <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=67049">
            Pixabay
          </a>
        </div>
      </div>
    </main>
  );
}
