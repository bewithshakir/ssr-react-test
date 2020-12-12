import express from 'express';
import "babel-polyfill";
import path from 'path'
import fs from 'fs'
import bodyParser from 'body-parser';

import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from "react-router";
import React from 'react';
import App from '../src/App'

const app = express();
const PORT = process.env.PORT || 8000;


const serverRenderer = (req, res, next) => {
    const context = {};

  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
             <App />
            </StaticRouter>
        )}</div>`
      )
    )
  })
}

app.use(bodyParser.json());
app.use('^/home', serverRenderer);
app.use(
  express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
)


// app.use(express.static('./build'))
app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
})