import { PlusCircle } from "lucide-react"
import { CategoriesList } from "@/components/categories-list"
import Link from "next/link"

export default function CategoriesPage() {
    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
                <Link
                    href="/categories/new"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <PlusCircle className="h-4 w-4" />
                    Add Category
                </Link>
            </div>
            <CategoriesList />
        </div>
    )
}