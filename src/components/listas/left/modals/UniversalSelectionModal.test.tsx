import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import UniversalSelectionModal from "./UniversalSelectionModal";
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

describe("UniversalSelectionModal Component", () => {
  const mockOnClose = vi.fn();
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("with Bookmark items", () => {
    const mockBookmarks: Bookmark[] = [
      { _id: "1", descripcion: "azucar" },
      { _id: "2", descripcion: "arroz" },
      { _id: "3", descripcion: "aceite" },
      { _id: "4", descripcion: "banana" },
      { _id: "5", descripcion: "leche" },
    ];

    it("renders the modal when open is true", () => {
      render(
        <UniversalSelectionModal
          open={true}
          items={mockBookmarks}
          title="Favoritos"
          searchPlaceholder="Buscar favorito..."
          emptyMessage="No se encontraron favoritos"
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText("Favoritos")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Buscar favorito...")
      ).toBeInTheDocument();
    });

    it("groups items by first letter", () => {
      render(
        <UniversalSelectionModal
          open={true}
          items={mockBookmarks}
          title="Favoritos"
          searchPlaceholder="Buscar favorito..."
          emptyMessage="No se encontraron favoritos"
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      // Check for grouped letters
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();
      expect(screen.getByText("L")).toBeInTheDocument();
    });

    it("filters items based on search term", () => {
      render(
        <UniversalSelectionModal
          open={true}
          items={mockBookmarks}
          title="Favoritos"
          searchPlaceholder="Buscar favorito..."
          emptyMessage="No se encontraron favoritos"
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      const searchInput = screen.getByPlaceholderText("Buscar favorito...");
      fireEvent.change(searchInput, { target: { value: "ace" } });

      // Should only show items containing "ace"
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.queryByText("B")).not.toBeInTheDocument();
      expect(screen.queryByText("L")).not.toBeInTheDocument();
    });
  });

  describe("with string items", () => {
    const mockBrands = ["Nike", "Adidas", "Puma", "Reebok", "New Balance"];

    it("handles string items correctly", () => {
      render(
        <UniversalSelectionModal
          open={true}
          items={mockBrands}
          title="Marcas"
          searchPlaceholder="Buscar marca..."
          emptyMessage="No se encontraron marcas"
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText("Marcas")).toBeInTheDocument();
      expect(screen.getByText("A")).toBeInTheDocument(); // Adidas
      expect(screen.getByText("N")).toBeInTheDocument(); // Nike, New Balance
    });

    it("calls onSelect with correct string value", () => {
      render(
        <UniversalSelectionModal
          open={true}
          items={mockBrands}
          title="Marcas"
          searchPlaceholder="Buscar marca..."
          emptyMessage="No se encontraron marcas"
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      // First expand the "N" accordion
      const accordionN = screen.getByText("N").closest("button");
      fireEvent.click(accordionN!);

      // Then click on "Nike"
      const nikeItem = screen.getByText("Nike");
      fireEvent.click(nikeItem);

      expect(mockOnSelect).toHaveBeenCalledWith("Nike");
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe("with simple object items", () => {
    const mockProducts = [
      { descripcion: "producto1" },
      { descripcion: "producto2" },
      { descripcion: "artículo especial" },
    ];

    it("handles simple object items correctly", () => {
      render(
        <UniversalSelectionModal
          open={true}
          items={mockProducts}
          title="Productos"
          searchPlaceholder="Buscar producto..."
          emptyMessage="No se encontraron productos"
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText("Productos")).toBeInTheDocument();
      expect(screen.getByText("P")).toBeInTheDocument(); // producto1, producto2
      expect(screen.getByText("A")).toBeInTheDocument(); // artículo especial
    });
  });

  it("shows empty message when no items match search", () => {
    const mockItems = ["test1", "test2"];
    
    render(
      <UniversalSelectionModal
        open={true}
        items={mockItems}
        title="Test"
        searchPlaceholder="Buscar..."
        emptyMessage="No se encontraron elementos"
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    const searchInput = screen.getByPlaceholderText("Buscar...");
    fireEvent.change(searchInput, { target: { value: "xyz" } });

    expect(screen.getByText("No se encontraron elementos")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <UniversalSelectionModal
        open={true}
        items={["test"]}
        title="Test"
        searchPlaceholder="Buscar..."
        emptyMessage="No hay elementos"
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("shows count of total items in footer", () => {
    const mockItems = ["item1", "item2", "item3"];
    
    render(
      <UniversalSelectionModal
        open={true}
        items={mockItems}
        title="Test"
        searchPlaceholder="Buscar..."
        emptyMessage="No hay elementos"
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText("3 elementos disponibles")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(
      <UniversalSelectionModal
        open={false}
        items={["test"]}
        title="Test"
        searchPlaceholder="Buscar..."
        emptyMessage="No hay elementos"
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });
});
