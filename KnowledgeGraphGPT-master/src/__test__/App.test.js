// src/__test__/App.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

// Mock Graph to isolate App testing (don’t require cytoscape to run)
jest.mock("../Graph", () => () => <div data-testid="graph-mock" />);

test("renders app and respects OpenRouter default + key gating", () => {
  render(<App />);

  // Title shows
  expect(screen.getByText(/KnowledgeGraph GPT/i)).toBeInTheDocument();

  // Prompt input shows
  const promptInput = screen.getByPlaceholderText("Enter your prompt");
  expect(promptInput).toBeInTheDocument();

  // API key input shows with OpenRouter placeholder (new default)
  const apiKeyInput = screen.getByPlaceholderText("Enter your OpenRouter API Key");
  expect(apiKeyInput).toBeInTheDocument();

  // Generate button exists and is disabled until key entered
  const generateButton = screen.getByRole("button", { name: /generate/i });
  expect(generateButton).toBeDisabled();

  // Type a fake key to enable the button
  fireEvent.change(apiKeyInput, { target: { value: "or_test_key_123" } });
  expect(generateButton).not.toBeDisabled();

  // Graph mock renders
  expect(screen.getByTestId("graph-mock")).toBeInTheDocument();
});
