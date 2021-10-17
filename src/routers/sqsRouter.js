const express = require("express");
const { createQueue, sendMessageToQueue, pullMessagesFromQueue, deleteQueue } = require("../middlewares/sqs");

const router = new express.Router();

router.post("/create-queue", async (req, res) => {
    res.send({
        queueUrl: req.queueUrl
    })
});

router.post("/send-message", sendMessageToQueue, async (req, res) => {
    res.send({
        messageId: req.messageId
    })
})

router.get("/pull-messages", pullMessagesFromQueue, async (req, res) => {
    res.send(req.messages)
})

router.delete("/delete-queue", deleteQueue, (req, res) => {
    res.send();
})

module.exports = router