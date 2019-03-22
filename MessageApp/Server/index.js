'use strict'

import { fstat } from "fs";

const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require("path");

const app = express();
const diretoryToServe = 'client';
const port = 3443;

app.use("/", express.static(path.join(_dirname, "..",directoryToServe)));

const httpsOptions = {
    cert: fs.readFileSync(path.join(_dirname,"ssl","server.crt")),
    key : fs.readFileSync(path.join(_dirname,"ssl","server.key"))
};