import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import userEvent from "@testing-library/user-event";
import emojiList from "../emojiList.json";

describe("Emoji Search Test ", () => {
  let header;
  let listElement;
  let searchInput;

  //The beforeEach function runs before each test function and allows defining variables to be used in test functions.
  beforeEach(() => {
    //The render function renders all the components in the App.js file.
    render(<App />);

    header = screen.getByText("Emoji Search");
    listElement = screen.getByText("Grin");
    searchInput = screen.getByLabelText("inputTest");
  });

  //header render test
  test("header render test", () => {
    expect(header).toBeInTheDocument();
  });

  //Tests whether the first 15 elements of the emoji list are rendered.
  test("emoji list render", () => {
    let emojies = emojiList.slice(0, 15);
    emojies.map((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();  //The screen.getByText function searches for the text specified on the page and returns the item it finds.
    });
  });
  //Filter process control
  test("filter test", () => {
    const value = "Grin";
    userEvent.type(searchInput, value);
    expect(screen.getByText(value)).toBeInTheDocument();
  });
  //Copy to clipboard test
  test("copy to clickboard test", () => {
    userEvent.click(listElement);
    expect(
      listElement.parentElement.getAttribute("data-clipboard-text")
    ).toMatch("😁");
  });
});