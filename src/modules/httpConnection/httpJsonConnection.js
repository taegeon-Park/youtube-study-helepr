const httpJsonConnection = async (url, body, resSuc, resFail) => {
    console.log('cccc',url);    
    
    let sendData = JSON.stringify(body);
    let json = await fetch(url, {
      method: 'POST',
      body: sendData,
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer',
      }
    })
      .then(res => res.json())
      .catch(err =>console.log(`${err}`));

   return json;
  };
  
  export default httpJsonConnection;