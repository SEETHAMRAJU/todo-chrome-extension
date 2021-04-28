let btn = document.getElementById("logoutBtn")
btn.addEventListener('click',myFunc)

async function myFunc(){
    await chrome.runtime.sendMessage({message:'logout'},function(response){
        if(response == 'success'){
            window.close()
        }
    });
}