import { useState } from "react"
import { ShoppingBag, Home, Utensils, Car, Wifi, MoreHorizontal, Search, Filter } from "lucide-react"

const transactions = [/* ... (mismo array de transacciones) ... */]

export function TransactionsList() {
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [openMenuId, setOpenMenuId] = useState(null)

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter
        return matchesSearch && matchesCategory
    })

    const categories = [...new Set(transactions.map((t) => t.category))]

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="pl-8 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-[180px]">
                    <Filter className="h-4 w-4" />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="rounded-md border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-4">Description</th>
                            <th className="text-left p-4">Category</th>
                            <th className="text-left p-4">Date</th>
                            <th className="text-right p-4">Amount</th>
                            <th className="p-4 w-[50px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b">
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-full bg-gray-100 p-2">
                                            <transaction.icon className="h-4 w-4" />
                                        </div>
                                        <span>{transaction.description}</span>
                                    </div>
                                </td>
                                <td className="p-4">{transaction.category}</td>
                                <td className="p-4">{new Date(transaction.date).toLocaleDateString()}</td>
                                <td className={`p-4 text-right font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"
                                    }`}>
                                    {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
                                </td>
                                <td className="p-4 relative">
                                    <div className="relative">
                                        <button
                                            className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100"
                                            onClick={() => setOpenMenuId(openMenuId === transaction.id ? null : transaction.id)}
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>

                                        {openMenuId === transaction.id && (
                                            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                                                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                                                    Edit
                                                </button>
                                                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                                                    Duplicate
                                                </button>
                                                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500">
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}