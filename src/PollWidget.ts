export class PollWidget {
  private id: string;
  private question: string;
  private options: string[];
  private element: HTMLElement;
  private votes: number[];
  private selectedOption: number | null = null;

  constructor(
    id: string,
    question: string,
    options: string[],
    element: HTMLElement
  ) {
    this.id = id;
    this.question = question;
    this.options = options;
    this.element = element;
    this.votes = new Array(options.length).fill(0);
    this.loadVotes();
  }

  public getId(): string {
    return this.id;
  }

  public getQuestion(): string {
    return this.question;
  }

  public getOptions(): string[] {
    return this.options;
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public getVotes(): number[] {
    return this.votes;
  }

  static addStyles() {
    const styleId = "poll-widget-styles";

    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
          .poll-container * {
            box-sizing: border-box;
          }
  
          .poll-container {
            background-color: #fff;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding: 2rem;
            border-radius: 16px;
          }
      
          .poll-container > h2{
            margin-block-start: 0;
            margin-block-end: 2rem;
            font-size: 2rem;
            color: #505352;
          }
      
          .poll-item {
            position: relative;
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            margin-block-end: 1rem;
            padding: 1rem;
            font-size: 1.25rem;
            font-weight: 500;
            color: #505352;
            line-height: 150%;
            text-align: start;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            cursor: pointer;
          }
      
          .poll-item > .poll-percentage {
            color: #52a7a0;
          }
      
          .poll-item > .poll-progress {
            position: absolute;
            left: 0;
            height: 100%;
            width: 0;
            background-color: #c3f7df;
            border-radius: inherit;
            transition: width 0.5s ease-in-out;
          }
      
          .poll-item > .poll-option {
            color: #505352;
            z-index: 3;
          }
  
          .poll-item > .poll-percentage {
            z-index: 3;
          }
      
          .selected {
            font-weight: 700;
            display: flex;
            transition: all 0.2s ease-in-out;
            color: #317668;
          }
          .selected::before,
          .poll-item:hover:before {
            content: "";
            position: absolute;
            left: 0;
            width: 0.5rem;
            height: 100%;
            margin-inline-end: 1rem;
            background-color: #56d8a3;
          }
      
          .poll-header {
            color: #505352;
            font-weight: 700;
            margin-block-end: 2rem;
            font-size: 2.5rem;
          }
      
          @media screen and (max-width: 576px) {
          .poll-container > h2{
            font-size: 1.5rem;
          }
          .poll-item{
            font-size: 1rem;
            margin-block-end: .5rem;
            padding: .8rem;
          }
          }

          @media screen and (max-width: 360px) {
            .poll-container {
              padding: 1rem;
            }
            .poll-container > h2{
              font-size: 1.2rem;
              margin-block-end: 1rem;
            }
            .poll-item{
              font-size: .8rem;
              margin-block-end: .4rem;
              padding: .6rem;
            }
            }

            @media screen and (max-width: 200px) {
              .poll-container {
                padding: .7rem;
              }
              .poll-container > h2{
                font-size: .8rem;
                margin-block-end: .6rem;
              }
              .poll-item{
                font-size: .6rem;
                margin-block-end: .2rem;
                padding: .4rem;
              }
              }
          `;
      document.head.appendChild(style);
    }
  }

  private loadVotes(): void {
    const storedVotes = localStorage.getItem(`pollVotes-${this.id}`);
    if (storedVotes) {
      this.votes = JSON.parse(storedVotes);
    }
  }

  private saveVotes(): void {
    localStorage.setItem(`pollVotes-${this.id}`, JSON.stringify(this.votes));
  }

  render(): void {
    const pollContainer = document.createElement("div");
    pollContainer.classList.add("poll-container");
    pollContainer.attributes.setNamedItem(
      document.createAttribute("data-poll-id")
    );
    pollContainer.attributes.getNamedItem("data-poll-id")!.value = this.id;
    this.element.innerHTML = "";

    const questionElement = document.createElement("h2");
    questionElement.textContent = this.question;
    pollContainer.appendChild(questionElement);

    this.options.forEach((option, index) => {
      const pollOption = document.createElement("div");
      pollOption.classList.add("poll-item");
      pollOption.textContent = option;
      pollOption.onclick = () => this.vote(index);
      pollContainer.appendChild(pollOption);
      this.element.appendChild(pollContainer);
    });
  }

  private vote(optionIndex: number): void {
    this.votes[optionIndex]++;
    this.selectedOption = optionIndex;
    this.saveVotes();
    this.showResults();
  }

  private showResults(): void {
    const pollContainer = document.createElement("div");
    pollContainer.classList.add("poll-container");
    pollContainer.attributes.setNamedItem(
      document.createAttribute("data-poll-id")
    );
    pollContainer.attributes.getNamedItem("data-poll-id")!.value = this.id;
    this.element.innerHTML = "";

    const questionElement = document.createElement("h2");
    questionElement.textContent = this.question;
    pollContainer.appendChild(questionElement);

    const totalVotes = this.votes.reduce((a, b) => a + b, 0);
    this.options.forEach((option, index) => {
      const percentage = totalVotes
        ? Math.round((this.votes[index] / totalVotes) * 100)
        : 0;

      const result = document.createElement("div");
      result.classList.add("poll-item");

      const pollProgress = document.createElement("div");
      pollProgress.classList.add("poll-progress");
      result.appendChild(pollProgress);

      if (index === this.selectedOption) {
        result.classList.add("selected");
      }

      const optionText = document.createElement("span");
      optionText.classList.add("poll-option");
      optionText.textContent = option;
      result.appendChild(optionText);

      const resultPercentage = document.createElement("span");
      resultPercentage.classList.add("poll-percentage");

      resultPercentage.textContent = `${percentage}%`;
      result.appendChild(resultPercentage);

      pollContainer.appendChild(result);
      this.element.appendChild(pollContainer);

      setTimeout(() => {
        pollProgress.style.width = `${percentage}%`;
      }, 100);
    });
  }
}
