import React, { useEffect, useRef, useState } from "react";
import { TodoFactoryService } from "../../../services/todo-factory.service";
import { getClassNames } from "../../../shared/utils/string.utils";
import PropTypes from "prop-types";

export default function TodoItem(
    {
        value,
        onChange = () => { },
        onRemove = () => { }
    }
) {
    const [item, setItem] = useState(TodoFactoryService.defaultTodo());
    const [isEditingMode, setIsEditingMode] = useState(false);
    const inputRef = useRef();

    const todoItemClass = getClassNames("", {
        'completed': item.isCompleted,
        'editing': isEditingMode
    })

    useEffect(() => {
        if (value) {
            setItem(value);
        }
    }, [value]);

    const toggleCompleteTodo = ({ target }) => {
        const newItem = { ...item, isCompleted: target.checked };
        setItem(newItem);
        onChange(newItem);
    }

    const handleRemoveTodo = () => {
        onRemove(item?.id);
    }

    const handleChangeTodo = ({ code }) => {
        if (!code || code && code === 'Enter') {
            onChange(item);
            disableEditMode();
        }
    }

    const handleUpdateTodoName = ({ target }) => {
        const newItem = { ...item, name: target.value };
        setItem(newItem);
    }

    const enableEditMode = () => {
        setIsEditingMode(true);

        setTimeout(() => {
            inputRef.current.focus();
        }, 0)
    }

    const disableEditMode = () => {
        setIsEditingMode(false);
    }

    return (
        <>
            <li className={todoItemClass}
                onDoubleClick={enableEditMode}
                data-testid="todo-item">
                <div className="view">
                    <input className="toggle"
                        type="checkbox"
                        data-testid="todo-checkbox"
                        checked={item?.isCompleted}
                        onChange={toggleCompleteTodo} />
                    <label data-testid="todo-label">{item?.name}</label>
                    <button className="destroy" data-testid="todo-delete" onClick={handleRemoveTodo} />
                </div>
                <input ref={inputRef}
                    className="edit"
                    data-testid="todo-input"
                    value={item?.name}
                    onChange={handleUpdateTodoName}
                    onKeyDown={handleChangeTodo}
                    onBlur={handleChangeTodo}

                />
            </li>
        </>
    )
}

TodoItem.propTypes = {
    value: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired
    }),
    onChange: PropTypes.func,
    onRemove: PropTypes.func
}