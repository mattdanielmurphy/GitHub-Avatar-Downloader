const request = require('request');
const token = require('./secrets');
const fs = require('fs');

const arg1 = process.argv[2];
const arg2 = process.argv[3];

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

getRepoContributors(arg1, arg2, function(err, result) {
	if((arg1 && arg2) !== undefined) {
		console.log("Errors:", err);
		let parsedResult = JSON.parse(result);
		for (var i in parsedResult) {
			if (parsedResult[i]['avatar_url']) {
				let loginName = parsedResult[i]['login'];
				let avatarPath = `avatars/${loginName}.jpg`;
				let avatarURL = parsedResult[i]['avatar_url'];
				downloadImageByURL(avatarURL, avatarPath);
			}
		}
	} else {
		console.log('Error: You must provide two arguments via console.');
	}
});
