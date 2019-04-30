class FileHandler {
    constructor (input, options) {
        this._reader = new FileReader();
        this._onloadstartHandler = options.onloadstartHandler || function () {};
        this._onloadendHandler = options.onloadendHandler || function () {};

        input.addEventListener('change', this._handle.bind(this), false);
    }
    
    _handle(event) {
        let file = event.target.files[0];
        
        if (file) {
            this._reader.onloadstart = (this._onloadstartHandler)(file);
            this._reader.onloadend = (this._onloadendHandler)(file);

            this._reader.readAsText(file);
        }
    }
}
