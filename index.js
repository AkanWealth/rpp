const express = require("express");
// const bodyPaser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors(origins = "http://localhost:3000"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes")(app);
app.get("/", (req, res) => {
    res.send("Application up and running")
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});