// router.js
"using strict"

const contentTypes = require('./content-types');

// Listing 7.6(p.123-124)
const httpStatus = require('http-status-codes'),
  Content_type = require('./content-types'),
  utils = require('./utils'),
  routes = {
    GET: {},
    POST: {}
  };

// 라우트에 따른 콜백 함수를 처리하기 위한 함수 handle의 생성
exports.handle = (req, res) => {
  try {
      routes[req.method][req.url](req, res);
  } catch (e) {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/error.html",res);
    console.log("error: " + e);
  }
};

// main.js로부터 routes에 등록하기 위한 get 및 post 함수 생성
exports.get = (url, action) => {
  routes["GET"][url] = action;
};
exports.post = (url, action) => {
  routes["POST"][url] = action;
};

// <<< 나머진 라우트 코드 입력 하십시오 >>>

/**
 * get 또는 post를 호출하면 해당 라우트에 도달할 때 실행할 라우트와 함수를 전달해야 한다.
 * 이 함수는 리우트를 routes 객체에 추가해 등록하며, handle 함수에 의해 사용된다.
 *
 * 마지막 단계는 main.js로 router.js를 가져오는 것이다.
 *
 * main.js에서 수행하는 모든 함수 호출에 router를 추가해야 한다.
 * 이 함수는 이제 router.js에 속한다. 이 서버 생성을 통해 모든 요청들은 라우트 모듈의 처리
 * 함수에 의해 처리되며, 처리 함수에는 콜백 함수가 뒤따른다. 이제 router.get 이나 router.post를
 * 사용해 요청에서 라우트로 사용될 HTTP 메소드를 지정할 수 있다. 두 번째 변수는 요청을
 * 받았을 때 수행되기를 원하는 콜백이다.
 */