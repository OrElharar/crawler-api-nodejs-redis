const AWS = require("aws-sdk");
const QueueUrl = "https://sqs.eu-west-1.amazonaws.com/000447063003/crawler-queue.fifo";
const sqs = new AWS.SQS({
    apiVersion: "2012-11-05",
    region: process.env.AWS_REGION
})



const createFifoQueue = async (req, res, next) => {
    const QueueName = req.body.queueName;
    try {
        const data = await sqs.createQueue({
            QueueName,
            Attributes: {
                "FifoQueue": "true",
                "ContentBasedDeduplication": "true"
            }

        }).promise();
        req.queueUrl = data.QueueUrl;
        next();
    } catch (err) {
        res.status(400).send({
            status: 400,
            error: err.message
        })
    }
}



const sendMessageToQueue = async (req, res, next) => {
    // const QueueUrl = req.body.queueUrl;
    const MessageBody = JSON.stringify(req.body);
    try {
        const { MessageId } = await sqs.sendMessage({
            QueueUrl,
            MessageGroupId: crawlerId,
            MessageBody
        }).promise();
        req.messageId = MessageId;
        next();
    } catch (err) {
        res.status(500).send({
            status: 500,
            message: err.message
        })
    }
}

const pullMessagesFromQueue = async (req, res, next) => {
    // const QueueUrl = req.query.queueUrl;
    try {
        const { Messages } = await sqs.receiveMessage({
            QueueUrl,
            MaxNumberOfMessages: 10,
            MessageAttributeNames: [
                "All"
            ],
            VisibilityTimeout: 30,
            WaitTimeSeconds: 10
        }).promise();
        req.messages = Messages || [];
        next();

        if (Messages != null) {
            const deleteMessagesPromises = Messages.map(message => {
                return sqs.deleteMessage({
                    QueueUrl,
                    ReceiptHandle: message.ReceiptHandle
                }).promise()
            })
            Promise.allSettled(deleteMessagesPromises)
                .then((data) => { console.log(data) })
                .catch((err) => { console.log({ err }); })
        }
    } catch (err) {
        res.status(500).send({
            status: 500,
            message: err.message
        })
    }
}

const deleteQueue = async (req, res, next) => {
    const QueueUrl = req.body.queueUrl;
    try {
        await sqs.deleteQueue({ QueueUrl }).promise();
        next();
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message
        })
    }
}

module.exports = {
    sqs,
    // createQueue,
    sendMessageToQueue,
    pullMessagesFromQueue,
    deleteQueue
}