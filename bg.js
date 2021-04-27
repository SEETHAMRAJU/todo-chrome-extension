function getMyToken(){
    chrome.storage.sync.get(['name'],function(token){
        var l = token;
    })
}
function sendNote(text,website){
    var token = getMyToken()
    console.log(text,website);
    var jax = new XMLHttpRequest();
    jax.open("POST","http://localhost:3000/api/test");
    jax.setRequestHeader("Content-Type","application/json");
    jax.send(JSON.stringify({text,website}));
}
function storeToken(token){
    console.log(token)

}
chrome.runtime.onMessage.addListener((req,send,res)=>{
    if(req.message == 'makenote'){
        // sendNote(req.text,req.website);
        console.log(chrome.identity.AccountInfo)
    }
});
// TODO: see if it has to be changed to onInstalled

// chrome.runtime.onStartup.addListener(function(){
chrome.runtime.onInstalled.addListener(async function(){
    request = {
        'email':'a@a.com',
        'password': '12345678'
    }
    url = "http://localhost:3000/api/test"
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    const res = await response.json();
    await chrome.storage.sync.set({'name':res['name']})
    getMyToken()
})