const httpPostConnection = async (url, body, resSuc, resFail) => {
    console.log('cccc',url);    
    
    let json = await fetch(url, {
      method: 'POST',
      body,
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer',
      }
    })
      .then(res => alert(`${res}`))
      .catch(err =>console.log(`${err}`));
      resSuc(json);

   return json;
  };
  
  export default httpPostConnection;