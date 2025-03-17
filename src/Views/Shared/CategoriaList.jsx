import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function CategoriesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
        
        <Link 
          href="/categories/new" 
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Category</span>
        </Link>
      </div>

      <div className="space-y-4">
        {/* Contenido de la lista de categorías */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold">Lista de categorías</h3>
          <ul className="mt-2 space-y-2">
            {/* Items de categorías aquí */}
          </ul>
        </div>
      </div>
    </div>
  )
}