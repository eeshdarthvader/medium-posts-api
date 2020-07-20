import ReactDOMServer from 'react-dom/server';
import renderPostCard from '../../../src/post-card';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var feed = require('rss-to-json');

export default async (req, res) => {
    // Sets the username - replace username with your Medium Username
    var username = 'eesh.t';
    var url = 'https://medium.com/feed/@' + username + '';

    // Make the request to Medium and return the Obj
    var rss = await feed.load(url);
    var postsSvg = {
        items: []
    };

    res.setHeader('Cache-Control', 'public, max-age=1800');
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    postsSvg.items = rss.items.filter(item => item.category.length);

    console.log('renderPostCard(postsSvg.items)', renderPostCard(postsSvg.items));

    // Renders our Hello component into an HTML string
    const html = ReactDOMServer.renderToString(renderPostCard(postsSvg.items));

    const document = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<title>Document</title>
					<style>
					:root {
    --card-width: 360px;
    --grid-gap: 3rem;
    --background-color: #f8f8f8;
}

* {
    box-sizing: border-box;
}

body,
main {
    margin: 0;
    font-family: Yantramanav, sans-serif;
    font-size: 17px;
    line-height: 1.3em;
    font-weight: 300;
    overflow-x: hidden;
}

div {
    margin: 0 auto;
    overflow: auto;
}

a {
	text-decoration: none
}

/* Container */
.container {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  max-width: 960px;
  margin: 0 auto;
}


/* Column */
.column {
  flex-basis: 33.3333333333%;
  width: 33.3333333333%;
  padding: 0 10px;
  box-sizing: border-box;
}
@media (max-width: 900px) {
  .column {
    flex-basis: 50%;
    width: 50%;
  }
}
@media (max-width: 600px) {
  .column {
    flex-basis: 100%;
    width: 100%;
  }
}

/* Article (Component) */
.article {
  background: #FFF;
  margin: 0 0 20px;
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
}
.article:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.2);
}
.article:active {
  box-shadow: none;
  -webkit-transform-origin: center;
          transform-origin: center;
  -webkit-transform: scale(0.98);
          transform: scale(0.98);
}
.article__category {
  display: inline-block;
  padding: 8px 10px;
  margin: 0 0 10px;
  color: #FFF;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.075rem;
  text-transform: uppercase;
}
.article__excerpt {
  color: #666;
  line-height: 1.5rem;
  font-size: 0.875rem;
}
.article__title {
  margin: 0 0 10px;
  color: #444;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;
}
				</style>
			</head>
			<body>
				<div id="app">${html}</div>
			</body>
			</html>`;

    res.send(document);
};
