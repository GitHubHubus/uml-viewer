mermaid.initialize({startOnLoad:true});

document.getElementById('diagramm').textContent = 
"graph TD\n" +
"A --- B\n" +
"B-->C\n" +
"B-->D;";

let fileInput = document.getElementById('file');

let startHandler = function () {
    console.log('start');
};

let endHandler = function () {
    console.log('end');
    return function(e) {
        var data = JSON.parse(e.currentTarget.result);
        console.log(data);
        
        document.getElementById('json').value = e.currentTarget.result;
    };
};

let fileHandler = new FileHandler(fileInput, {
    onloadstartHandler: startHandler, 
    onloadendHandler: endHandler
});