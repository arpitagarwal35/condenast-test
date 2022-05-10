var express = require('express');
var router = express.Router();
require('dotenv').config();

var moment = require('moment-timezone');
var _ = require('lodash');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

router.get('/', function (req, res, next) {
  var locals = {
    moment: moment
  };

  if (!req.query || _.isEmpty(req.query)) {
    newsapi.v2.topHeadlines({
      language: 'en',
      country: 'in'
    }).then(response => {
      locals.title = 'World Wide latest news';
      locals.response = response;
      res.render('index', locals);
    }).catch(err => {
      var locals = {
        message: err.message || "",
        error: {
          stack: err.stack,
          status: err.name || err.code || ""
        }
      };
      res.status(500);
      res.render('error', locals);
    });
  } else {
    newsapi.v2.everything({
      q: req.query.q || "",
      sources: 'bbc-news,the-verge',
      domains: 'bbc.co.uk, techcrunch.com',
      from: '2022-04-10',
      to: '2022-05-08',
      language: 'en',
      sortBy: 'relevancy',
      page: 2
    }).then(response => {
      locals.title = 'Search result';
      locals.response = response;
      locals.query = req.query || {};
      res.render('index', locals);
    }).catch(err => {
      var locals = {
        message: err.message || "",
        error: {
          stack: err.stack,
          status: err.name || err.code || ""
        }
      };
      res.status(500);
      res.render('error', locals);
    });
  }
});

module.exports = router;