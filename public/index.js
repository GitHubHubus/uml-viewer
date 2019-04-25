
let fileInput = document.getElementById('file');
let startHandler = function () {
    console.log('start');
};
let endHandler = function () {
    console.log('end');
    return function(e) {
        let data = JSON.parse(e.currentTarget.result);
        let types = ['class', 'interface', 'trait'];
        let drawer = new Drawer();
        let content = drawer.createStartBlock();
        let blocks = 0;
        let styles = '';
        
        for (let t = 0; t < types.length; t++) {
            if (data[types[t]] !== undefined) {
                for (let i = 0; i < data[types[t]].length; i++) {
                    drawer.data = data[types[t]][i];
                    content += drawer.createBlock();
                    styles += drawer.createStyles();
                    blocks++;
                } 
            }
        }

        document.getElementById('diagramm').textContent = content + styles;
        mermaid.init({}, '#diagramm');
    };
};
let rangeHandler = function (e) {
    console.log(e.target.value);
    document.getElementById('diagramm').style.width = e.target.value + 'px';
};


let fileHandler = new FileHandler(fileInput, {
    onloadstartHandler: startHandler, 
    onloadendHandler: endHandler
});

document.getElementById('range').addEventListener('change', rangeHandler, false);