class Drawer {
    set data (data) { this._data = data;};

    constructor (classData, options) {
        this._modifiers = {'public': '+', 'private': '-', 'protected': '#'};
        this._data = classData;
    }
    
    createStartBlock() {
        return this.eol("graph TD");
    }
    
    createRelations() {
        
    }
    
    createBlock(index) {
        return this.eol(index +
               '["' +
               this.eol(this._getStyledName()) +
               this.newline() +
               this.separator() +
               this.newline() +
               this.eol(this._getStyledProperties()) +
               this.separator() +
               this.newline() +
               this.eol(this._getStyledMethods()) +
               '"]'
        );
    }
    
    _getStyledName() {
        return this._data.name.trim();
    }
    
    _getStyledProperties() {
        let content = '';

        for (let i = 0;i < this._data.properties.length; i++) {
            let p = this._data.properties[i];
            let modifier = 'public';
            for (let j = 0; j < p.modifiers.length; j++) {
                if (this._modifiers[p.modifiers[j]] !== undefined) {
                    modifier = p.modifiers[j];
                    break;
                }
            }
            
            let type = p.type || '';
            content += this._modifiers[modifier] + '  ' + p.name + ': ' + type + this.newline();
        }
        
        return content; 
    }
    
    _getStyledMethods() {
        let content = '';

        for (let i = 0;i < this._data.methods.length; i++) {
            let m = this._data.methods[i];
            let modifier = 'public';
            let argumentsContent = [];

            for (let j = 0; j < m.modifiers.length; j++) {
                if (this._modifiers[m.modifiers[j]] !== undefined) {
                    modifier = m.modifiers[j];
                    break;
                }
            }
            
            for (let s = 0; s < m.arguments.length; s++) {
                if (this._modifiers[m.modifiers[s]] !== undefined) {
                    argumentsContent.push(m.arguments[s].type || '' + m.arguments[s].name);
                }
            }
            
            let type = m.type || '';
            content += this._modifiers[modifier] + '  ' + m.name + '(' + argumentsContent.join(',') + '): ' + type + this.newline();
        }
        
        return content; 
    }
    
    eol(text) {
        return text + "\n";
    }
    
    newline() {
        return "<br />";
    }
    
    separator() {
        return '______________';
    }
}
