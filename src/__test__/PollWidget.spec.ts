import { describe, it, expect, beforeEach, vi } from "vitest";
import { PollWidget } from "../PollWidget";

global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
} as any;

describe("PollWidget", () => {
  let widget: any; // Using any to bypass private method errors
  const mockElement: HTMLElement = document.createElement("div");

  beforeEach(() => {
    widget = new PollWidget(
      "test-id",
      "Test Question",
      ["Option 1", "Option 2"],
      mockElement
    );
  });

  it("initializes with the given parameters", () => {
    expect(widget.getId()).toBe("test-id");
    expect(widget.getQuestion()).toBe("Test Question");
    expect(widget.getOptions()).toEqual(["Option 1", "Option 2"]);
    expect(widget.getElement()).toBe(mockElement);
    expect(widget.getVotes()).toEqual([0, 0]);
  });

  it("renders the poll options correctly", () => {
    widget.render();
    const options: NodeListOf<HTMLElement> =
      mockElement.querySelectorAll(".poll-item");
    expect(options.length).toBe(2);
    expect(options[0].textContent).toBe("Option 1");
    expect(options[1].textContent).toBe("Option 2");
  });

  it("updates votes and displays results correctly", () => {
    widget.vote(0);
    expect(widget.votes[0]).toBe(1);

    widget.showResults();
    const percentage: string | null | undefined =
      mockElement.querySelector(".poll-percentage")?.textContent;
    expect(percentage).toBe("100%");
  });

  it("saves and loads votes from localStorage", () => {
    widget.vote(0);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "pollVotes-test-id",
      JSON.stringify([1, 0])
    );

    widget.loadVotes();
    expect(localStorage.getItem).toHaveBeenCalledWith("pollVotes-test-id");
  });
});
