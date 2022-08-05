import React from "react";
import TodoList from "./TodoList"
import {screen, render} from "@testing-library/react"
import {useTodoStore} from "../../stores/useTodoStore";
import userEvent from "@testing-library/user-event";
import {StatusNames} from "../../shared/enum/status-names.enum";

jest.mock("../../shared/components/toggle/Toggle", () => ({onChange}) => {
    return (
        <input data-testid="toggle-all"
                type={"checkbox"}
                onChange={onChange}/>
    )
})

jest.mock("./components/TodoItem", () => ({
                                              value,
                                              onChange = () => {},
                                              onRemove = () => {}
                                          }) => {
    return (
        <li data-testid="todo-item">
            <div className="view">
                <input data-testid="todo-check"
                       className="toggle"
                       type="checkbox"
                       onChange={() => onChange({...value, isCompleted: !value.isCompleted})} />
                <button className="destroy" data-testid="todo-delete" onClick={() => onRemove(value.id)} />
            </div>
        </li>
    )
})

describe("TodoList component", () => {
    const originalState = useTodoStore.getState();

    beforeEach(() => {
        useTodoStore.setState(originalState);
    })

    it("should render component", () => {
        render(<TodoList status={StatusNames.ALL}/>);

        expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    });

    it("should render todo item", () => {
        useTodoStore.setState({...originalState, todos: [
                {
                    id: '1',
                    name: "Test",
                    isCompleted: false
                }
            ]})

        render(<TodoList status={StatusNames.ALL}/>);

        expect(screen.getByTestId("todo-item")).toBeInTheDocument();
    });

    it("should delete todo item", async () => {
        useTodoStore.setState({...originalState, todos: [
                {
                    id: '1',
                    name: "Test",
                    isCompleted: false
                }
            ]})

        render(<TodoList status={StatusNames.ALL}/>);
        const deleteItem = screen.getByTestId("todo-delete");

        await userEvent.click(deleteItem);

        expect(screen.queryAllByTestId("todo-item").length).toBe(0);
    });

    it("should update todo item", async () => {
        useTodoStore.setState({...originalState, todos: [
                {
                    id: '1',
                    name: "Test",
                    isCompleted: false
                }
            ]})

        render(<TodoList status={StatusNames.ALL}/>);
        const todoCheck = screen.getByTestId("todo-check");

        await userEvent.click(todoCheck);

        expect(useTodoStore.getState().todos[0].isCompleted).toBeTruthy();
    });

    it("should toggle all todos", async () => {
        const todos = [
            {
                id: '1',
                name: "Test1",
                isCompleted: false
            },
            {
                id: '2',
                name: "Test2",
                isCompleted: false
            }
        ];

        const expectResult = [
            {
                id: '1',
                name: "Test1",
                isCompleted: true
            },
            {
                id: '2',
                name: "Test2",
                isCompleted: true
            }
        ];
        useTodoStore.setState({...originalState, todos})

        render(<TodoList status={StatusNames.ALL}/>);
        const btn = screen.getByTestId("toggle-all");

        await userEvent.click(btn);

        expect(useTodoStore.getState().todos).toEqual(expectResult);
    });
});