function postData(){
    console.log("here")
    fetch("http://localhost:3000",{
    method:"POST",
    headers: {
      "X-sample": "hello"
    },
    body: JSON.stringify({
        username: document.getElementById('username').value,
        name: document.getElementById('name').value
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
}
