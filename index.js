const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middlewear/logger");
const members = require("./Members");

const app = express();

//Init middlewear
app.use(logger);

// Handlebars Middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//HomePage Route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members,
  })
);

//Body Parser Middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Nenbers API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
