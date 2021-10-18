

const getNextDepthLvlFromManager = async (req, res, next) => {
    try {
        const crawlerId = req.params.crawlerId;
        const res = await Axios.get(API_DB_URL + `/manager/get-next-depth/${crawlerId}`);
        console.log({ res });
        req.treeNextDepth = res.data;
        next();
    } catch (err) {
        throw (err)
    }
};

module.exports = {
    getNextDepthLvlFromManager
}

