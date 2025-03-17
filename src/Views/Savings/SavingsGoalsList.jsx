"use client"

import { useState } from "react"
import { MoreHorizontal, PlusCircle, Briefcase, Home, Plane, Laptop, GraduationCap } from "lucide-react"

const savingsGoals = [/* ... (mantener el mismo array de metas) ... */]

export function SavingsGoalsList() {
    const [openMenuId, setOpenMenuId] = useState(null)

    return (
        <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savingsGoals.map((goal) => {
                const progressPercentage = Math.round((goal.currentAmount / goal.targetAmount) * 100
        const today = new Date()
                const targetDate = new Date(goal.targetDate)
                const daysLeft = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

                return (
                    <div key={goal.id} className="border rounded-lg shadow-sm">
                        <div className="p-4 pb-2">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={`rounded-full p-2 ${goal.color}`}>
                                        <goal.icon className="h-4 w-4 text-white" />
                                    </div>
                                    <h3 className="font-semibold">{goal.title}</h3>
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === goal.id ? null : goal.id)}
                                        className="p-1 hover:bg-gray-100 rounded"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>

                                    {openMenuId === goal.id && (
                                        <div className="absolute right-0 mt-1 w-24 bg-white border rounded-md shadow-lg z-10">
                                            <button className="w-full px-3 py-2 text-left hover:bg-gray-100">
                                                Edit
                                            </button>
                                            <button className="w-full px-3 py-2 text-left hover:bg-gray-100 text-red-500">
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">{goal.description}</p>
                        </div>

                        <div className="p-4 pt-0">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>
                                        ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                                    </span>
                                    <span className="font-medium">{progressPercentage}%</span>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full bg-blue-600"
                                        style={{ width: `${progressPercentage}%` }}
                                    />
                                </div>

                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>${(goal.targetAmount - goal.currentAmount).toLocaleString()} left</span>
                                    <span>
                                        {daysLeft} {daysLeft === 1 ? "day" : "days"} left
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 pt-0">
                            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                                <PlusCircle className="h-4 w-4" />
                                Add Funds
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
        
    )
}