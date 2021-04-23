(function () {
    function myFunction(){
        var txt = window.getSelection().toString();
        console.log(txt);
        console.log(document.URL);
        chrome.runtime.sendMessage({message:'makenote',text: txt,website: document.URL})
        // return;

    }
           
    function init(){
        var head = document.head;
        var link = document.createElement("link");
    
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css";
    
        head.appendChild(link);

        // var button = document.createElement("button");
        // button.appendChild(document.createTextNode("Click Me!"));
        // button.addEventListener("click",myFunction);
        // document.body.appendChild(button);
        
        // var a = document.createElement("a");
        var a = document.createElement("button");
        var icon = document.createElement("i");
        icon.setAttribute("class","fa fa-plus my-float");
        // a.setAttribute("href","https://google.com");
        a.addEventListener("click",myFunction);
        a.setAttribute("class","float");
        a.appendChild(icon);
        document.body.appendChild(a);

    }
    function selection(){
        if(document.selection){
            init();
        }
    }

init();
// selection();
console.log("--");
})();

// (function () {
//     var button = document.createElement("button");
    
//     document.body.appendChild(button);
//     console.log('-=======');
// })();