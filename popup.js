let btn = document.getElementById('loginBtn')
btn.addEventListener('click',myLogin)

async function myLogin(){
    var user = document.getElementById('user').value;
    var password = document.getElementById('pass').value;
    await chrome.runtime.sendMessage({message:'login',email:user,password:password}, function(response){
        if(response == 'success'){
            window.close()          
        }
    });
}


