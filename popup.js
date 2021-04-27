let btn = document.getElementById('loginBtn')
btn.addEventListener('click',myLogin)

function myLogin(){
    var user = document.getElementById('user').value;
    var password = document.getElementById('pass').value;

    chrome.runtime.sendMessage({message:'login',email:user,password:password}, function(response){
        if(response.message == 'success')
            window.location.replace("./popupIn.html")
    });
}


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