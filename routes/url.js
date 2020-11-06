const express = require('express');

const router = express.Router();

const shortid = require('shortid');
const validurl = require('valid-url');

const config = require('config');

const Url = require('../models/url');


router.post('/shorten', async (req, res) => {

    const { longUrl } = req.body;
    //const baseUrl = config.get('baseUrl');
    const baseUrl = config.get('baseUrl');

    if (!validurl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base Url');
    }

    const urlCode = shortid.generate();


    if (validurl.isUri(longUrl)) {

        try {
            let url = await Url.findOne({ longUrl })

            if (url) {

                res.json(url);
            } else {

                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()

                });

                await url.save();

                res.json(url);
            }

        } catch (err) {
            console.error(err);
            res.status(500).json('Server not found');
        }
    } else {

        res.status(401).json('Invalid long Url')
    }
});

module.exports = router;




