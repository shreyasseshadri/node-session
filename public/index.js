function postData(){
    fetch("http://localhost:3000/login",{
    method:"POST",
    headers: {
		"Content-Type": "application/json",
	    "X-sample": "hello"
    },
    body: JSON.stringify({
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
        })
    })
    .then((resp) => {
        if(resp.ok){
            window.location.href = resp.url || window.location.href;
        }
    })
    .catch((err) => console.log(err))
}
