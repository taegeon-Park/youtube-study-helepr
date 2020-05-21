 const httpGetConnection = async (url, parameters, resSuc, resFail) => {
  let plusParamsUrl = url + '?';
  //let plusParamsUrl = url;
  // plus parameters
  if (parameters !== null) {
    let keys = Object.keys(parameters);
    keys.forEach(key => {
      plusParamsUrl += `${key}=${parameters[key]}&`
    });
    plusParamsUrl = plusParamsUrl.slice(0,plusParamsUrl.length-1);
  }
  console.log('cccc',plusParamsUrl);
  let json = await fetch(plusParamsUrl, {
    method: 'GET',
    headers:{
      'Authorization' : 'Bearer'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
    resSuc(json);

  // creation request
  // let req = new XMLHttpRequest();
  // // request open, with async option is true
  // req.open('GET', plusParamsUrl, false);
  // // set request-header authorization for cors
  // req.setRequestHeader("Authorization", "Bearer");
  // req.onreadystatechange = (e) => {
  //   switch (req.readyState) {
  //     case XMLHttpRequest.UNSET:
  //        console.log("현재 XMLHttpRequest 객체의 상태는 UNSET 입니다.<br>");
  //         break;
  //     case XMLHttpRequest.OPENED:
  //        console.log("현재 XMLHttpRequest 객체의 상태는 OPENED 입니다.<br>");
  //         break;
  //     case XMLHttpRequest.HEADERS_RECIEVED:
  //         console.log("현재 XMLHttpRequest 객체의 상태는 HEADERS_RECEIVED 입니다.<br>");
  //         break;
  //     case XMLHttpRequest.LOADING:
  //         console.log("현재 XMLHttpRequest 객체의 상태는 LOADING 입니다.<br>");
  //         break;
  //     case XMLHttpRequest.DONE:
  //         resSuc(req.responseText);
  //         break;
  //     default:
  //         break;
  //   }
  // }
  // req.send(null);
 return json;
};

export default httpGetConnection;