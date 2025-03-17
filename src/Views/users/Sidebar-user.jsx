import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, CreditCard, PieChart, Target, Bell, Settings } from "lucide-react";
import useSidebarStore from "../../Stores/useSidebarStore";
import { cn } from "../../Utils/lib";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Transacciones",
        icon: CreditCard,
        href: "/transacciones",
        color: "text-violet-500",
    },
    {
        label: "Categorías",
        icon: PieChart,
        href: "/categorias",
        color: "text-pink-700",
    },
    {
        label: "Metas de Ahorro",
        icon: Target,
        href: "/metas-ahorro",
        color: "text-orange-500",
    },
    {
        label: "Recordatorios",
        icon: Bell,
        href: "/recordatorios",
        color: "text-emerald-500",
    },
    {
        label: "Usuarios",
        icon: Settings,
        href: "/usuarios",
    },
    {
        label: "Reportes",
        icon: Settings,
        href: "/reports",
    }
];

const Sidebar = () => {
    const location = useLocation();
    const { isSidebarOpen, toggleSidebar } = useSidebarStore();

    // Función para verificar rutas anidadas
    const isActive = (href) => {
        return location.pathname.startsWith(href);
    };

    return (
        <>
            {/* Botón Hamburguesa */}
            {!isSidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 z-40 p-2 text-gray-500 hover:text-blue-500 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-30 w-64 h-screen bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Encabezado */}
                <div className="flex h-14 items-center border-b px-4 justify-between">
                    <Link to="/" className="flex items-center gap-2 font-semibold">
                        <span className="text-lg font-bold">FinSim</span>
                    </Link>
                    <button onClick={toggleSidebar} className="p-2 hover:text-accent-foreground">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navegación */}
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-2 space-y-1">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                to={route.href}
                                className={cn(
                                    "flex items-center px-3 py-2 rounded-lg transition-colors",
                                    isActive(route.href)
                                        ? "bg-accent text-accent-foreground"
                                        : "hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <route.icon className={cn("mr-2 h-5 w-5", route.color)} />
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;