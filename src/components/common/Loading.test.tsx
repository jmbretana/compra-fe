import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "./Loading";

describe("Loading Component", () => {
  it("renders the loading component", () => {
    render(<Loading />);
    
    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toBeInTheDocument();
  });

  it("displays circular progress indicator", () => {
    render(<Loading />);
    
    const circularProgress = screen.getByRole("progressbar");
    expect(circularProgress).toHaveClass("MuiCircularProgress-root");
  });

  it("has correct container styling", () => {
    const { container } = render(<Loading />);
    
    const boxElement = container.firstChild as HTMLElement;
    expect(boxElement).toHaveStyle({
      display: "flex",
      justifyContent: "center",
      padding: "40px",
    });
  });

  it("renders without any props", () => {
    expect(() => render(<Loading />)).not.toThrow();
  });
});
