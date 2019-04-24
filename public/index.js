
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
        let drawer = new Drawer();

        let content = drawer.createStartBlock();
        for (let i = 0; i < data.class.length; i++) {
            drawer.data = data.class[i];
            content += drawer.createBlock(i);
        }

        document.getElementById('diagramm').textContent = content;
        mermaid.init({}, '#diagramm');
    };
};

let fileHandler = new FileHandler(fileInput, {
    onloadstartHandler: startHandler, 
    onloadendHandler: endHandler
});