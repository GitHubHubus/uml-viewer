class FileHandler {
    get state () { return this._states[this._reader.readyState]; }
    
    constructor (input, options) {
        this._states = {0: 'empty', 1: 'loading', 2: 'done'};
        this._reader = new FileReader();
        this._onloadstartHandler = options.onloadstartHandler || function () {};
        this._onloadendHandler = options.onloadendHandler || function () {};

        input.addEventListener('change', this._handle.bind(this), false);
    }
    
    _handle(event) {
        let file = event.target.files[0];

        this._reader.onloadstart = (this._onloadstartHandler)(file);
        this._reader.onloadend = (this._onloadendHandler)(file);

        this._reader.readAsText(file);
    }
}
