import React from "react";
import { render } from "@testing-library/react";
import Questions from "../Components/Questions";

test("renders the empty post message without any posts present", () => {
  const { getByText } = render(<Questions empty={true} posts={[]} />);
  const noPosts = getByText(/Be the first to ask a question/i);
  expect(noPosts).toBeInTheDocument();
});

test("renders the list of posts present", () => {
  const { getByText } = render(
    <Questions empty={false} posts={[{ _id: 0, title: "Random post" }]} />
  );
  const postTitle = getByText(/random post/i);
  expect(postTitle).toBeInTheDocument();
});
