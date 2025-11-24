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
import {RolesPage} from "../pages/roles/RolesPage/RolesPage";
import {RolesDetailsPage} from "../pages/roles/RolesDetailsPage/RolesDetailsPage";
import {RoleRegistrationPage} from "../pages/roles/RoleRegistationPage/RoleRegistrationPage";
import {SecurityPage} from "../pages/SecurityPage/SecurytiPage";
import {PatientPage} from "../pages/patient/PatientPage/PatientPage";
import {PatientDetailsPage} from "../pages/patient/PatientDetailsPage/PatientDetailsPage";
import {DiagnosticPage} from "../pages/diagnostic/DiagnosticPage/DiagnosticPage";
import {DiagnosticDetailPage} from "../pages/diagnostic/DiagnosticDetailPage/DiagnosticDetailPage";
import {CreateNewDiagnosticPage} from "../pages/diagnostic/CreateNewDiagnosticPage/CreateNewDiagnosticPage";
import {BookingDiagnosticsPage} from "../pages/booking-diagnostics/BookingDiagnosticsPage/BookingDiagnosticsPage";
import {
    BookingDiagnosticsDetailsPage
} from "../pages/booking-diagnostics/BookingDiagnosticDetailsPage/BookingDiagnosticsDetailsPage";
import {DiagnosticsListPage} from "../pages/diagnostics-list-page/DiagnosticsListPage/DiagnosticsListPage";
import {
    DiagnosticsListDetailsPage
} from "../pages/diagnostics-list-page/DiagnosticsListDetailsPage/DiagnosticsListDetailsPage";
import {DoctorPagePatient} from "../pages/doctor-page-patient/DoctorPagePatient/DoctorPagePatient";
import {DoctorPagePatientDetails} from "../pages/doctor-page-patient/DoctorPagePatientDetails/DoctorPagePatientDetails";
import {BookingDoctorPage} from "../pages/booking-doctor-page/BookingDoctorPage/BookingDoctorPage";
import {BookingDoctorDetailsPage} from "../pages/booking-doctor-page/BookingDoctorDetailsPage/BookingDoctorDetailsPage";
import {PatientJournalPage} from "../pages/patient-journal-page/PatientJournalPage/PatientJournalPage";
import {
    PatientJournalDetailsPage
} from "../pages/patient-journal-page/PatientJournalDetailsPage/PatientJournalDetailsPage";
import {
    CreatePatientJournalPage
} from "../pages/patient-journal-page/CreatePatientJournalPage/CreatePatientJournalPage";
import {PatientRecipePage} from "../pages/patient-recipe-page/PatientRecipePage/PatientRecipePage";
import {PatientRecipeDetailsPage} from "../pages/patient-recipe-page/PatientRecipeDetailsPage/PatientRecipeDetailsPage";
import {CreatePatientRecipePage} from "../pages/patient-recipe-page/CreatePatientRecipePage/CreatePatientRecipePage";








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
            {path: 'roles', element: <RolesPage/>},
            {path: 'roles/:id', element: <RolesDetailsPage/>},
            {path: 'staff-registration', element: <RoleRegistrationPage/>},
            {path: 'security-list', element: <SecurityPage/>},
            {path: 'patients-card', element: <PatientPage/>},
            {path: 'patients-card/:id', element: <PatientDetailsPage/>},
            {path: 'diagnostics', element: <DiagnosticPage/>},
            {path: 'diagnostics/:id', element: <DiagnosticDetailPage/>},
            {path: 'create-new-diagnostic', element: <CreateNewDiagnosticPage/>},
            {path: 'booking-diagnostic', element: <BookingDiagnosticsPage/>},
            {path:'booking-diagnostic/:id', element: <BookingDiagnosticsDetailsPage/>},
            {path: 'diagnostics-list', element: <DiagnosticsListPage/>},
            {path: 'diagnostics-list/:id', element: <DiagnosticsListDetailsPage/>},
            {path: 'doctors', element: <DoctorPagePatient/>},
            {path: 'doctors/:id', element: <DoctorPagePatientDetails/>},
            {path: 'booking-doctor', element: <BookingDoctorPage/>},
            {path: 'booking-doctor/:id', element: <BookingDoctorDetailsPage/>},
            {path: 'patient-journal', element: <PatientJournalPage/>},
            {path: 'patient-journal/:id', element: <PatientJournalDetailsPage/>},
            {path: 'create-patient-journal', element: <CreatePatientJournalPage/>},
            {path: 'patient-recipe', element: <PatientRecipePage/>},
            {path: 'patient-recipe/:id', element: <PatientRecipeDetailsPage/>},
            {path: 'create-patient-recipe', element: <CreatePatientRecipePage/>}
        ]
    },
])

export {router};