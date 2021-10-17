const express = require("express");
const redisClient = require("../db/redis");

const router = new express.Router();

router.post("/set-string", async (req, res) => {

    try {
        await redisClient.setAsync(req.body.key, req.body.value);
        res.send()
    } catch (err) {
        console.log(err);
    }
})

router.get("/get-string/:key", async (req, res) => {
    try {
        const value = await redisClient.getAsync(req.params.key);
        res.send({ value })
    } catch (err) {
        console.log(err);
    }
})

router.post("/set-list", async (req, res) => {

    try {
        await redisClient.rpushAsync(req.body.key, req.body.list)
        res.send()
    } catch (err) {
        console.log(err);
    }
})

router.get("/get-list/:key", async (req, res) => {
    try {
        const list = await redisClient.lrangeAsync(req.params.key, 0, -1);
        res.send(list)
    } catch (err) {
        console.log(err);
    }
})

// router.post("/set-hash", async (req, res) => {
//     const hashArray = [];
//     for (let [key, value] of Object.entries(req.body.hash)) {
//         hashArray.push(key);
//         hashArray.push(value)
//     }
//     try {
//         await redisClient.hmset(req.body.key, hashArray)
//         res.send()
//     } catch (err) {
//         console.log(err);
//     }
// })

// router.get("/get-hash/:key", async (req, res) => {
//     try {
//         const hash = await redisClient.hgetallAsync(req.params.key);
//         res.send(hash)
//     } catch (err) {
//         console.log(err);
//     }
// })

module.exports = router