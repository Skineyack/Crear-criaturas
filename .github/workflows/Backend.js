const express = require('express');
const multer = require('multer');
const unzipper = require('unzipper');
const sharp = require('sharp'); // Para redimensionar imágenes
const fs = require('fs');
const app = express();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); //
