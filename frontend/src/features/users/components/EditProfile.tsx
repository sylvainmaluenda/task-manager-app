import { useUserStore } from "@/features/users/store/user.store";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateProfileForm from "./UpdateProfileForm";

const EditProfile = () => {
  const user = useUserStore((s) => s.user);
  const updateUser = useUserStore((s) => s.updateUser);

  if (!user) {
    return <div>User datas are missing...</div>;
  }

  return (
    <>
      <h1>Account settings</h1>

      <UpdateProfileForm
        className="w-full bg-gray-50"
        user={user}
        updateUser={updateUser}
      />
      <UpdatePasswordForm className="w-full bg-gray-50 mt-6" />
    </>
  );
};

export default EditProfile;
