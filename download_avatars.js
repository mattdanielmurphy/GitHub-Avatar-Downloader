var request = require('request');
var token = require('./secrets');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
	var options = {
		url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
		headers: {
			'User-Agent': 'request',
			'Authorization': `token ${token.GITHUB_TOKEN}`
		}
	};
		
	request(options, function(err, res, body) {
		cb(err, body);
	});
}

function downloadImageByURL(url, filePath) {
	request.get(url)
		.on('error', function(err) { throw err })
		.pipe(fs.createWriteStream(filePath))
}

getRepoContributors("jquery", "jquery", function(err, result) {
	console.log("Errors:", err);
	let parsedResult = JSON.parse(result);
	for (var i in parsedResult) {
		if (parsedResult[i]['avatar_url']) {
			let loginName = parsedResult[i]['login'];
			let avatarPath = `avatars/${loginName}.jpg`;
			let avatarURL = parsedResult[i]['avatar_url'];
			// console.log(avatarPath);
			downloadImageByURL(avatarURL, avatarPath);
		}
	}
});
