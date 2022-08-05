import React, {useState} from "react";
import {useTodoStore} from "../../stores/useTodoStore";

export default function AddTodos () {
    const [addTodo] = useTodoStore(state => [
        state.addTodo
    ]);

    const [todoName, setTodoName] = useState("");

    const handleChangeName = ({target}) => {
        setTodoName(target.value)
    }

    const handleEnter = ({code, target}) => {
        if (code === "Enter" && target.value) {
            addTodo(target.value);
            setTodoName("");
        }
    }

    return (
        <input className="new-todo"
               type="text"
               data-testid="new-todo"
               placeholder="What needs to be done?"
               onChange={handleChangeName}
               onKeyDown={handleEnter}
               value={todoName}
               autoFocus />
    )
}