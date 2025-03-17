import { useState } from "react"
import {
    MoreHorizontal,
    Edit,
    Trash2,
} from "lucide-react"

const categories = [/* ... (mantener el mismo array de categorías) ... */]

export function CategoriesList() {
    const [openMenuId, setOpenMenuId] = useState(null)

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
                const progressPercentage =
                    category.budget > 0 ? Math.min(Math.round((category.spent / category.budget) * 100), 100) : 0

                return (
                    <div key={category.id} className="border rounded-lg bg-card shadow-sm">
                        <div className="p-4 flex items-center justify-between border-b">
                            <div className="flex items-center space-x-2">
                                <div className={`rounded-full p-2 ${category.color}`}>
                                    <category.icon className="h-4 w-4 text-white" />
                                </div>
                                <h3 className="font-semibold">{category.name}</h3>
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setOpenMenuId(openMenuId === category.id ? null : category.id)}
                                    className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-accent"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>

                                {openMenuId === category.id && (
                                    <div className="absolute right-0 mt-1 w-32 bg-white border rounded-md shadow-lg z-10">
                                        <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center">
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </button>
                                        <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center text-red-500">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-4">
                            {category.budget > 0 ? (
                                <>
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <p className="text-muted-foreground">
                                            ${category.spent.toFixed(2)} of ${category.budget.toFixed(2)}
                                        </p>
                                        <span className="font-medium">{progressPercentage}%</span>
                                    </div>

                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${progressPercentage > 90 ? "bg-red-500" :
                                                    progressPercentage > 75 ? "bg-yellow-500" : "bg-green-500"
                                                }`}
                                            style={{ width: `${progressPercentage}%` }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <p className="text-muted-foreground text-sm">Income category</p>
                            )}

                            <div className="mt-4 text-sm text-muted-foreground">
                                {category.transactions} transactions
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}