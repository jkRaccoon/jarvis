var express = require('express');
var router = express.Router();

router.all('/commend', function(req, res, next) {

	
	//if(req.body.token != 'Z3f0OKfnVE3crBlaRklZVqCa') throw Error('Invalid token');
	var text = (req.body.text)?req.body.text:"";
	
	return get_message(req.body.text)
	.then(function(message){
		var text = {
			text : message
		}
		res.send(text);
	})
});

function get_message(commend){
	var message;
	
	switch(commend){
		
		case '자비스 안녕':
			message = '안녕하세요.';
		break;
		
		case '자비스 날씨':
			message = '이런것좀 시키지마요...';
		break;
		case '자비스 명령어':
			message = '파일시스템,대역폭';
		break;
		default:
			message = '명령을 이해할 수 없습니다.';
		break;
	}
	
	return new Promise(function(resolve,reject){
		resolve(message);
	});
}


module.exports = router;
