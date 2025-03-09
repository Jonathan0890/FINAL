import React from 'react';

const NotificationItem = ({ text, emoji, color }) => {
    const textColor = {
        blue: "text-blue-500",
        green: "text-green-500",
        red: "text-red-500"
    };

    return (
        <li className="flex items-center">
            <span className={textColor[color]}>{emoji}</span>
            <span className="ml-2">{text}</span>
        </li>
    );
};

export default NotificationItem;
