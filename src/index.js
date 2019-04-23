function handleFileSelect(evt) {
    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();

        reader.onloadstart = (function(file) {
            console.log('start');
        })(f);

        reader.onloadend = (function(file) {
            console.log('end');
            return function(e) {
                document.getElementById('json').value = file.result;
            };
        })(f);

        reader.readAsText(f);
    }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);