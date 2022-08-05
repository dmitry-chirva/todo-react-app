import React from "react";
import App from "./App"
import {screen, render} from "@testing-library/react"


jest.mock("./features/todo-filter/TodoFilter", () => () => {
    return (
        <div>Hello World</div>
    )
})

describe("App component", () => {
    it("should render component", () => {
        render(<App status={""} />);

        expect(screen.getByTestId("todoapp")).toBeInTheDocument();
    })
});