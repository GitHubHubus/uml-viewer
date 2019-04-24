class Drawer {
    set data (data) { this._data = data;};

    constructor (classData, options) {
        this._separator = '______________';
        this._modifiers = {'public': '+', 'private': '-', 'protected': '#'};
        this._data = classData;
    }
    
    createStartBlock() {
        return this.eol("graph TD");
    }
    
    createRelations() {
        
    }
    
    createBlock(index) {
        return this.eol(index + '["' + this._getStyledName() + '"]');
    }
    
    _getStyledName() {
        return this._data.name.trim();
    }
    
    _getStyledProperties() {
        
    }
    
    _getStyledMethods() {
        
    }
    
    eol(text) {
        return text + "\n";
    }
}
