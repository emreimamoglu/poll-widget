import { PollWidget } from "./PollWidget";

export class PollManager {
  private activePolls: Map<string, PollWidget> = new Map<string, PollWidget>();

  constructor() {
    PollWidget.addStyles();
  }

  createPoll(
    id: string,
    question: string,
    options: string[],
    element: HTMLElement
  ) {
    if (this.activePolls.has(id)) {
      throw new Error(`Poll with id ${id} already exists.`);
    }

    const poll = new PollWidget(id, question, options, element);
    this.activePolls.set(id, poll);
    poll.render();
  }
}
