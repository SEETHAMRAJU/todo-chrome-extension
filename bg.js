

SIGNIN_URL = "http://localhost:3000/ext/api/signin"
POST_NOTE_URL = "http://localhost:3000/ext/api/note"
GET_DATA_URL = "http://localhost:3000/ext/api/data"


async function getMyToken(){
    chrome.storage.sync.get(['token'],function(result){
        return result.token;
    });

}
async function sendNote(text,website){
    await chrome.storage.sync.get(['token'],async function(result){
        const response = await fetch(POST_NOTE_URL,{
            method: 'POST',
            headers:{
                'Content-type':'application/json',
                'authorization': result.token
            },
            body: JSON.stringify({'content':text,'website':website})
        });
        const resp = await response.json();
    })
}


async function login(creds){
    const response = await fetch(SIGNIN_URL,{
        method: 'POST',
        headers:{
            'Content-type':'application/json',
        },
        body: JSON.stringify(creds)
    })
    const resp = await response.json();
    console.log("0-",resp['token'])
    return resp['token']
}


chrome.runtime.onMessage.addListener(async (req,send,res)=>{
    if(req.message == 'makenote'){
        sendNote(req.text,req.website);
    }
    else if(req.message == 'login'){
        const user = {
            'email': req.email,
            'password': req.password
        }
        var myToken = await login(user)    
        chrome.storage.sync.set({'token':myToken,'user_status':true})
        chrome.browserAction.setPopup({popup:"./popupIn.html"},()=>{
            res('success')
        })
        return true
    }
    else if(req.message == 'logout'){
        chrome.storage.sync.set({'user_status':false},()=>{console.log('fasle-status')})
        chrome.storage.sync.remove('token')

        chrome.browserAction.setPopup({ popup: "./popup.html"}, () => {
            res('success');
        })
        return true
    }
});

chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({'user_status':false})
})

async function getData(tab){
    let website = tab.url
    await chrome.storage.sync.get(['token'],async function(result){
        const response = await fetch(GET_DATA_URL,{
            method: 'POST',
            headers:{
                'Content-type':'application/json',
                'authorization': result.token
            },
            body: JSON.stringify({'website':website})
        });
        const resp = await response.json();
    })

}
async function sendData(data,tab){
    console.log(data)
    var message = "You have"+data['tasks']+ " tasks pending as";
    chrome.tabs.sendMessage(tab.id,{data: message})
}

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, t) {
    
    if (changeInfo.status == 'complete' && t.active) {
        let queryOptions = { active: true, currentWindow: true };
        await chrome.tabs.query(queryOptions,async (b)=>{
            var tab = b[0]
            await chrome.storage.sync.get(['token'],async function(result){
                const response = await fetch(GET_DATA_URL,{
                    method: 'POST',
                    headers:{
                        'Content-type':'application/json',
                        'authorization': result.token
                    },
                    body: JSON.stringify({'website':tab.url})
                });
                const resp = await response.json();
                sendData(resp,tab)
            })
        });
                
    }
})
