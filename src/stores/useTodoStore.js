import create from "zustand";
import {TodoFactoryService} from "../services/todo-factory.service";
import {StatusFilter} from "../shared/constants/status-filter.constant";

export const useTodoStore = create((set, get) => ({
    todos: [],
    getFilteredTodos: (status) => {
        const {todos} = get();

        return todos.filter( todo =>
            StatusFilter[status] !== undefined ? todo.isCompleted === StatusFilter[status]: true
        )
    },
    addTodo: (name) => {
        const {todos, hasTodoName} = get();
        if (hasTodoName(name)) {
            return;
        }
        const newTodo = TodoFactoryService.createTodo(name);

        set({
            todos: [...todos, newTodo]
        })
    },
    updateTodo: (todo) => {
        const { todos, hasTodoName } = get();

        const newTodos = todos.map((todoItem) => {
            if (todo.id === todoItem.id && hasTodoName(todo.name) && todo.isCompleted === todoItem.isCompleted) {
                return {...todoItem};
            }

            if (todo.id === todoItem.id) {
                return todo;
            }

            return todoItem;
        })

        set({
            todos: newTodos
        })
    },
    removeTodoById: (id) => {
        const {todos} = get();
        const newTodos = todos.filter(todo => todo.id !== id)

        set({
            todos: newTodos
        })
    },
    isAllComplete: () => {
        const {todos} = get();

        return !!todos.length && todos.every(todo => todo.isCompleted);
    },
    hasTodoName: (name) => {
        const {todos} = get();

        return todos.some(todo => todo.name === name);
    },
    toggleCompleteAllTodos: (isCompleted) => {
        const {todos} = get();
        const newTodos = todos.map(todo => ({...todo, isCompleted}))

        set({
            todos: newTodos
        })
    },
    clearCompleteTodos: () => {
        const {todos} = get();
        const newTodos = todos.filter(todo => !todo.isCompleted)

        set({
            todos: newTodos
        })
    }
}));