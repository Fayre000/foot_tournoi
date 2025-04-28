const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const usersRoute = require("./routes/users");
const teamsRoute = require("./routes/teams");
const matchesRoute = require("./routes/matches");
const standingsRoute = require("./routes/standings");

const playersRoute = require("./routes/players");



const app = express();
app.use(fileUpload());
app.use(bodyParser.json());

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes
app.use("/players", playersRoute);
app.use("/users", usersRoute);
app.use("/teams", teamsRoute);

app.use("/matches", matchesRoute);
app.use("/standings", standingsRoute);

// Server start
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
