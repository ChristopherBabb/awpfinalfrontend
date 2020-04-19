import React from "react";
import { render } from "@testing-library/react";
import App from "../Components/App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const siteTitle = getByText(/Q and A/i);
  expect(siteTitle).toBeInTheDocument();
});
