const hbs = require('hbs');

hbs.registerHelper('toBase64', function(image) {
  console.log(image)
  return image.toString('base64');
});