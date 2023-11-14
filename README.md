
# Embeddable Poll Widget

is a zero dependency lightweight poll widget. For more complex projects, lite frameworks like preact can be used. But it will increase the bundle size to 30+ kb which is around 2kb right now.




## Usage via CDN

```html
<script>

refer this link for live usage : https://github.com/emreimamoglu/poll-widget/blob/main/demo2/index.html#L564-L591

// Initialization script
 (function (w, d, s, o, f, js, fjs) {
        w["PollManager"] = o;
        w[o] =
          w[o] ||
          function () {
            (w[o].q = w[o].q || []).push(arguments);
          };
        (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
        js.id = o;
        js.src = f;
        js.async = 1;
        js.type = "module"
        fjs.parentNode.insertBefore(js, fjs);
      })(window, document, "script", "pw", "https://unpkg.com/@emreimamoglu/pollwidget@1.0.0/dist/poll-widget.js");
      pw("init");


      pw("createpoll",{
        id : "poll-1",
        question : "What is your favorite color?",
        options : ["Red","Blue","Green"],
        element : document.getElementById("poll-container-1") // container that will render the poll
      })
</script>
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/emreimamoglu/poll-widget.git
```

Go to the project directory

```bash
  cd poll-widget
```

Install dependencies

```bash
  npm install

  or

  yarn
```

Build the project

```bash
  npm run build

  or 

  yarn build
```

after this step, you can visit the demo folders and launch index.html files to see widget in action.


## API Reference

#### Initialize widget

```javascript
  init

  pw("init")
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  | | |

#### createpoll

```javascript
  createpoll

  mw("createpoll", {
      id : "poll-id",
      question : "poll question",
      options : ["option 1", "option 2", "option 3",...],
      element : document.getElementById("container-id-to-host-poll")
  })
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the poll |
| `question`      | `string` | **Required**. Poll question |
| `options`      | `string[]` | **Required**. Poll answer options |
| `element`      | `DOMNode` | **Required**. Poll host node |

## Running Tests

Embeddable poll widget uses vitest for unit tests.

To run the tests : 

```bash
  npm run test
```