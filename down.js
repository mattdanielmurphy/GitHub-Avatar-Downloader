var request = require('request');
var token = require('./secrets');
var fs = require('fs');

// console.log('Welcome to the GitHub Avatar Downloader!');

// function getRepoContributors(repoOwner, repoName, cb) {
// 	var options = {
// 		url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
// 		headers: {
// 			'User-Agent': 'request',
// 			'Authorization': `token ${token.GITHUB_TOKEN}`
// 		}
// 	};
		
// 	request(options, function(err, res, body) {
// 		cb(err, body);
// 	});
// }

// getRepoContributors("jquery", "jquery", function(err, result) {
// 	console.log("Errors:", err);
// 	var newResult = JSON.parse(result);
// 	for (var i in newResult) {
// 		if (newResult[i].avatar_url) {
// 			console.log(newResult[i].avatar_url)
// 		}
// 	}
// });

var path = './test.whatever';

function downloadImageByURL(url, filePath) {
	request.get(url)
		.on('error', function(err) { throw err })
		.pipe(fs.createWriteStream(filePath))
}
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");