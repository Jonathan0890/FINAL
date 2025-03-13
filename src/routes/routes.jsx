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
import IndexUsuario from "../pages/Dashboard/Usuarios/indexUsu.jsx";
import CreateUsuario from "../pages/Dashboard/Usuarios/CreateUsuario.jsx";
import EditUsuario from "../pages/Dashboard/Usuarios/editUsuario.jsx";
import IndexMetaAhorro from "../pages/Dashboard/Metas_Ahorro/IndexMA.jsx";
import CreateMetaAhorro from "../pages/Dashboard/Metas_Ahorro/CreateMetas_Ahorro.jsx";
import EditMetaAhorro from "../pages/Dashboard/Metas_Ahorro/EditMetas_Ahorro.jsx";
import IndexRecordatorio from "../pages/Dashboard/Recordatorios/index.jsx";
import CreateRecordatorio from "../pages/Dashboard/Recordatorios/createRecord.jsx";
import EditRecordatorio from "../pages/Dashboard/Recordatorios/editRecord.jsx";
import IndexTransaccion from "../pages/Dashboard/Transacciones/index.jsx";
import CreateTransaccion from "../pages/Dashboard/Transacciones/createTransa.jsx";
import EditTransaccion from "../pages/Dashboard/Transacciones/edit_Transa.jsx";
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
  {
    path: "/usuarios",
    element: <IndexUsuario />,
    children: [
      {
        path: "create",
        element: <CreateUsuario />,
      },
      {
        path: "edit/:id",
        element: <EditUsuario />
      }
    ]
  },
  {
    path: "/transacciones",
    element: <IndexTransaccion/>,
    children: [
      {
        path: "create",
        element: <CreateTransaccion />,
      },
      {
        path: "edit/:id",
        element: <EditTransaccion />
      }
    ]
  },
  {
    path: "/metas-ahorro",
    element: <IndexMetaAhorro />,
    children: [
      {
        path: "create",
        element: <CreateMetaAhorro />,
      },
      {
        path: "edit/:id",
        element: <EditMetaAhorro />
      }
    ]
  },
  {
    path: "/recordatorios",
    element: <IndexRecordatorio />,
    children: [
      {
        path: "create",
        element: <CreateRecordatorio />,
      },
      {
        path: "edit/:id",
        element: <EditRecordatorio />
      }
    ]
  }/*,
  {
    path: "/ventas-mensuales",
    element: <NotFoundView />
  },
  {
    path: "/ventas-totales",
    element: <NotFoundView />
  },
  {
    path: "/resumen",
    element: <NotFoundView />
  },
  {
    path: "/configuracion",
    element: <NotFoundView />
  }*/
]);

export default router;
