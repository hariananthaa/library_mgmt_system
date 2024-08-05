import { Button } from "@/app/common/button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

function LoginBtn() {
  return (
    <Button className="mt-4 w-full" aria-disabled={false} type="submit">
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

export default LoginBtn;
