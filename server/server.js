const http = require('http');
const url = require('url');
const request = require('request');
const cheerio = require('cheerio');

let server = http.createServer(function(req, res){
	router(req, res);
})

server.listen(7070, function(){
	console.log('server listening port 7070');
})

////////////////////////////////////////////////////////// high level functions /////////////////////////////////////////////////////

function router(req, res){
	let query = url.parse(req.url).query;

	if(req.url == '/flows/'){
		returnFlowsList(res);
	}
	if(query){
		console.log(`requested: ${query}`);
		returnFlow(query, res);
	}
}

async function returnFlowsList(res){
	let list = await getFlowList(2);
	res.end( JSON.stringify(list) );
}

async function returnFlow(name, res){
	let link = convertToLink(name);
	let flow = await getFlowPosts(link);
	res.end( JSON.stringify(flow) );
}

//////////////////////////////////////////////////////////////// parse logic ///////////////////////////////////////////////////////

function getFlowList(threshold){
	const URL = 'https://habrahabr.ru/';
	let promise = new Promise(function(resolve){

		request(URL, function(err, res, body){
			let list = [];

			if(err){
				throw err;
			}

			let $ = cheerio.load(body);
			let listDOM = $('.default-block.default-block_sidebar')[0].children[3].children[1];
			
			listDOM = listDOM.children.filter(function(child){
				if(child.name == 'li'){
					return true;
				}
			})

			listDOM.forEach(function(li){
				
				let numberOfNew = $('strong', li)[0];
				if(!numberOfNew){return;}
				numberOfNew = Number(numberOfNew.children[0].data);
				
				if(numberOfNew > threshold){
					list.push({name: $('span', li)[0].children[0].data,
							   numberOfNew: numberOfNew
							  });
				}
			})
			resolve(list);
		});

	})
	return promise;
}

function getFlowPosts(link){
	let promise = new Promise(function(resolve){

		request(link, function(err, res, body){
			let list = [];
			if(err){
				throw err;
			}

			let $ = cheerio.load(body);
			let listDOM = $('a.post__title_link');

			for(let a in listDOM){
				if(listDOM[a].name != 'a'){continue;}
				list.push({'name': listDOM[a].children[0].data,
							'link': listDOM[a].attribs.href
						  })
			}
			resolve(list);
		})

	})
	return promise;
}

//an instruction how to use query:

function convertToLink(name){
	switch(name){
		case 'develop': return 'https://habrahabr.ru/flows/develop/';
		case 'admin': return 'https://habrahabr.ru/flows/admin/';
		case 'design': return 'https://habrahabr.ru/flows/design/';
		case 'management': return 'https://habrahabr.ru/flows/management/';
		case 'marketing': return 'https://habrahabr.ru/flows/marketing/';
		case 'misc': return 'https://habrahabr.ru/flows/misc/';
	}
}