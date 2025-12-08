import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import Input from "./Input";

describe("Input Component", () => {
  const defaultProps = {
    id: "test-input",
    name: "testInput",
    label: "Test Input",
  };

  it("renders the input component", () => {
    render(<Input {...defaultProps} />);
    
    const input = screen.getByLabelText(/test input/i);
    expect(input).toBeInTheDocument();
  });

  it("displays the correct label", () => {
    render(<Input {...defaultProps} />);
    
    expect(screen.getByLabelText(/test input/i)).toBeInTheDocument();
  });

  it("shows required indicator when required prop is true", () => {
    render(<Input {...defaultProps} required={true} />);
    
    const input = screen.getByLabelText(/test input/i);
    expect(input).toBeRequired();
  });

  it("displays the provided value", () => {
    render(<Input {...defaultProps} value="test value" />);
    
    const input = screen.getByDisplayValue("test value");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    const mockOnChange = vi.fn();
    render(<Input {...defaultProps} onChange={mockOnChange} />);
    
    const input = screen.getByLabelText(/test input/i);
    fireEvent.change(input, { target: { value: "new value" } });
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("calls onBlur when input loses focus", () => {
    const mockOnBlur = vi.fn();
    render(<Input {...defaultProps} onBlur={mockOnBlur} />);
    
    const input = screen.getByLabelText(/test input/i);
    fireEvent.blur(input);
    
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it("calls onEnterPress when Enter key is pressed", () => {
    const mockOnEnterPress = vi.fn();
    render(<Input {...defaultProps} onEnterPress={mockOnEnterPress} value="test" />);
    
    const input = screen.getByLabelText(/test input/i);
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    
    expect(mockOnEnterPress).toHaveBeenCalledWith("test");
  });

  it("does not call onEnterPress for other keys", () => {
    const mockOnEnterPress = vi.fn();
    render(<Input {...defaultProps} onEnterPress={mockOnEnterPress} />);
    
    const input = screen.getByLabelText(/test input/i);
    fireEvent.keyDown(input, { key: "Space", code: "Space" });
    
    expect(mockOnEnterPress).not.toHaveBeenCalled();
  });

  it("has correct size attribute", () => {
    render(<Input {...defaultProps} />);
    
    const input = screen.getByLabelText(/test input/i);
    expect(input).toHaveAttribute("size");
  });

  it("is full width", () => {
    const { container } = render(<Input {...defaultProps} />);
    
    const textField = container.querySelector(".MuiTextField-root");
    expect(textField).toHaveClass("MuiTextField-fullWidth");
  });
});
