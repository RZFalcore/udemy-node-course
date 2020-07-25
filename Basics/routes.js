const fs = require("fs");

const requestHandler = (req, res) => {
  //   console.log(req.url, req.headers, req.method);
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<html><head>Server</head><body><form  action='/message' method='POST'><input type='text' name='message'></input><button type='submit'>Send</button></form></body></html>"
    );
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.slice(parsedBody.indexOf("=") + 1);
      console.log(message);

      // Sync
      // fs.writeFileSync("message.txt", message);
      // res.statusCode = 302;
      // res.setHeader("Location", "/");
      // return res.end();

      // Async
      fs.writeFile("message.txt", message, (err) => {
        if (err) {
          console.log(err);
        }

        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head>Server</head><body><h1>Server running...</h1></body></html>"
  );
  res.end();
};

module.exports = requestHandler;
//exports = requestHandler;
