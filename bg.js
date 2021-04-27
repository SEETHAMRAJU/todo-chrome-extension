function getMyToken(){
    chrome.storage.sync.get(['name'],function(token){
        var l = token;
    })
}
function sendNote(text,website){
    var token = getMyToken()
    console.log(text,website);
    var jax = new XMLHttpRequest();
    jax.open("POST","http://localhost:3000/ext/api/note");
    jax.setRequestHeader("Content-Type","application/json");
    jax.send(JSON.stringify({'content':text}));
}
function storeToken(token){
    console.log(token)
}


async function login(creds){
    url = "http://localhost:3000/ext/api/signin"
    const response = await fetch(url,{
        method: 'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(creds)
    })
    const resp = await response.json();
    return resp['token']
}


chrome.runtime.onMessage.addListener((req,send,res)=>{
    if(req.message == 'makenote'){
        sendNote(req.text,req.website);
    }
    else if(req.message == 'login'){
        const user = {
            'email': req.email,
            'password': req.password
        }
        var token = login(user)        
        chrome.storage.sync.set({'token':token,'user_status':true})
        res({message:'success'})
    }
    else if(req.message == 'user_status'){
        chrome.storage.sync.get(['user_status'],function(val){
            console.log(val)
            res({message:val})
        })
    }
});

chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({'user_status':false})
})

chrome.browserAction.onClicked.addListener(function(){
    chrome.runtime.sendMessage({message:'user_status'},function(resp){
        if(resp.message){
            window.location.replace("./popupIn.html")
        }
        else{
            window.location.replace("./popup.html")
        }
    })
})
