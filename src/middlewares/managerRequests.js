const Axios = require("axios");
const MANAGER_DB_URL = "http://localhost:5000"


const getNextDepthLvlFromManager = async (req, res, next) => {
    try {
        const crawlerId = req.params.crawlerId;
        // console.log({ crawlerId });
        const res = await Axios.get(MANAGER_DB_URL + `/manager/get-next-depth/${crawlerId}`);

        req.treeNextDepth = res.data;
        next();
    } catch (err) {
        res.status(404).send({
            status: 404,
            message: err.message
        })
    }
};

module.exports = {
    getNextDepthLvlFromManager
}

