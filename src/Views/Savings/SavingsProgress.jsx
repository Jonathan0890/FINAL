
const savingsGoals = [
    // ... (mantener el mismo array de metas)
]

export function SavingsProgress() {
    return (
        <div className="space-y-6">
            {savingsGoals.map((goal) => {
                const progressPercentage = Math.round((goal.currentAmount / goal.targetAmount) * 100)
                return (
                    <div key={goal.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium">{goal.title}</h3>
                            <span className="text-sm font-medium">
                                ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                            </span>
                        </div>

                        {/* Barra de progreso personalizada */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{progressPercentage}% complete</span>
                            <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}