import test from 'ava';

var Tesseract = require('../../')
var fs = require('fs')
var ld = require('levenshtein-damerau')


// test.cb('Tesseract.recognize on Arabic PNG', t => {
// 	var path = require('path');
// 	var image = path.resolve(__dirname, 'arabic.png');

// 	Tesseract.recognize(image, { lang: 'ara' })
// 	.progress(status => console.log(status))
// 	.finally(e => t.end())
// 	.catch(err => t.fail(err))
// 	.then(data => {
// 		var error = ld(data.text, fs.readFileSync('./tyger.txt', 'utf8'));
// 		if(error > 20) t.fail('Levenshtein distance to reference exceeded 20');
// 	})
// })

