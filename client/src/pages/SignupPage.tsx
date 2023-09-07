import { SignupCard } from "@/components/SignupCard";

export default function SignupPage() {
  return (
    <div className="grid h-screen place-items-center items-center bg-zinc-100 bg-[url('@/assets/layered-waves-haikei-light.svg')] bg-cover bg-fixed bg-center dark:bg-background dark:bg-[url('@/assets/layered-waves-haikei.svg')]">
      <SignupCard />
    </div>
  );
}
