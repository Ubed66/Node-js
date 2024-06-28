// const fs = require("fs");

// fs.writeFile("hey.txt", "hey how are u ", (err) => {
//   if (err) console.error(err);
//   else console.log("file created ");
// });

// fs.appendFile("hey.txt", "file data update", (err) => {
//   if (err) console.error(err);
//   else console.log("File Created");
// });

// fs.rename("hey.txt", "hello.txt", (err) => {
//   console.log("File Renamed ");
// });

// fs.copyFile("hello.txt", "hey.txt", (err) => {
//   if (err) console.error(err);
//   else console.log("copyfile");
// });

// fs.unlink("hey.txt", (err) => {
//   if (err) console.error(err.message);
//   else console.log("file deleted");
// });

// fs.mkdir("copy", (err) => {
//   if (err) console.error(err);
//   else console.log("folder created");
// });

// fs.writeFile("./copy/test.txt", "welcome", (err) => {
//   if (err) console.error(err);
//   else console.log("file created");
// });

// fs.readFile("hello.txt", "utf-8", (err) => {
//   if (err) console.error(err.message);
//   else console.log("file readed");
// });

// const http = require("http");
// const server = http.createServer((res, req) => {
//   req.end("Hello world");
// });

// server.listen(30000);

//********************************************************************************* */

// const express = require("express");

// const app = express();

// const PORT = 8000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log("Middile wear 1 is running ");
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("Hey there ");
// });

// app.get("/about", (req, res, next) => {
//   // res.send("This is about page");

//   return next(new Error("here the error "));
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// app.listen(PORT, console.log(`Port Started at ${PORT}`));

//*******************************************************************************/

// const express = require("express");
// const app = express();
// const PORT = 5000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const path = require("path");
// app.use(express.static(path.join(__dirname, "public")));

// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   // res.send("HEy there");
//   res.render("index");
// });

// app.get("/profile/:username", (req, res) => {
//   res.send(`Welcome, ` + req.params.username);
//   console.log(req.params, req);
// });

// app.listen(PORT, () => {
//   console.log(`Server Running At ${PORT}`);
// });

//*******************************************************************************/
const express = require("express");
const path = require("path");
const fs = require("fs");
const { render } = require("ejs");

const app = express();
const PORT = 5000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // res.send("chal ra hai");
  fs.readdir("./files", (err, files) => {
    // console.log(files);
    res.render("index", { files: files });
  });
});

app.get(`/file/:fileName`, (req, res) => {
  fs.readFile(`./files/${req.params.fileName}`, "utf-8", (err, fileData) => {
    // console.log(fileData);
    res.render("show", { fileName: req.params.fileName, fileData: fileData });
  });
});

app.get(`/edit/:fileName`, (req, res) => {
  res.render("edit", { fileName: req.params.fileName });
});

app.post(`/edit`, (req, res) => {
  // res.render("edit", { fileName: req.params.fileName });
  // console.log(req.body);
  fs.rename(
    `./files/${req.body.previousName}`,
    `./files/${req.body.newName}.txt`,
    (err) => {
      console.error(err);
      res.redirect("/");
    }
  );
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `files/${req.body.title.split(" ").join(" ")}.txt`,
    `${req.body.details}`,
    (err) => {
      console.error(err);
    }
  );
  res.redirect("/");
  // console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
