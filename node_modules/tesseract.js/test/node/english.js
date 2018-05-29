import test from 'ava';

var Tesseract = require('../../')
var fs = require('fs')
var ld = require('levenshtein-damerau')


test.cb('Tesseract.recognize on JPG with no options', t => {
	var path = require('path');
	var image = path.resolve(__dirname, 'tyger.jpg');

	Tesseract.recognize(image)
	.progress(status => console.log(status))
	.finally(e => t.end())
	.catch(err => t.fail(err))
	.then(data => {
		var error = ld(data.text, fs.readFileSync('./tyger.txt', 'utf8'));
		if(error > 20) t.fail('Levenshtein distance to reference exceeded 20');
	})
})

