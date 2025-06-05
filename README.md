## **I'M NOT RESPONSIBLE IF YOUR ACCOUNT GOT BANNED, USE AT YOUR OWN RISK.**

This is a simple script that uses puppeteer to open the Discord web app, the script will redirect you to the login page. 
Then just put your login details and after you login in it will start working.

It was tested on Windows, should also work on Linux.

## Instructions

* Set your own server, channel and also other settings on the `config/app.json` file.
  * `dataDir` is no longer need it.
* You have to install chrome browser and create a shorcut with the next parameter: `--remote-debugging-port=9222`
  * Your Target will looks like:
`C:\Users\YourUserName\AppData\Local\Chromium\Application\chrome.exe --remote-debugging-port=9222`

* Execute the browser with this shorcut and open this http://localhost:9222/json/version to extract the websocket URL:
  
  You will see something like this:
  
  `"webSocketDebuggerUrl": "ws://localhost:9222/devtools/browser/8fc02476-ccda-4b76-b45f-a33493459b72"`

* Copy the value to the `config/app.json`


* install dependencies, build and run.
```bash
npm i

npm run build
npm start

```

To Stop the script just press CTRL^C.

Official Discord Server: https://discord.com/invite/vUKKAgq
