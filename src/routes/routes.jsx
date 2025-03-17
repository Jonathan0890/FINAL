import { createBrowserRouter,} from "react-router-dom";
import HomeView from "../Views/HomeView.jsx";
import ContactView from "../Views/ContactView.jsx";
import RegisterView from "../Views/Auth/RegisterView.jsx";
import LoginView from "../Views/Auth/LoginView.jsx";
import ForgotPasswordView from "../Views/Auth/ForgotPasswordView.jsx";
import TransactionCategoriesView from "../Views/Transactions/TransactionCategoriesView.jsx";
import TransactionRegisterView from "../Views/Transactions/TransactionRegisterView.jsx";
import SummaryView from "../Views/SummaryView.jsx";
import AhorrosMetasView from "../Views/Savings/AhorrosMetasView.jsx";
import RemindersView from "../Views/Reminders/RemindersView.jsx";
import CategoriaList from "../Views/Shared/CategoriaList.jsx"
//import TransactionList from "../components/TransactionList.jsx";
// importaciones del dashboard
import DashboardView from "../Views/Dashboard/DashboardView.jsx";
//REPORTE
import Reportes from "../Views/Dashboard/Reportes/Repotes.jsx";
//CATEGORIAS
import CreateCategoria from "../Views/Dashboard/Categorias/CreateCategoria.jsx";
import IndexCat from "../Views/Dashboard/Categorias/IndexCat.jsx";
import EditCategoria from "../Views/Dashboard/Categorias/EditCategoria.jsx";
//USUARIOS
import IndexUsuario from "../Views/Dashboard/Usuarios/indexUsu.jsx";
import CreateUsuario from "../Views/Dashboard/Usuarios/CreateUsuario.jsx";
import EditUsuario from "../Views/Dashboard/Usuarios/editUsuario.jsx";
//METAS
import IndexMetaAhorro from "../Views/Dashboard/Metas_Ahorro/IndexMA.jsx";
import CreateMetaAhorro from "../Views/Dashboard/Metas_Ahorro/CreateMetas_Ahorro.jsx";
import EditMetaAhorro from "../Views/Dashboard/Metas_Ahorro/EditMetas_Ahorro.jsx";
//RECORDATORIOS
import IndexRecordatorio from "../Views/Dashboard/Recordatorios/index.jsx";
import CreateRecordatorio from "../Views/Dashboard/Recordatorios/createRecord.jsx";
import EditRecordatorio from "../Views/Dashboard/Recordatorios/editRecord.jsx";
//TRANSACCIONES
import IndexTransaccion from "../Views/Dashboard/Transacciones/index.jsx";
import CreateTransaccion from "../Views/Dashboard/Transacciones/createTransa.jsx";
import EditTransaccion from "../Views/Dashboard/Transacciones/edit_Transa.jsx";
//import ProtectedRoute from "../components/ProtectedRoute.jsx";
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
  },
  {
    path: "/categoriasd/create",
    element: <CreateCategoria />,

  },
  {
    path: "/categoriasd/edit/:id",
    element: <EditCategoria />
  },
  {
    path: "/usuarios",
    element: <IndexUsuario />,
  },
  {
    path: "create",
    element: <CreateUsuario />,
  },
  {
    path: "edit/:id",
    element: <EditUsuario />
  },
  {
    path: "/transacciones",
    element: <IndexTransaccion />
  },
  {
    path: "create",
    element: <CreateTransaccion />,
  },
  {
    path: "edit/:id",
    element: <EditTransaccion />
  },
  {
    path: "/metas-ahorro",
    element: <IndexMetaAhorro />
  },
  {
    path: "create",
    element: <CreateMetaAhorro />,
  },
  {
    path: "edit/:id",
    element: <EditMetaAhorro />
  },
  {
    path: "/recordatorios",
    element: <IndexRecordatorio />
  },
  {
    path: "create",
    element: <CreateRecordatorio />,
  },
  {
    path: "edit/:id",
    element: <EditRecordatorio />
  },

  /*,
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
