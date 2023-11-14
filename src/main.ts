import { PollManager } from "./PollManager";
import { isParamsValid } from "./utils";

export type Params = {
  id: string;
  question: string;
  options: string[];
  element: HTMLElement;
};

const supportedAPI = ["init", "createpoll"];

export function app(window: any, pollManager: PollManager) {
  let configurations = {};

  const globalObject = window[window["PollManager"]];
  const queue = globalObject.q;

  if (queue) {
    for (let i = 0; i < queue.length; i++) {
      const [api, params] = queue[i];
      if (api.toLowerCase() === "init") {
        configurations = extendObject(configurations, params);
      } else {
        apiHandler(api, params, pollManager);
      }
    }
  }

  globalObject.apiHandler = apiHandler;
  globalObject.configurations = configurations;
}

function apiHandler(api: string, params: Params, pollManager: PollManager) {
  if (!api) throw new Error("API method required");
  api = api.toLowerCase();

  if (!supportedAPI.includes(api)) {
    throw new Error(`Method ${api} is not supported`);
  }

  if (!params) throw new Error("Params required");
  if (!isParamsValid(params))
    throw new Error("Params are not valid, refer to API reference");

  switch (api) {
    case "createpoll":
      pollManager.createPoll(
        params.id,
        params.question,
        params.options,
        params.element
      );
      break;
    default:
      console.warn(`No handler defined for ${api}`);
  }
}

function extendObject(
  a: Record<string, any>,
  b: Record<string, any>
): Record<string, any> {
  for (let key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

const pollManager = new PollManager();
app(window, pollManager);
