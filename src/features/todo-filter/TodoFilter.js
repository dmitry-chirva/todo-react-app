import React from "react";
import { useTodoStore } from "../../stores/useTodoStore";
import { NavLink } from "react-router-dom";

export default function TodoFilter() {
    const [
        todos,
        clearCompleteTodos,
    ] = useTodoStore(state => [
        state.todos,
        state.clearCompleteTodos
    ]);

    return (
        <footer className="footer" data-testid="todo-filter">
            <span className="todo-count"><strong data-testid="todo-count">{todos.length}</strong> item left</span>
            <ul className="filters" data-testid="todo-filters">
                <li>
                    <NavLink to="/"
                        className={({ isActive }) => isActive ? 'selected' : null}>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/active"
                        className={({ isActive }) => isActive ? 'selected' : null}>
                        Active
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/completed"
                        className={({ isActive }) => isActive ? 'selected' : null}>
                        Completed
                    </NavLink>
                </li>
            </ul>
            <button className="clear-completed" data-testid="todo-clear" onClick={clearCompleteTodos}>Clear completed</button>
        </footer>
    )
}