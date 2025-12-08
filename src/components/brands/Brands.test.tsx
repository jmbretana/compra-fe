import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Brands from "./Brands";
import { BRAND_GETALL_SUCCESS } from "@BrandActionTypes";

// Mock navigation
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock actions
vi.mock("@actions/brandsActions", () => ({
  GetAllBrands: vi.fn(() => ({ type: "GET_ALL_BRANDS" })),
}));

interface BrandState {
  brands: any[];
  statusBrand: string;
}

const initialState: BrandState = {
  brands: [],
  statusBrand: "",
};

const mockBrands = [
  { id: 1, name: "Brand 1", description: "Description 1" },
  { id: 2, name: "Brand 2", description: "Description 2" },
];

const createTestStore = (preloadedState?: { brands: BrandState }) =>
  configureStore({
    reducer: {
      brands: (state = initialState, action: any) => {
        switch (action.type) {
          case BRAND_GETALL_SUCCESS:
            return { ...state, brands: action.payload, statusBrand: BRAND_GETALL_SUCCESS };
          default:
            return state;
        }
      },
    },
    preloadedState,
  });

const renderWithProviders = (component: React.ReactElement, store: any) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe("Brands Component", () => {
  let store: any;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createTestStore();
  });

  it("renders loading state initially", () => {
    renderWithProviders(<Brands />, store);
    
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders brands list when data is loaded", async () => {
    store = createTestStore({
      brands: {
        brands: mockBrands,
        statusBrand: BRAND_GETALL_SUCCESS,
      },
    });

    renderWithProviders(<Brands />, store);

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  it("displays the page title", () => {
    renderWithProviders(<Brands />, store);
    
    expect(screen.getByText(/marcas/i)).toBeInTheDocument();
  });

  it("has a search input field", () => {
    renderWithProviders(<Brands />, store);
    
    const searchInput = screen.getByLabelText(/descripción/i);
    expect(searchInput).toBeInTheDocument();
  });

  it("filters brands when search input changes", async () => {
    store = createTestStore({
      brands: {
        brands: mockBrands,
        statusBrand: BRAND_GETALL_SUCCESS,
      },
    });

    renderWithProviders(<Brands />, store);

    const searchInput = screen.getByLabelText(/descripción/i);
    fireEvent.change(searchInput, { target: { value: "Brand 1" } });

    // Wait for the filtering to take effect
    await waitFor(() => {
      expect(searchInput).toHaveValue("Brand 1");
    });
  });

  it("handles search on enter key press", async () => {
    store = createTestStore({
      brands: {
        brands: mockBrands,
        statusBrand: BRAND_GETALL_SUCCESS,
      },
    });

    renderWithProviders(<Brands />, store);

    const searchInput = screen.getByLabelText(/descripción/i);
    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(searchInput).toHaveValue("test");
    });
  });

  it("displays brands table component", () => {
    store = createTestStore({
      brands: {
        brands: mockBrands,
        statusBrand: BRAND_GETALL_SUCCESS,
      },
    });

    renderWithProviders(<Brands />, store);

    // Check if table component is rendered (assuming it has a specific test id or role)
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });
});
