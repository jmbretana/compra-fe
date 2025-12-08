import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import AmountsComponent from "./Amounts";
import { AMOUNT_GETALL_SUCCESS } from "@AmountActionTypes";

interface AmountState {
  amounts: any[];
  statusAmount: string;
}

const initialState: AmountState = {
  amounts: [],
  statusAmount: "",
};

const createTestStore = (preloadedState?: { amounts: AmountState }) =>
  configureStore({
    reducer: {
      amounts: (state = initialState, action: any) => {
        if (action.type === AMOUNT_GETALL_SUCCESS) {
          return { ...state, amounts: action.payload };
        }
        return state;
      },
    },
    preloadedState,
  });

describe("AmountsComponent", () => {
  let store: any;

  beforeEach(() => {
    store = createTestStore();
  });

  it("renders loading state initially", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AmountsComponent />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders the title and add button", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AmountsComponent />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Medidas")).toBeInTheDocument();
    expect(screen.getByText("Agregar")).toBeInTheDocument();
  });

  it("dispatches GetAllAmounts action on mount", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AmountsComponent />
        </BrowserRouter>
      </Provider>
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(
      expect.objectContaining({ type: "GET_ALL_AMOUNTS" })
    );
  });

  it("renders AmountsTableComponent when data is loaded", () => {
    store = createTestStore({
      amounts: {
        amounts: [{ id: "1", name: "Amount 1" }],
        statusAmount: AMOUNT_GETALL_SUCCESS,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <AmountsComponent />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Amount 1")).toBeInTheDocument();
  });

  it("navigates to the correct route when add button is clicked", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <AmountsComponent />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Agregar"));
    expect(mockNavigate).toHaveBeenCalledWith("/amount/new");
  });
});
