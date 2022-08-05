import React from "react";
import {useTodoStore} from "../../stores/useTodoStore";
import {NavLink} from "react-router-dom";

export default function TodoFilter () {
    const [
        todos,
        clearCompleteTodos,
    ] = useTodoStore(state => [
        state.todos,
        state.clearCompleteTodos
    ]);

    return (
        <footer className="footer">
            <span className="todo-count"><strong>{todos.length}</strong> item left</span>
            <ul className="filters">
                <li>
                    <NavLink to="/"
                             className={({isActive}) => isActive ? 'selected': null}>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/active"
                             className={({isActive}) => isActive ? 'selected': null}>
                        Active
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/completed"
                             className={({isActive}) => isActive ? 'selected': null}>
                        Completed
                    </NavLink>
                </li>
            </ul>
            <button className="clear-completed" onClick={clearCompleteTodos}>Clear completed</button>
        </footer>
    )
}