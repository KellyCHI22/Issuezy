import { useQuery } from "@tanstack/react-query";
import UserProfileForm from "../components/UserProfileForm";
import { CurrentUser, getCurrentUser } from "../apis/user-api";
import Spinner from "@/components/ui/spinner";

export function SettingsPage() {
  const currentUserQuery = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  if (currentUserQuery.isFetching || currentUserQuery.isLoading)
    return <Spinner />;

  const currentUser = currentUserQuery.data.currentUser as CurrentUser;

  return (
    <div className="min-h-[calc(100vh-60px)] lg:h-screen">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="items-end justify-between space-y-2 lg:flex">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          </div>
        </div>
        <UserProfileForm currentUser={currentUser} />
      </div>
    </div>
  );
}
