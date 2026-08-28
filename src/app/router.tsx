import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/LoginPage/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage/RegisterPage";
import { RequireAuth, RequireRole, RequireSelfOnly, RequireGuest, RequireSelfOrElevated } from "@/features/auth/components/guards";

import { HomePage } from "./pages/HomePage";
import { ForbiddenPage } from "./pages/ForbiddenPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { FavoritesPage } from "@/features/favorites/pages/FavoritesPage";
import { UserProfilePage } from "@/features/users/pages/UserProfilePage";
import { AdminPage } from "@/features/admin/pages/AdminPage/AdminPage";

import { Role } from "@/shared/types";
import { ChangePasswordPage } from "@/features/users/pages/ChangePasswordPage";
import { ChangeEmailPage } from "@/features/users/pages/ChangeEmailPage";
import { DeleteAccountPage } from "@/features/users/pages/DeleteAccountPage";
import { AppLayout } from "./components/AppLayout";
import { VerifyAccountPage } from "@/features/auth/pages/VerifyAccountPage";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "@/features/auth/pages/ResetPasswordPage";
import { UserSearchPage } from "@/features/users/pages/UserSearchPage/UserSearchPage";
import { ManageRolesPage } from "@/features/admin/pages/ManageRolesPage/ManageRolesPage"; 
import { ManageCompetitionCodesPage } from "@/features/admin/pages/ManageCompetitionCodesPage";
import { SyncPage } from "@/features/admin/pages/SyncPage";
import { CompetitionsListPage } from "@/features/competitions/pages/CompetitionsListPage/CompetitionsListPage"; 
import { CompetitionDetailPage } from "@/features/competitions/pages/CompetitionDetailPage/CompetitionDetailPage";

export const router = createBrowserRouter([
    {
        element: <RequireGuest/>,
        children: [
            {path: "/login", element: <LoginPage/>},
            {path: "/register", element: <RegisterPage/>},
            {path: "/forgot-password", element: <ForgotPasswordPage/>},
            {path: "/reset-password/:username", element: <ResetPasswordPage/>},
        ],
    },
    
    {path: "/forbidden", element: <ForbiddenPage/>},

    {
        element: <RequireAuth/>,
        children: [
            {
                element: <AppLayout/>,
                children: [
                    {path: "/", element: <HomePage/>},
                    {path: "/competitions", element: <CompetitionsListPage/>},
                    {path:"/competitions/:code", element: <CompetitionDetailPage/>},
                    {path: "/favorites", element: <FavoritesPage/>},
                    {path: "/verify-account", element: <VerifyAccountPage/>},

                    {path: "/users/:username", element: <UserProfilePage/>},

                    {path: "/search", element: <UserSearchPage/>},

                    {
                        element: <RequireSelfOnly/>,
                        children: [
                            {path: "/users/:username/password", element: <ChangePasswordPage/>},
                            {path: "/users/:username/email", element: <ChangeEmailPage/>},
                        ],
                    },

                    {
                        element: <RequireSelfOrElevated/>,
                        children: [
                            {path: "/users/:username/delete", element: <DeleteAccountPage/>},
                            
                        ]
                    },

                    {
                        element: <RequireRole minRole={Role.MOD}/>,
                        children: [
                            {path: "/admin", element: <AdminPage/>},
                            {path: "/admin/roles", element: <ManageRolesPage/>}
                        ],
                    },
                    {
                        element: <RequireRole minRole={Role.ADMIN}/>,
                        children: [
                            {path: "/admin/competitions", element: <ManageCompetitionCodesPage/>}
                        ]
                    },
                    {
                        element: <RequireRole minRole={Role.SUPER_ADMIN}/>,
                        children: [
                            {path: "/admin/sync", element: <SyncPage/>},
                        ]
                    },
                ]
            },
        ],
    },

    {path: "*", element: <NotFoundPage/>},
])