import React from "react";
import Toggle from "./Toggle";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Toggle component should", () => {
  const mockedOnChange = jest.fn(() => { });

  it("render", () => {
    render(<Toggle isCheck={false} onChange={() => { }} />);
    expect(screen.getByTestId("toggle")).toBeInTheDocument();
  })

  it("be not checked when isCheck falsy", () => {
    render(<Toggle isCheck={false} onChange={() => { }} />);
    const toggle = screen.getByTestId('toggle');
    expect(toggle).not.toBeChecked();
  });
  it("be checked when isCheck truthy", () => {
    render(<Toggle isCheck onChange={() => { }} />);
    const toggle = screen.getByTestId('toggle');
    expect(toggle).toBeChecked();
  });

  it("execute onChange on toggle click", () => {
    render(<Toggle isCheck={false} onChange={mockedOnChange} />);
    const toggle = screen.getByTestId('toggle');
    
    userEvent.click(toggle);
    expect(mockedOnChange).toHaveBeenCalledTimes(1);
  });

});