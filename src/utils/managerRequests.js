const Axios = require("axios");
const MANAGER_DB_URL = "http://localhost:5000"

const setCrawlerByManager = async (reqBody) => {

    try {
        const res = await Axios.post(MANAGER_DB_URL + "/manager/set-crawler", {
            data: { ...reqBody }

        });
        return res.data;
    } catch (err) {
        throw (err)
    }
};

module.exports = {
    setCrawlerByManager
}