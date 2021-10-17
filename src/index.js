const express = require("express")
const cors = require("cors");

const port = process.env.PORT;
const apiRouter = require("./routers/apiRouter")


const app = express();
app.use(cors());
app.use(express.json());
app.use(apiRouter);

app.use("/", (req, res) => {
    res.send()
})

app.listen(port, () => { console.log("Server connected, port:", port); })