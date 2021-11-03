const request = require("request"),
      zlib = require("zlib"),
      fs   = require("fs"),
      path = require("path");

var langdata = require('../../tesseract.js/src/common/langdata.json')

function getLanguageData(req, res, cb){
    var lang = req.options.lang;
    var langfile = lang + '.traineddata.gz';
    var url = req.workerOptions.langPath + langfile;
    try {
    	fs.readFile(path.join(__dirname, '../langs/') + lang + '.traineddata', function (err, data) {
        	if(!err) return cb(new Uint8Array(data));
			request(url, {encoding: null}, function (error, response, body) {
				zlib.gunzip(body, function(err, dezipped) {
					fs.writeFile(path.join(__dirname, '../langs/') + lang + '.traineddata', dezipped,  "binary",function(err) {
						getLanguageData(req, res, cb);
					});
				});
			});
    	});
    } catch (e) {
	// ERR_INVALID_ARG_TYPE
	node.warn("Please check, if your Language Parameter is correct!")
    }
}


module.exports = getLanguageData;
