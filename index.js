const url = require('url');
const fetch = require('node-fetch');
const express = require('express');
const app = express();

app.get('/', async (req, res) => {
    const prefix = "https://papermc.io/api/v2/projects/paper";
    const args = new URLSearchParams(url.parse(req.url).query);
    const ver = args.get('ver');
    if (ver == null) {
        res.status(400).send("Error: Missing Minecraft version (ver) parameter in request.");
        return;
    }
    const { builds } = await fetch(`${prefix}/versions/${ver}`).then((r) => r.json());

    const latestBuild = builds[builds.length - 1];
    const {downloads: {application: {name: downloadName}}} = await fetch(`${prefix}/versions/${ver}/builds/${latestBuild}`).then((r) => r.json());
    res.send(`${prefix}/versions/${ver}/builds/${latestBuild}/downloads/${downloadName}`);
});

app.listen(80, () => console.log("Server online."));
