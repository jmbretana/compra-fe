import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";

describe("Footer Component", () => {
  it("renders the footer component", () => {
    render(<Footer />);
    
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("displays the current year", () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it("displays copyright text", () => {
    render(<Footer />);
    
    expect(screen.getByText(/coudefly/i)).toBeInTheDocument();
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });

  it("contains a link to Coudefly contact page", () => {
    render(<Footer />);
    
    const link = screen.getByRole("link", { name: /coudefly/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://coudefly.netlify.app/#contact");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("has correct styling structure", () => {
    render(<Footer />);
    
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveStyle({
      textAlign: "center",
      padding: "0.5em",
    });
  });
});
