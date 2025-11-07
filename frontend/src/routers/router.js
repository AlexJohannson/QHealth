import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout";
import {HomePage} from "../pages/HomePage/HomePage";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {DoctorPage} from "../pages/DoctorPage/DoctorPage";
import {PharmacistPage} from "../pages/PharmacistPage/PharmacistPage";
import {OperatorPage} from "../pages/OperatorPage/OperatoprPage";
import {AdminPage} from "../pages/AdminPage/AdminPage";
import {SuperUserPage} from "../pages/SuperUserPage/SuperUserPage";
import {UserDetailsPage} from "../pages/user/UserDetailsPage/UserDetailsPage";
import {UserHomePage} from "../pages/user/UserHomePage/UserHomePage";
import {UserPage} from "../pages/user/UserPage/UserPage";
import {RegisterPage} from "../pages/RegisterPage/RegisterPage";
import {ActivateAccountPage} from "../pages/ActivateAccountPage/ActivateAccountPage";
import {RecoveryRequestPage} from "../pages/RecoveryRequestPage/RecoveryRequestPage";
import {RecoveryPasswordPage} from "../pages/RecoveryPasswordPage/RecoveryPasswordPage";
import {UserEditFormPage} from "../pages/user/UserEditFormPage/UserEditFormPage";




const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'superuser', element: <SuperUserPage/>},
            {path: 'admin', element: <AdminPage/>},
            {path: 'doctor', element: <DoctorPage/>},
            {path: 'pharmacist', element: <PharmacistPage/>},
            {path: 'operator', element: <OperatorPage/>},
            {path: 'users', element: <UserPage/>},
            {path: 'users/:id', element: <UserDetailsPage/>},
            {path: 'user-home-page', element: <UserHomePage/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'registration', element: <RegisterPage/>},
            {path: 'auth/activate/:token', element: <ActivateAccountPage />},
            {path: 'auth/recovery', element: <RecoveryRequestPage/>},
            {path: 'auth/recovery_password/:token', element: <RecoveryPasswordPage/>},
            {path: 'users-update/:id', element: <UserEditFormPage/>},
        ]
    },
])

export {router};