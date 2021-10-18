const express = require("express");
const { crawlerPartialKey } = require("../db/dbKeys");
const redisClient = require("../db/redis");
const { getNextDepthLvlFromManager } = require("../middlewares/managerRequests");
const { sqs } = require("../middlewares/sqs");
const { getQueByCurrentDepth } = require("../operations/queOperations");
const { setCrawlerByManager } = require("../utils/managerRequests");





const router = new express.Router();


router.post("/set-crawler", async (req, res) => {

    try {
        const { crawlerId } = await setCrawlerByManager(req.body.data)
        console.log({ crawlerId });
        res.send({ crawlerId })
    } catch (err) {
        console.log(err);
    }
})

router.get("/get-next-depth/:crawlerId", getNextDepthLvlFromManager, async (req, res) => {
    try {
        res.send(req.treeNextDepth);
    } catch (err) {
        console.log(err);
    }
})

router.get("/manager/get-crawler/:id", async (req, res) => {
    try {
        const crawlerId = req.params.key;
        const crawlerStatus = await redisClient.hgetallAsync(`crawler:${crawlerId}`);
        const nextDepthLvlToSend = parseInt(crawlerStatus.totalSentDepths) + 1;

        const key = `${crawlerId}:${nextDepthLvlToSend}:links`
        const hash = await redisClient.hgetallAsync();
        res.send(hash)
    } catch (err) {
        console.log(err);
    }
})

router.post("/manager/set-que", async (req, res) => {
    const crawler = await redisClient.hgetallAsync(`${crawlerPartialKey}:${req.body}`);
    const nextDepth = parseInt(crawler.currentDepth) + 1;
    const depthStatus = await redisClient.hgetallAsync(`depthStatus:${1}`)
    // const que = await getQueByCurrentDepth(nextDepth, depthStatus.nextUrlIdToCheck, depthStatus.totalNumberOfUrls);
    const que = await getQueByCurrentDepth(1, depthStatus.nextUrlIdToCheck, depthStatus.totalNumberOfUrls);

    console.log({ que });
    try {
        // if (req.lastParentIndex <= parseInt(parentId))
        //     await redisClient.rpushAsync(req.body.key, list)
        // else {
        //     await redisClient.lpushAsync(req.body.key, list)
        // }
        // res.send()
    } catch (err) {
        console.log(err);
    }
})
router.get("/get-que/:key", async (req, res) => {
    try {
        const list = await redisClient.lrangeAsync(req.params.key, 0, -1);
        res.send(list)
    } catch (err) {
        console.log(err);
    }
})

router.post("/set-links", async (req, res) => {
    const id = req.body.id;
    const list = req.body.list;
    try {
        await redisClient.rpushAsync(`${req.body.key}:${id}`, list)
        res.send()
    } catch (err) {
        console.log(err);
    }
})



// router.get("/search-photos/:key", getPhotosFromRedis, async (req, res) => {
//     const searchValue = req.params.key
//     try {
//         req.photos = await flickerSearchFetcher(searchValue)
//         if (req.photos?.length > 0) {
//             redisClient.setexAsync(
//                 "search:" + searchValue,
//                 300,
//                 JSON.stringify(req.photos)
//             );
//             res.send(req.photos)
//         }
//     } catch (err) {
//         res.status(500).send(err.message)
//     }
// })


module.exports = router