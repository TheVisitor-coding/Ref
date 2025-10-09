import DashboardClient from "@/components/organisms/dashboard/DashboardClient";
import { getTokenFromCookie } from "@/services/authService";
import { getUserInfo } from "@/services/userService";
import { isToday } from "@/utils/date";



export default async function Dashboard() {

  const authCookie = await getTokenFromCookie();
  let userInfo = null;

  let shouldShowPreDashboard = false;

  if (authCookie) {
    userInfo = await getUserInfo(authCookie);
    if (userInfo) {
      const lastPreDashboardView = userInfo.lastPredashboardSeenAt;
      lastPreDashboardView ? shouldShowPreDashboard = !isToday(lastPreDashboardView) : null;
    }
  }

  return (
    <>
      <DashboardClient
        initialShowPreDashboard={shouldShowPreDashboard}
        userInfo={userInfo}
      />
    </>
  );
}
