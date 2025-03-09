import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HomeView from "../Views/HomeView.jsx";
import ContactView from "../Views/ContactView.jsx";
import RegisterView from "../Views/RegisterView.jsx";
import LoginView from "../Views/LoginView.jsx";
import ForgotPasswordView from "../Views/ForgotPasswordView.jsx";
import TransactionCategoriesView from "../Views/TransactionCategoriesView.jsx";
import TransactionRegisterView from "../Views/TransactionRegisterView.jsx";
import SummaryView from "../Views/SummaryView.jsx";
import AhorrosMetasView from "../Views/AhorrosMetasView.jsx";
import RemindersView from "../Views/RemindersView.jsx";
//import CategoriaList from "../components/CategoriaList.jsx";
//import TransactionList from "../components/TransactionList.jsx";
import DashboardView from "../Views/DashboardView.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

// Define las rutas correctamente
const router = createBrowserRouter([
    { path: "/", element: <HomeView /> },
    { path: "/contact", element: <ContactView /> },
    { path: "/register", element: <RegisterView /> },
    { path: "/login", element: <LoginView /> },
    { path: "/forgot-password", element: <ForgotPasswordView /> },
    { path: "/transaction-categories", element: <TransactionCategoriesView /> },
    { path: "/register-transaction", element: <TransactionRegisterView /> },
    { path: "/summary", element: <SummaryView /> },
    { path: "/ahorros", element: <AhorrosMetasView /> },
    { path: "/reminders", element: <RemindersView /> },
   // { path: "/categorias", element: <CategoriaList /> },
   // { path: "/transacciones", element: <TransactionList /> },
    {
      path: "/dashboard",
      element: <DashboardView/>
      
      /*()
        <ProtectedRoute>
          <DashboardView />
        </ProtectedRoute>
      ),
      */
    },
]);

export default router;
