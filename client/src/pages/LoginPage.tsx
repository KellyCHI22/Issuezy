import { LoginCard } from "@/components/LoginCard";

export default function LoginPage() {
  return (
    <div className="grid h-screen place-items-center items-center bg-zinc-100 bg-[url('@/assets/layered-waves-haikei-light.svg')] bg-cover bg-fixed bg-center dark:bg-background dark:bg-[url('@/assets/layered-waves-haikei.svg')]">
      <LoginCard />
    </div>
  );
}
