var fs = require('fs');
var path = require('path');
var parser = require('../lib');
var assert = require('assert');

var fixturesPath = './fixtures';

fs.readdir(fixturesPath, function(err, files) {
	for (var i in files) {
		var file = files[i];
		var ext = path.extname(file);

		if (ext == '.xml') {
			var basename = path.basename(file, '.xml');

			var data = fs.readFileSync(fixturesPath + '/' + file);
			var result = parser.toJson(data, {reversible: true});

			var  data2 =  fs.readFileSync(fixturesPath + '/' + file);
			if (file.indexOf('spacetext') >= 0) {
				result = parser.toJson(data2, {trim: false, coerce: false});
			} else if (file.indexOf('coerce') >= 0) {
				result = parser.toJson(data2, {coerce: false});
			} else if (file.indexOf('domain') >= 0) {
				result = parser.toJson(data2, {coerce: false});
			} else if (file.indexOf('large') >= 0) {
				result = parser.toJson(data2, {coerce: false, trim: true, sanitize: false});
			} else if (file.indexOf('entities') >= 0) {
/*
				console.log('XML ================================================== XML');
				console.log(file,':');
				console.log(data);
				console.log('--------------------------------------------------');
				console.log(result);
*/
				result = parser.toJson(data2, {trim: false, reversible: true, sanitize: true});
/*				
				console.log('XML ================================================== ');
				console.log(data2);
				console.log('--------------------------------------------------');
				console.log(result);
*/
			} else {
				result = parser.toJson(data2, {trim: false});
			}

			var jsonFile = basename + '.json';
			var expected = fs.readFileSync(fixturesPath + '/' + jsonFile) + '';

			if (expected) {
				expected = expected.trim();
			}
/*
			console.log('>>>>>>>>>>>>> ============ Result =============== <<<<<<<<<<<<<<<<');
			console.log(result);
			console.log('>>>>>>>>>>>>> ============ Expected =============== <<<<<<<<<<<<<<<<');
			console.log(expected)
*/
			assert.deepEqual(result, expected, jsonFile + ' and ' + file + ' are different');
			console.log('[xml2json: ' + file + '->' + jsonFile + '] passed!');
		} else if( ext == '.json') {
			var basename = path.basename(file, '.json');
			if (basename.match('reversible')) {
				var data = fs.readFileSync(fixturesPath + '/' + file);
				var result = parser.toXml(data);
				
				var xmlFile = basename.split('-')[0] + '.xml';
				var expected = fs.readFileSync(fixturesPath + '/' + xmlFile) + '';

				console.log(' ')
				console.log('===JSON==================================================JSON===')
				console.log(file,':')
				console.log('---data-----------------------------------------------')
				console.log(data)
				console.log('---result-----------------------------------------------')
				console.log(result)
				console.log(' ')

				if (expected) {
					expected = expected.trim();
				}
				console.log('---expected-----------------------------------------------');
				console.log(expected);
				//console.log(result + '<---');
				assert.deepEqual(result, expected, xmlFile + ' and ' + file + ' are different');
				console.log('[json2xml: ' + file + '->' + xmlFile + '] passed!');
			}
		}
	}
});

