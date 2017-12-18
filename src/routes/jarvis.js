var request = require('request');    // $ npm install request
var uuid = require('uuid-v4');  // $ npm install uuid-v4
var express = require('express');
var router = express.Router();
var story_id = "5a37bf5c65d4403afacb143a"; // <-- [중요] 적용할 스토리아이디 입력 : 스토리리스트>>만든 스토리 메뉴중 채널 클릭>>채널정보 화면에서 취득
var url = 'http://mindmap.ai:8000/v1/' + story_id + '/';
var inputtxtinit = "";
var inputJsonObjectDataInit = {
    "story_id": story_id,
    "context": {
        "conversation_id": uuid(), // 각각의 유저와의 대화로 따로 구별하기 위해서 uuid-v4를 이용하여 만든다. 로그관리에 필요하다.
        "information": {
            "conversation_stack": [
                {
                    "conversation_node": 'root',
                    "conversation_node_name": '루트노드'
                }
            ],
            "conversation_counter": 0,
            "user_request_counter": 0,
        },
        "visit_counter": 0,
        "reprompt": false,
        "retrieve_field": false,
        "message": null,
        "keyboard": null,
        "random": false,
        "input_field": false,
        "variables": null
    },
    "input": {
        "text": inputtxtinit
    }
};

router.all('/commend', function(req, res, next) {

	
	//if(req.body.token != 'Z3f0OKfnVE3crBlaRklZVqCa') throw Error('Invalid token');
	var text = (req.body.text)?req.body.text:"";
	if(req.query.text) text =  req.query.text;


	return get_message(text)
	.then(function(message){
		var text = {
			text : message
		}
		res.send(text);
	})
});

function get_message(commend){
	

	/*
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
	*/
	return new Promise(function(resolve,reject){
		

		// request 보내기
		var json = '';

		inputJsonObjectDataInit.input.text = commend.replace('자비스 ',"").trim();

		//console.log(inputJsonObjectDataInit.input.text)

		request({
	        url: url,
	        method: 'POST',
	        json: inputJsonObjectDataInit
	 
	    },
	    // response 받기
	    function(error, response, body){
	        //console.log("--------- response된 payload json 시작 ----------");
	        //console.log(body);
	        //console.log("--------- response된 payload json 끝 ----------");
	        //console.log("");
	        json = body;
	 		//console.log(json)
	        // 받은 텍스트보기
	        //var outputTextArray = json["output"]["visit_nodes_text"];
	        //console.log("outputTextArray: " + outputTextArray.toString());
	        //for(var i=0 ; i < outputTextArray.length ; i++){
	            //실행된 모든 노드의 대답을 표시한다
	         //   console.log(outputTextArray[i]);
	        //}

	        
	        var new_context = json['context'];
	 		inputJsonObjectDataInit.context = new_context
	 		resolve(json["output"]["text"].toString());


	    });


	});
}


 
	
 
 
// simple request & response sample
// // request 보내기
// var json = '';
// request({
//     url: url,
//     method: 'POST',
//     json: inputJsonObjectData
//
// },
//     // response 받기
//     function(error, response, body){
//     console.log(body);
//     json = body;
//     var outputTextArray = json["output"]["visit_nodes_text"];
//     console.log("outputTextArray: " + outputTextArray.toString());
//     for(var i=0 ; i < outputTextArray.length ; i++){
//         //실행된 모든 노드의 대답을 표시한다
//         console.log(outputTextArray[i]);
//     }
//
// });

module.exports = router;
