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
        let relations = '';

        if (this._data.extend) {
            relations += this.eol(this._data.extend + '-->' + this._data.name);
        }
        
        if (this._data.interfaces && this._data.interfaces.length > 0) {
            for (let i = 0; i < this._data.interfaces.length; i++) {
                relations += this.eol(this._data.name + '-.->' + this._data.interfaces[i]);
            }
        }

        if (this._data.traits && this._data.traits.length > 0) {
            for (let i = 0; i < this._data.traits.length; i++) {
                relations += this.eol(this._data.name + '-.->' + this._data.traits[i]);
            }
        }

        return relations + ';';
    }
    
    createStyles() {
        return this.eol('class ' + this._data.name + ' block;');
    }
    
    createBlock() {
        let data = this.eol(this._data.name +
               '["' +
               this._getStyledName() +
               this.newline() +
               this._getStyledConstants() +
               this._getStyledProperties() +
               this._getStyledMethods() +
               '"]'
        );

        return data + this.eol(this.createRelations());
    }
    
    _getStyledName() {
        return this._data.name.trim();
    }
    
    _getStyledProperties() {
        if (!this._data.properties || this._data.properties.length === 0) {
            return '';
        }

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
            
            let type = p.type ? ': ' + p.type : '';
            content += this._modifiers[modifier] + '  ' + p.name + type + this.newline();
        }
        
        return this.separator() + this.newline() + content; 
    }
    
    _getStyledConstants() {
        if (!this._data.constants || this._data.constants.length === 0) {
            return '';
        }

        let content = '';

        for (let i = 0;i < this._data.constants.length; i++) {
            let c = this._data.constants[i];
            let type = c.type ? ': ' + c.type : '';
            let value = '';
            
            
            if (c.value !== undefined) {
                value = c.value.toString();
                value = value.length > 10 ? value.substring(0, 10) + '...' : c.value;
            }

            content += c.name + type + ' [ ' + value + ' ] ' + this.newline();
        }

        return this.separator() + this.newline() + content; 
    }
    
    _getStyledMethods() {
        if (!this._data.methods || this._data.methods.length === 0) {
            return '';
        }

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
            
            let type = m.type ? ': ' + m.type : '';
            content += this._modifiers[modifier] + '  ' + m.name + '(' + argumentsContent.join(',') + ')' + type + this.newline();
        }
        
        return this.separator() + this.newline() + content; 
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
