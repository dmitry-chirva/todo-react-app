import React from "react";
import AddTodos from "./AddTodos"
import {screen, render} from "@testing-library/react"
import {useTodoStore} from "../../stores/useTodoStore";
import userEvent from "@testing-library/user-event";

describe("AddTodo component", () => {
    const originalState = useTodoStore.getState();

    beforeEach(() => {
        useTodoStore.setState(originalState);
    })

    it("should render component", () => {
        render(<AddTodos/>);

        expect(screen.getByTestId("new-todo")).toBeInTheDocument();
    });

    it("should change todo name in input", async () => {
        render(<AddTodos/>);
        const inputType = 'Test';
        const expectedResult = 'Test';

        const input = screen.getByTestId("new-todo");

        await userEvent.type(input, inputType);

        expect(input).toHaveValue(expectedResult);
    });

    it("should reset todo name in input after Enter", async () => {
        render(<AddTodos/>);
        const inputType = 'Test';
        const inputEnterType = '{Enter}';
        const expectedResult = '';

        const input = screen.getByTestId("new-todo");

        await userEvent.type(input, inputType);
        await userEvent.type(input, inputEnterType);

        expect(input).toHaveValue(expectedResult);
    });

    it("should add todo name to store on Enter", async () => {
        render(<AddTodos/>);
        const inputType = 'Test';
        const inputEnterType = '{Enter}';

        const input = screen.getByTestId("new-todo");

        await userEvent.type(input, inputType);
        await userEvent.type(input, inputEnterType);

        expect(useTodoStore.getState().todos.length).toBe(1);
    });

    it("should not add the same todo name to store", async () => {
        render(<AddTodos/>);
        const inputType = 'Test';
        const inputEnterType = '{Enter}';

        const input = screen.getByTestId("new-todo");

        await userEvent.type(input, inputType);
        await userEvent.type(input, inputEnterType);

        await userEvent.type(input, inputType);
        await userEvent.type(input, inputEnterType);

        expect(useTodoStore.getState().todos.length).toBe(1);
    });

    it("should not add empty todo", async () => {
        render(<AddTodos/>);
        const inputEnterType = '{Enter}';

        const input = screen.getByTestId("new-todo");

        await userEvent.type(input, inputEnterType);

        expect(useTodoStore.getState().todos.length).toBe(0);
    });
});