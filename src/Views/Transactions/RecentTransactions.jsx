

const transactions = [/* ... (mismo array de transacciones) ... */]

export function RecentTransactions() {
    return (
        <div className="space-y-4">
            {transactions.map((transaction) => (
                <article
                    key={transaction.id}
                    className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                            <transaction.icon className="h-4 w-4 text-gray-700" />
                        </div>
                        <div>
                            <h3 className="font-medium text-sm">{transaction.description}</h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {transaction.category} •
                                {new Date(transaction.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                    <span className={`font-medium text-sm ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                        }`}>
                        {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                </article>
            ))}
        </div>
    )
}