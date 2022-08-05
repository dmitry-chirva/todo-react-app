import React from "react";
import Toggle from "../../shared/components/toggle/Toggle";
import TodoItem from "./components/TodoItem";
import {useTodoStore} from "../../stores/useTodoStore";
import PropTypes from "prop-types";

export default function TodoList ({ status }) {
    const [
        getFilteredTodos,
        isAllComplete,
        updateTodo,
        removeTodoById,
        toggleCompleteAllTodos
    ] = useTodoStore(state => [
        state.getFilteredTodos,
        state.isAllComplete,
        state.updateTodo,
        state.removeTodoById,
        state.toggleCompleteAllTodos
    ]);

    const handleToggleCompeteAllTodos = ({target}) => {
        toggleCompleteAllTodos(target.checked);
    }

    const handleUpdateTodo = (todo) => {
        updateTodo(todo);
    }

    const handleRemoveTodo = (id) => {
        removeTodoById(id);
    }

    return (
        <>
            <Toggle isCheck={isAllComplete()} onChange={handleToggleCompeteAllTodos} />
            <ul className="todo-list" data-testid="todo-list">
                {
                    getFilteredTodos(status).map(todo => (
                        <TodoItem key={todo.id}
                                  value={todo}
                                  onChange={handleUpdateTodo}
                                  onRemove={handleRemoveTodo}/>
                    ))
                }
            </ul>
        </>
    )
}

TodoList.propTypes = {
    status: PropTypes.string.isRequired
}