import { SiReact, SiJavascript } from "react-icons/si"; // Import específico

// src/Utils/lib.jsx
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}