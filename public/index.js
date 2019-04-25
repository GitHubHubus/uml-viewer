
let fileInput = document.getElementById('file');
let startHandler = function () {
    console.log('start');
};
let endHandler = function () {
    console.log('end');
    return function(e) {
        let data = JSON.parse(e.currentTarget.result);
        let drawer = new Drawer();
        let content = drawer.createStartBlock();

        document.getElementById('json').value = e.currentTarget.result;
        
        for (let i = 0; i < data.class.length; i++) {
            drawer.data = data.class[i];
            content += drawer.createBlock();
        }

        for (let i = 0; i < data.interface.length; i++) {
            drawer.data = data.interface[i];
            content += drawer.createBlock();
        }

        for (let i = 0; i < data.trait.length; i++) {
            drawer.data = data.trait[i];
            content += drawer.createBlock();
        }

        document.getElementById('diagramm').textContent = content;
        mermaid.init({}, '#diagramm');
    };
};

let fileHandler = new FileHandler(fileInput, {
    onloadstartHandler: startHandler, 
    onloadendHandler: endHandler
});