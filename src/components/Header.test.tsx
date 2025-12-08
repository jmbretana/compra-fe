import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./Header";
import { AuthProvider } from "@auth/AuthContext";

// Mock the auth context
const mockAuthContext = {
  isAuthenticated: true,
  logout: vi.fn(),
  login: vi.fn(),
  user: null,
};

vi.mock("@auth/AuthContext", () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          {component}
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the header component", () => {
    renderWithProviders(<Header />);
    
    expect(screen.getByTestId("headerDOM")).toBeInTheDocument();
  });

  it("displays the logo", () => {
    renderWithProviders(<Header />);
    
    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
  });

  it("shows logout button when authenticated", () => {
    renderWithProviders(<Header />);
    
    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
  });

  it("calls logout function when logout button is clicked", () => {
    renderWithProviders(<Header />);
    
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);
    
    expect(mockAuthContext.logout).toHaveBeenCalledTimes(1);
  });

  it("toggles mobile menu when menu button is clicked", () => {
    renderWithProviders(<Header />);
    
    const menuButton = screen.getByLabelText(/open drawer/i);
    fireEvent.click(menuButton);
    
    // Check if mobile menu is visible
    expect(screen.getByText(/productos/i)).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    renderWithProviders(<Header />);
    
    expect(screen.getByText(/productos/i)).toBeInTheDocument();
  });
});
