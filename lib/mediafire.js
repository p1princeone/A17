const axios = require('axios');
const cheerio = require('cheerio');

const mediafireDl = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const link = $('a#downloadButton').attr('href');
    const size = $('a#downloadButton').text().replace(/Download|\(|\)|\n|\s+/g, '').trim();

    const filename = link.split('/').pop();
    const extension = filename.split('.').pop();

    const result = { filename, extension, size, link };

    return [result];
  } catch (error) {
    console.error('Error in mediafireDl:', error.message);
    return [];
  }
};

module.exports = { mediafireDl };
