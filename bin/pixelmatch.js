#!/usr/bin/env node

const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

function getMatchingPercentage(imagePath1, imagePath2, options = {})
{
    const img1 = PNG.sync.read(fs.readFileSync(imagePath1));
    const img2 = PNG.sync.read(fs.readFileSync(imagePath2));

    // Create an empty diff image
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, options);

    const totalPixels = width * height;

    $percentage = ((totalPixels - numDiffPixels) / totalPixels) * 100;

    process.stdout.write(JSON.stringify($percentage));
}

try {
    const args = JSON.parse(process.argv.slice(2));

    getMatchingPercentage(args[0], args[1], args[2]);
} catch (error) {
    console.error(error);
    process.exit(1);
}
