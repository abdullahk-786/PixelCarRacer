const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

// To Start the server
app.listen(PORT, () => {
    console.log(`Neon Drift is running at http://localhost:${PORT}`);
});