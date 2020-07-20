// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var feed = require('rss-to-json');

export default async (req, res) => {
    // Sets the username - replace username with your Medium Username
    var url = 'https://medium.com/feed/@' + 'eesh.t' + '';

    // Make the request to Medium and return the Obj
    var rss = await feed.load(url);
    var posts = [];

    res.setHeader('Cache-Control', 'public, max-age=1800');
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    posts = rss.items.filter(item => item.category.length);

    res.send(posts);
};
