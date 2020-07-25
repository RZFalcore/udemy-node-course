const routesHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  console.log("server is started...");

  if (url === "/") {
    res.setHeader("Contnent-Type", "text/html");
    res.write("<head><h1>Hello there!</h1></head>");
    res.write(
      "<body><form  action='/create-user' method='POST'><input type='text' name='username'></input><button type='submit'>Sign up!</button></form>"
    );
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      `<body><ul><li>User1</li><li>User2</li><li>User3</li><li>User4</li></ul></body>`
    );
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedUsername = Buffer.concat(body).toString();
      const message = parsedUsername.split("=")[1];
      console.log("message: ", message);

      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }
};

module.exports = routesHandler;
