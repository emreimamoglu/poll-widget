import { describe, it, expect, beforeEach, vi } from "vitest";
import { PollWidget } from "../PollWidget";
import { PollManager } from "../PollManager";

describe("PollManager", () => {
  let pollManager: PollManager;
  let mockElement: HTMLElement;

  beforeEach(() => {
    vi.spyOn(PollWidget, "addStyles");

    pollManager = new PollManager();
    mockElement = document.createElement("div");
  });

  it("calls PollWidget.addStyles upon construction", () => {
    expect(PollWidget.addStyles).toHaveBeenCalled();
  });

  it("creates and renders a new poll", () => {
    expect(() =>
      pollManager.createPoll("poll1", "Question?", ["Yes", "No"], mockElement)
    ).not.toThrow();

    const pollWidget: PollWidget | undefined = (
      pollManager as any
    ).activePolls.get("poll1");
    expect(pollWidget).toBeDefined();
    expect(pollWidget?.getQuestion()).toBe("Question?");
  });

  it("throws an error if a poll with the same id already exists", () => {
    pollManager.createPoll("poll1", "Question?", ["Yes", "No"], mockElement);
    expect(() => {
      pollManager.createPoll(
        "poll1",
        "Another Question?",
        ["Option 1", "Option 2"],
        mockElement
      );
    }).toThrow("Poll with id poll1 already exists.");
  });
});
