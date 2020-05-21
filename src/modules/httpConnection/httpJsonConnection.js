const httpJsonConnection = async (url, body, resSuc, resFail) => {
    console.log('cccc',url);    
    
    let json = await fetch(url, {
      method: 'POST',
      body,
      headers:{
        'Accept': 'application/json',
        'Authorization' : 'Bearer',
      }
    })
      .then(res => alert(`${res}`))
      .catch(err =>console.log(`${err}`));
      resSuc(json);

   return json;
  };
  
  export default httpJsonConnection;