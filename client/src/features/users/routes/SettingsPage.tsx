import UserProfileForm from "../components/UserProfileForm";

export function SettingsPage() {
  return (
    <div className="min-h-[calc(100vh-60px)] lg:h-screen">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="items-end justify-between space-y-2 lg:flex">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          </div>
        </div>
        <UserProfileForm />
      </div>
    </div>
  );
}
