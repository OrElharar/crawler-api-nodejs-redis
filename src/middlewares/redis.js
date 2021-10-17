const redisClient = require("../db/redis");



// const getPhotosFromRedis = async (req, res, next) => {
//     try {
//         const photos = await redisClient.getAsync("search:" + req.params.key);
//         if (photos != null) {
//             res.send(photos);
//         }
//         else {
//             next()
//         }
//     } catch (err) {
//         console.log({ err });
//     }
// }

// const getIndexByParentId = (parentIndex,currentList) => {
//     if (currentList == null)
//         return -1;
//     let foundIndex = false;
//     let minIndex = 0;
//     let maxIndex = currentList.length;
//     let pivotIndex = parseInt(currentList.length/2);
//     let index = 0;
//     let foundIndex = false;
//     while(!foundIndex){
//         const pivotParentId = parseInt(currentList[pivotIndex].split(":")[0])
//         if(pivotParentId < parentIndex){

//         }else{
//         if(pivotParentId>parentIndex){

//         }else{
//             foundIndex = true;
//             index = pivotIndex
//         }
//     }
//     }

// }

const getInsertIndex = async (req, res, next) => {
    const currentList = await redisClient.lrangeAsync(req.body.key, 0, -1);
    req.lastParentIndex = getIndexByParentId(req.parentIndex, currentList);
    next();
}

module.exports = {
    // getPhotosFromRedis,
    getInsertIndex
}