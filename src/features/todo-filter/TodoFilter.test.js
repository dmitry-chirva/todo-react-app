import TodoFilter from "./TodoFilter";
import { screen, render } from "@testing-library/react";
import { useTodoStore } from "../../stores/useTodoStore";
import userEvent from "@testing-library/user-event";
jest.mock("react-router-dom");

describe("TodoFilter should", () => {
  const originalState = useTodoStore.getState();
  beforeEach(() => {
    useTodoStore.setState(originalState);
  })

  it("render", () => {
    render(<TodoFilter />);
    expect(screen.getByTestId("todo-filter")).toBeInTheDocument();
  });

  it("show correct amount of todos", () => {
    const todos = [
      {
        id: 1,
        text: "test1",
        isCompleted: true,
      },
      {
        id: 2,
        text: "test2",
        isCompleted: false,
      }
    ]
    useTodoStore.setState({ todos });
    render(<TodoFilter />);
    const span = screen.getByTestId("todo-count");
    expect(span.textContent).toBe('2');
  });

  it("clear todos on button click", () => {
    const todos = [
      {
        id: 1,
        text: "test1",
        isCompleted: true,
      }
    ]
    useTodoStore.setState({ todos });
    render(<TodoFilter />);
    const button = screen.getByTestId("todo-clear");

    expect(useTodoStore.getState().todos.length).toBe(1);
    userEvent.click(button);
    expect(useTodoStore.getState().todos.length).toBe(0);
  });

  it("render filter with items", ()=>{
    render(<TodoFilter />);
    const filter = screen.getByTestId("todo-filters");
    expect(filter).toBeInTheDocument();
    expect(filter.children.length).toBe(3);
  })
});
