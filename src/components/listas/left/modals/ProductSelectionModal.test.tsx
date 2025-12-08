import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductSelectionModal from "./ProductSelectionModal";
import { Bookmark } from "@interfaces";

// Mock the utils module
vi.mock("@utils/utils", () => ({
  capitalizeFirstLetter: (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1),
}));

// Mock the colors
vi.mock("@values/colors", () => ({
  COLORS: {
    grey_300: "#ccc",
    grey_100: "#f5f5f5",
    blue: "#1976d2",
  },
}));

// Mock the common components
vi.mock("@common", () => ({
  TypographyCommon: ({ text, ...props }: any) => <span {...props}>{text}</span>,
}));

const mockBookmarks: Bookmark[] = [
  { _id: "1", descripcion: "azucar" },
  { _id: "2", descripcion: "arroz" },
  { _id: "3", descripcion: "aceite" },
  { _id: "4", descripcion: "banana" },
  { _id: "5", descripcion: "leche" },
];

describe("ProductSelectionModal Component", () => {
  const mockOnClose = vi.fn();
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the modal when open is true", () => {
    render(
      <ProductSelectionModal
        open={true}
        bookmarks={mockBookmarks}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText("Seleccionar Articulo")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Buscar articulo...")
    ).toBeInTheDocument();
  });

  it("does not render the modal when open is false", () => {
    render(
      <ProductSelectionModal
        open={false}
        bookmarks={mockBookmarks}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.queryByText("Seleccionar Articulo")).not.toBeInTheDocument();
  });

  it("groups products by first letter", () => {
    render(
      <ProductSelectionModal
        open={true}
        bookmarks={mockBookmarks}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    // Check for grouped letters
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("L")).toBeInTheDocument();
  });

  it("filters products based on search term", () => {
    render(
      <ProductSelectionModal
        open={true}
        bookmarks={mockBookmarks}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    const searchInput = screen.getByPlaceholderText("Buscar articulo...");
    fireEvent.change(searchInput, { target: { value: "ace" } });

    // Should only show products containing "ace"
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.queryByText("B")).not.toBeInTheDocument();
    expect(screen.queryByText("L")).not.toBeInTheDocument();
  });

  it("calls onSelect and onClose when a product is selected", () => {
    render(
      <ProductSelectionModal
        open={true}
        bookmarks={mockBookmarks}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    // First expand the "A" accordion
    const accordionA = screen.getByText("A").closest("button");
    fireEvent.click(accordionA!);

    // Then click on "aceite"
    const aceiteItem = screen.getByText("Aceite");
    fireEvent.click(aceiteItem);

    expect(mockOnSelect).toHaveBeenCalledWith("aceite");
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <ProductSelectionModal
        open={true}
        bookmarks={mockBookmarks}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("shows count of products in each group", () => {
    render(
      <ProductSelectionModal
        open={true}
        bookmarks={mockBookmarks}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    // A group should have 3 items (azucar, arroz, aceite)
    expect(screen.getByText("(3)")).toBeInTheDocument();
    // B group should have 1 item (banana)
    expect(screen.getByText("(1)")).toBeInTheDocument();
    // L group should have 1 item (leche)
    expect(screen.getByText("(1)")).toBeInTheDocument();
  });

  it("displays 'No se encontraron articulos' when no products match search", () => {
    render(
      <ProductSelectionModal
        open={true}
        bookmarks={mockBookmarks}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    const searchInput = screen.getByPlaceholderText("Buscar articulo...");
    fireEvent.change(searchInput, { target: { value: "xyz" } });

    expect(screen.getByText("No se encontraron articulos")).toBeInTheDocument();
  });
});
