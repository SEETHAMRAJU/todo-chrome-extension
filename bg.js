function sendNote(text,website){
    console.log(text,website);
    // $.post('http://localhost:3000/api/test',{text,website});
    var jax = new XMLHttpRequest();
    jax.open("POST","http://localhost:3000/api/test");
    jax.setRequestHeader("Content-Type","application/json");
    jax.send(JSON.stringify({text,website}));
}
chrome.runtime.onMessage.addListener((req,send,res)=>{
    if(req.message == 'makenote'){
        sendNote(req.text,req.website);
    }
});