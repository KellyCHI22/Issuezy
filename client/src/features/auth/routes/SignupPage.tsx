import { useNavigate } from "react-router-dom";
import { SignupCard } from "../components/SignupCard";
import { useEffect } from "react";

export const SignupPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) return navigate("/projects");
  }, []);

  return (
    <div className="grid h-screen place-items-center items-center bg-zinc-100 bg-[url('@/assets/layered-waves-haikei-light.svg')] bg-cover bg-fixed bg-center dark:bg-background dark:bg-[url('@/assets/layered-waves-haikei.svg')]">
      <SignupCard />
    </div>
  );
};
