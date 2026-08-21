import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { RequireAuth, RequireRole, RequireSelfOnly, RequireGuest, RequireSelfOrElevated } from "@/features/auth/components/guards";

import { HomePage } from "./pages/HomePage";
import { ForbiddenPage } from "./pages/ForbiddenPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CompetitionsPage } from "@/features/competitions/pages/CompetitionsPage";
import { FavoritesPage } from "@/features/favorites/pages/FavoritesPage";
import { UserProfilePage } from "@/features/users/pages/UserProfilePage";
import { AdminPage } from "@/features/admin/pages/AdminPage";

import { Role } from "@/shared/types";
import { ChangePasswordPage } from "@/features/users/pages/ChangePasswordPage";

export const router = createBrowserRouter([
    {
        element: <RequireGuest/>,
        children: [
            {path: "/login", element: <LoginPage/>},
            {path: "/register", element: <RegisterPage/>},
        ],
    },
    
    {path: "/forbidden", element: <ForbiddenPage/>},

    {
        element: <RequireAuth/>,
        children: [
            {path: "/", element: <HomePage/>},
            {path: "/competitions", element: <CompetitionsPage/>},
            {path: "/favorites", element: <FavoritesPage/>},

            {path: "/users/:username", element: <UserProfilePage/>},

            {
                element: <RequireSelfOnly/>,
                children: [
                    {path: "/users/:username/password", element: <ChangePasswordPage/>},
                    {path: "/users/:username/email", element: null},
                ],
            },

            {
                element: <RequireSelfOrElevated/>,
                children: [
                    {path: "/users/:username/delete", element: null},
                    
                ]
            },

            {
                element: <RequireRole minRole={Role.SUPER_ADMIN}/>,
                children: [{path: "/admin", element: <AdminPage/>}],
            },
        ],
    },

    {path: "*", element: <NotFoundPage/>},
])