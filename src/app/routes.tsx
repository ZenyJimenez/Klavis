import { createBrowserRouter } from "react-router"
import { Login } from "./components/Login"
import { AdminLayout } from "./components/AdminLayout"
import { AdminDashboard } from "./components/AdminDashboard"
import { AdminUserManagement } from "./components/AdminUserManagement"
import { AdminVisitors } from "./components/AdminVisitors"
import { AdminProviders } from "./components/AdminProviders"
import { GuardLayout } from "./components/GuardLayout"
import { GuardRealtime } from "./components/GuardRealtime"
import { GuardVisitors } from "./components/GuardVisitors"
import { GuardHistory } from "./components/GuardHistory"
import { GuardNotices } from "./components/GuardNotices"
import { GuardIncidents } from "./components/GuardIncidents"
import { GuardParking } from "./components/GuardParking"
import { StudentLayout } from "./components/StudentApp"
import { AdminRealTime } from "./components/AdminRealTime"
import { AdminReports } from "./components/AdminReports"
import { AdminIncidents } from "./components/AdminIncidents"
import { AdminSettings } from "./components/AdminSettings"
import { AdminParking } from "./components/AdminParking"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "users", Component: AdminUserManagement },
      { path: "visitors", Component: AdminVisitors },
      { path: "providers", Component: AdminProviders },
      { path: "real-time", Component: AdminRealTime },
      { path: "parking", Component: AdminParking },
      { path: "reports", Component: AdminReports },
      { path: "incidents", Component: AdminIncidents },
      { path: "settings", Component: AdminSettings },
    ],
  },
  {
    path: "/guard",
    Component: GuardLayout,
    children: [
      { index: true, Component: GuardRealtime },
      { path: "history", Component: GuardHistory },
      { path: "calendar", Component: GuardVisitors },
      { path: "notices", Component: GuardNotices },
      { path: "incidents", Component: GuardIncidents },
      { path: "parking", Component: GuardParking },
    ],
  },
  {
    path: "/student",
    Component: StudentLayout,
  }
])
