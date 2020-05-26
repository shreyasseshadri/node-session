function postData(){
    fetch("http://localhost:3000/login",{
    method:"POST",
    headers: {
      "X-sample": "hello"
    },
    body: JSON.stringify({
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
        })
    })
    .then((resp) => {
        if(resp.ok){
            return resp.json()
        }
        else return
    })
    .then(resp => console.log(resp))
    .catch((err) => console.log(err))

    fetch("http://localhost:3000/content?param1=value1&param2=value2",{
        method:"GET",
        headers: {
          "X-sample": "hello"
        }
        })
        .then((resp) => {
            if(resp.ok){
                return resp.json()
            }
            else return
        })
        .then(resp => console.log(resp))
        .catch((err) => console.log(err))
}
