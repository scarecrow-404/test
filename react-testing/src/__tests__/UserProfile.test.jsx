import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfile from "../components/userProfile/UserProfile";

global.fetch = jest.fn();

describe("UserProfile Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("shows loading state initially", () => {
    render(<UserProfile userId="123" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays user data when fetch is successful", async () => {
    const mockUser = {
      name: "Test User",
      email: "Test@user.com",
    };

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser),
      })
    );

    render(<UserProfile userId="123" />);
    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });
  });
});
