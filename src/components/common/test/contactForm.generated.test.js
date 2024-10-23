import { render, screen } from "@testing-library/react";
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
});
