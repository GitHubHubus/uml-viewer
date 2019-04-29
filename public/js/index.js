let fileInput = document.getElementById('file');
let rangeInput = document.getElementById('range');
let blockDiagramm = document.getElementById('diagramm');

let endHandler = function () {
    return function(e) {
        let data = JSON.parse(e.currentTarget.result);
        let drawer = new Drawer();
        let content = drawer.createStartBlock();
        let styles = '';
        
        Object.keys(data).map(function(key) {
            data[key].forEach(function (classObject) {
                classObject.type = key;
                drawer.data = classObject;
                content += drawer.createBlock();
                styles += drawer.createStyles();
            });
        });

        blockDiagramm.textContent = content + styles;
        blockDiagramm.removeAttribute('data-processed');
        mermaid.init({}, '#diagramm');
    };
};
let rangeHandler = function (e) {
    blockDiagramm.style.width = e.target.value + 'px';
};

let fileHandler = new FileHandler(fileInput, {onloadendHandler: endHandler});

rangeInput.addEventListener('change', rangeHandler, false);