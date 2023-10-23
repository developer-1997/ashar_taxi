import * as React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import MaskedInput from "../src/MaskedInput";

const screenProps = {
  name: "MaskedInput",
  label: "mockLabel",
  value: "mockValue",
  onChange: jest.fn(),
  options: {},
};

describe("MaskedInput", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should render the label and input", async () => {
    render(<MaskedInput {...screenProps} />);

    const input = screen.queryByTestId("MaskedInput");
    const label = screen.queryByText(/mockLabel/i);

    expect(input).toBeTruthy();
    expect(label).toBeTruthy();
  });

  it("should call the onChange prop when a change event is fired", async () => {
    render(<MaskedInput {...screenProps} />);
    const input = screen.queryByTestId("MaskedInput");

    act(() => {
      input && fireEvent.change(input, { target: { value: "1234" } });
    });

    expect(screenProps.onChange).toBeCalled();
  });
});
