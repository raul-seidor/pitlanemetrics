import { render, screen, fireEvent  } from "@testing-library/react";
import ContactForm from "../contactForm";

describe("ContactForm", () => {

  beforeEach(() => {
    render(<ContactForm />);
  });

  test("have a heading", () => {
    const headingElement = screen.getByRole("heading", { level: 2 });
    expect(headingElement).toBeInTheDocument();
  });

  test("have a description", () => {
    const paragraphElement = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'p';
    });
    expect(paragraphElement).toBeInTheDocument();
  })

  test("renders all form fields", () => {
    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("phone")).toBeInTheDocument();
    expect(screen.getByTestId("dni")).toBeInTheDocument();
    expect(screen.getByTestId("gender")).toBeInTheDocument();
    expect(screen.getByTestId("birthDate")).toBeInTheDocument();
  });

  test("displays error message on invalid phone number", () => {
    const phoneField = screen.getByTestId("phone");
    fireEvent.change(phoneField, { target: { value: "123" } });
    expect(screen.getByText("phoneError")).toBeInTheDocument();
  });

  test("displays error message on invalid DNI", () => {
    const dniField = screen.getByTestId("dni");
    fireEvent.change(dniField, { target: { value: "12345678X" } });
    expect(screen.getByText("dniError")).toBeInTheDocument();
  });

  test("shows success snackbar message on successful form submission", () => {
    fireEvent.change(screen.getByTestId("firstName"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("lastName"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByTestId("phone"), { target: { value: "123456789" } });
    fireEvent.change(screen.getByTestId("dni"), { target: { value: "12345678Z" } });
    fireEvent.change(screen.getByTestId("gender"), { target: { value: "male" } });
    fireEvent.change(screen.getByTestId("birthDate"), { target: { value: "1990-01-01" } });

    const submitButton = screen.getByRole("button", { name: "contactFormSubmitBtn" });
    fireEvent.click(submitButton);

    expect(screen.getByText("contactFormSuccessMessage")).toBeInTheDocument();
  });

  test("shows error snackbar message on unsuccessful form submission", () => {
    fireEvent.change(screen.getByTestId("firstName"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("lastName"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByTestId("phone"), { target: { value: "123" } });
    fireEvent.change(screen.getByTestId("dni"), { target: { value: "12345678X" } });
    fireEvent.change(screen.getByTestId("gender"), { target: { value: "male" } });
    fireEvent.change(screen.getByTestId("birthDate"), { target: { value: "1990-01-01" } });
  
    const submitButton = screen.getByRole("button", { name: "contactFormSubmitBtn" });
    fireEvent.click(submitButton);
  
    expect(screen.getByText("contactFormErrorMessage")).toBeInTheDocument();
  });
  
});
