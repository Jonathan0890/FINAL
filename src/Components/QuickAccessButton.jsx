import React from 'react';

const QuickAccessButton = ({ text, emoji, color }) => {
    const bgColor = {
        blue: "bg-blue-500 hover:bg-blue-600",
        green: "bg-green-500 hover:bg-green-600",
        purple: "bg-purple-500 hover:bg-purple-600",
        red: "bg-red-500 hover:bg-red-600"
    };

    return (
        <button className={`${bgColor[color]} text-white py-2 px-4 rounded-lg shadow-md flex items-center justify-center transition`}>
            <span className="mr-2">{emoji}</span> {text}
        </button>
    );
};

export default QuickAccessButton;
