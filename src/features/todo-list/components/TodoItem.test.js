import React from "react";
import TodoItem from "./TodoItem"
import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event";

describe("TodoItem component should", () => {
  const mockedRemove = jest.fn(() => { });
  const mockedChange = jest.fn(() => { });

  it("render", () => {
    render(<TodoItem
      value
      onChange={() => { }}
      onRemove={() => { }}
    />);
    expect(screen.getByTestId("todo-item")).toBeInTheDocument();
  });

  it("toggle item to editing mode on double click", async () => {
    render(<TodoItem
      value
      onChange={() => { }}
      onRemove={() => { }}
    />);
    const item = screen.getByTestId("todo-item");
    
    expect(item).not.toHaveClass("editing");
    userEvent.dblClick(item);
    expect(item).toHaveClass("editing");
  });

  it("execute onRemove with properties on delete button click", async () => {
    const item = {
      id: "1",
      name: "test1",
      isCompleted: false
    };
    render(<TodoItem
      value={item}
      onChange={mockedChange}
      onRemove={mockedRemove}
    />);
    const button = screen.getByTestId("todo-delete");
    userEvent.click(button);

    expect(mockedRemove).toHaveBeenCalledTimes(1);
    expect(mockedRemove).toHaveBeenCalledWith("1");
  });

  it("have proper value of label", ()=>{
    const item = {
      id: "1",
      name: "test1",
      isCompleted: false
    };
    render(<TodoItem
      value={item}
      onChange={() => { }}
      onRemove={() => { }}
    />);
    const label = screen.getByTestId("todo-label");
    expect(label.textContent).toBe("test1");
  });

  it("execute onChange with properties on item change", async () => {
    const item = {
      id: "1",
      name: "test1",
      isCompleted: false
    };
    const expectedItem = {
      ...item,
      isCompleted: !item.isCompleted
    }
    render(<TodoItem
      value={item}
      onChange={mockedChange}
      onRemove={mockedRemove}
    />);
    const checkbox = screen.getByTestId("todo-checkbox");
    userEvent.click(checkbox);

    expect(mockedChange).toHaveBeenCalledTimes(1);
    expect(mockedChange).toHaveBeenCalledWith(expectedItem);
  });

  it("have proper checkbox value", async () => {
    const item = {
      id: "1",
      name: "test1",
      isCompleted: false
    };
    render(<TodoItem
      value={item}
      onChange={() => { }}
      onRemove={() => { }}
    />);
    const checkbox = screen.getByTestId("todo-checkbox");

    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  
  });

  it("have proper input value",()=>{
    const item = {
      id: "1",
      name: "test1",
      isCompleted: false
    };
    render(<TodoItem
      value={item}
      onChange={mockedChange}
      onRemove={mockedRemove}
    />);
    const input = screen.getByTestId("todo-input");
    expect(input.value).toBe("test1");
  });

  it("update item on input change", async () => {
    const item = {
      id: "1",
      name: "test1",
      isCompleted: false
    };
    render(<TodoItem
      value={item}
      onChange={mockedChange}
      onRemove={mockedRemove}
      />);
    const input = screen.getByTestId("todo-input");
    userEvent.type(input, "234");

    expect(input.value).toBe("test1234");
  });
  
  it("execute onChange and remove editing mode on Enter keydown", async () => {
    const item = {
      id: "1",
      name: "test1",
      isCompleted: false
    };
    render(<TodoItem
      value={item}
      onChange={mockedChange}
      onRemove={mockedRemove}
      />);
    const todo = screen.getByTestId("todo-item");  
    const input = screen.getByTestId("todo-input");
    
    expect(input).not.toHaveFocus();
    
    userEvent.type(input, "{alt}");
    expect(mockedChange).toHaveBeenCalledTimes(0);

    userEvent.type(input, "{enter}");
    expect(mockedChange).toHaveBeenCalledTimes(1);
    
    expect(mockedChange).toHaveBeenCalledWith(item); 
    expect(todo).not.toHaveClass("editing");
    
    expect(input).toHaveFocus();
    
  }); 

  // check item update
  // input element to have value
  // chek if code && check if code+Enter
  // check to be on Enter key only
  // onChange isCalled(1)
  // isEditing should false
  // 
});