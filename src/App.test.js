import React from "react";
import App from "./App"
import { screen, render } from "@testing-library/react"
import { StatusNames } from "./shared/enum/status-names.enum";

jest.mock("./features/todo-filter/TodoFilter", () => () => {
    return (
        <div>Hello World</div>
    )
})

describe("App component", () => {
    it("should render component", () => {
        render(<App status={StatusNames.ALL} />);

        expect(screen.getByTestId("todoapp")).toBeInTheDocument();
    })
});