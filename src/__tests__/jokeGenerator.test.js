import React from "react";
import { render, Simulate, wait } from "react-testing-library";
import "dom-testing-library/extend-expect";
import JokeGenerator from "../jokeGenerator";
import Joke from "../joke";
import * as axios from "axios";
import MockAxios from "axios-mock-adapter";

const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });
afterAll(() => mock.restore());

test("Joke component receives props and then render the text", () => {
  const { getByTestId } = render(
    <Joke text="The funniest joke of this year." />
  );
  expect(getByTestId("joke-text")).toHaveTextContent(
    "The funniest joke of this year."
  );
});

test("JokeGenerator component fetches a random joke a renders it", async () => {
  //   const { queryByText } = render();

  mock.onGet().replyOnce(200, {
    value: {
      joke: "Really funny Joke!",
    },
  });
  const { getByText, queryByTestId, queryByText } = render(<JokeGenerator />);
  await wait(() => expect(queryByText("Loading....")).not.toBeInTheDOM());
  //   expect(queryByTestId("joke-text")).toBeInTheDOM();

  expect(getByText("You haven't loaded any joke yet")).toBeInTheDOM();

  //   Simulate.click(getByText("Load a random joke"));
  //   expect(queryByText("You haven't loaded any joke yet")).not.toBeInTheDOM();
  //   expect(queryByText("Loading....")).toBeInTheDOM();
});
