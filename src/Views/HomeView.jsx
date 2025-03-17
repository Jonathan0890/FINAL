import { DollarSign } from "lucide-react";
import Sidebar from "./users/Sidebar-user";

export default function HomeView() {
    return (<>
        <Sidebar />
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <div className="space-y-4">
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-100 rounded-lg">Overview</button>
                    <button className="px-4 py-2 bg-gray-100 rounded-lg">Analytics</button>
                </div>

                {/* Sección Overview */}
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="p-6 bg-white rounded-xl shadow">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Total Balance</span>
                                <DollarSign className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="text-2xl font-bold mt-2">$5,231.89</div>
                            <p className="text-xs text-gray-500 mt-1">+20.1% from last month</p>
                        </div>

                        {/* Repetir misma estructura para las demás tarjetas */}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <div className="col-span-4 bg-white rounded-xl shadow p-6">
                            <h3 className="text-lg font-bold">Monthly Overview</h3>
                            <p className="text-sm text-gray-500">Your financial activity for the past 30 days</p>
                            {/* Aquí iría el gráfico */}
                        </div>

                        <div className="col-span-3 bg-white rounded-xl shadow p-6">
                            <h3 className="text-lg font-bold">Recent Transactions</h3>
                            <p className="text-sm text-gray-500">Your latest financial activities</p>
                            {/* Listado de transacciones */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}