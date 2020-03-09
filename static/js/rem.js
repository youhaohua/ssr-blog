(function (){
if(process.browser){ 
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    function add(doc, win) {
    
        var docEl = doc.documentElement;
        var clientWidth = docEl.clientWidth;
        if (clientWidth ==1600) {
            docEl.style.fontSize = "100px"
    
        } else {
            docEl.style.fontSize = 100 * (clientWidth /1600) + 'px';
        }
    }
    add(document, window);
    
    window.onload = function() {
        setTimeout(function() {
            add(document, window);
            document.body.style.opacity = 1;
        }, 0)
    
    }
    
    window.addEventListener(resizeEvt, function() {
        add(document, window);
    }, false);
}
})()