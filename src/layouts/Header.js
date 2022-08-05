import React from "react";

export default function Header ({ children }) {
    return (
        <header className="header">
            <h1>todos</h1>
            { children }
        </header>
    )
}