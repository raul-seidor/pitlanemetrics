import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProfileForm from "../profileForm";

describe("ProfileForm", () => {
  beforeEach(() => {
    render(
      <ProfileForm initialData={{}} onCancel={jest.fn()} onSave={jest.fn()} />
    );
  });

  test("renders the form fields", () => {
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("nickname")).toBeInTheDocument();
  });

  test("displays error message when email is required", () => {
    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("nickname"), {
      target: { value: "Johnny" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "profileFormSubmitBtn" })
    );

    expect(screen.getByText("emailErrorRequired")).toBeInTheDocument();
  });

  test("displays error message when email format is invalid", () => {
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("nickname"), {
      target: { value: "Johnny" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "profileFormSubmitBtn" })
    );

    expect(screen.getByText("emailErrorFormat")).toBeInTheDocument();
  });

  test("displays error message when name is required", () => {
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("nickname"), {
      target: { value: "Johnny" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "profileFormSubmitBtn" })
    );

    expect(screen.getByText("nameErrorRequired")).toBeInTheDocument();
  });

  test("displays error message when nickname is required", () => {
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "John Doe" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "profileFormSubmitBtn" })
    );

    expect(screen.getByText("nicknameErrorRequired")).toBeInTheDocument();
  });

  test("saves user profile to sessionStorage on form submit", () => {
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("nickname"), {
      target: { value: "Johnny" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "profileFormSubmitBtn" })
    );

    const storedProfile = sessionStorage.getItem("userProfile");
    expect(storedProfile).toBeTruthy();
    expect(JSON.parse(storedProfile)).toEqual({
      email: "test@example.com",
      name: "John Doe",
      nickname: "Johnny",
      errors: {},
    });
  });
});
