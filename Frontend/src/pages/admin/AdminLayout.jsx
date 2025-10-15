import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { getUserProfile } from "../../services/index/users";
import Header from "./components/header/Header";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const { isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
    onSuccess: (data) => {
      if (!data?.admin) {
        navigate("/");
        toast.error("Your are not allowed to access admin panel");
      }
    },
    onError: (err) => {
      navigate("/");
      toast.error("Your are not allowed to access admin panel");
    },
  });

  if (profileIsLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-forest-50 via-white to-earth-50">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-forest-200 rounded-full"></div>
            <div className="absolute inset-0 border-t-4 border-forest-600 rounded-full animate-spin"></div>
          </div>
          <h3 className="text-2xl font-bold text-forest-800">
            Loading Admin Panel
          </h3>
          <p className="mt-2 text-sm text-forest-600">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen lg:flex-row bg-gradient-to-br from-forest-50/30 via-white to-earth-50/30">
      <Header />
      <main className="flex-1 min-h-screen p-4 lg:p-8 lg:min-h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
