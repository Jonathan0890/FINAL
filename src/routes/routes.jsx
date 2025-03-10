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
import CategoriaList from "../Views/CategoriaList.jsx";
//import TransactionList from "../components/TransactionList.jsx";
// importaciones del dashboard
import DashboardView from "../Views/DashboardView.jsx";
import IndexCat from "../pages/Dashboard/Categorias/IndexCat.jsx";
import Reportes from "../pages/Dashboard/Reportes/Repotes.jsx";
import CreateCategoria from "../pages/Dashboard/Categorias/CreateCategoria.jsx";
import EditCategoria from "../pages/Dashboard/Categorias/EditCategoria.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Pantilla from "../pages/Pantilla.jsx";

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
  { path: "/categorias", element: <CategoriaList /> },
  // { path: "/transacciones", element: <TransactionList /> },
  { path: "/reports", element: <Reportes /> },
  { path: "/pantallas", element: <Pantilla /> },
  {
    path: "/dashboard",
    element: <DashboardView />

    /*()
      <ProtectedRoute>
        <DashboardView />
      </ProtectedRoute>
    ),
    */
  },
  {
    path: "/categoriasd",
    element: <IndexCat />,
    children: [
      {
        path: "create",
        element: <CreateCategoria />,

      },
      {
        path: "edit/:id",
        element: <EditCategoria />
      }

    ]
  },
  
]);

export default router;
