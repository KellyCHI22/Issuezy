import { checkPermission } from "@/apis/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const permissionMutation = useMutation({
    mutationFn: checkPermission,
    onSuccess: () => navigate("/projects"),
    onError: (error) => {
      console.log(error.response.data);
      return navigate("/login");
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    permissionMutation.mutate({ token });
    console.log("use effect runs");
  }, []);

  return <Outlet />;
}
