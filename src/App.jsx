import { useEffect } from "react";
import { useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./component/layout/ScrollToTop";
import { requestNotificationPermission, onMessageListener } from "./config/firebase";
import toast from "react-hot-toast";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // ✅ Login hone par permission maango aur token save karo
  useEffect(() => {
    if (isAuthenticated && user?._id) {
      requestNotificationPermission(user._id);
    }
  }, [isAuthenticated, user]);

  // ✅ Foreground notifications — callback based fix
  useEffect(() => {
    const unsubscribe = onMessageListener((payload) => {
      toast.success(
        `${payload.notification?.title}\n${payload.notification?.body}`,
        { duration: 5000, icon: "🔔" }
      );
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  return (
    <div>
      <ScrollToTop />
      <AppRoutes />
    </div>
  );
}

export default App;