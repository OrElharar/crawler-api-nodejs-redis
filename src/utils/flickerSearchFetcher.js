const flickrImage = require("./flickrImage");
const flickerSearchFetcher = async (input) => {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&text=${input}&format=json&nojsoncallback=1`
    try {
        const result = await flickrImage(url);
        if (result.status === 200)
            return result.data
        else
            throw result

    } catch (error) {
        throw error
    }
}
// search("gym").then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })
module.exports = flickerSearchFetcher;