class Drawer {
    set data (data) { this._data = data;};

    constructor (classData) {
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

        if (this._data.interfaces) {
            this._data.interfaces.forEach((name) => {
                relations += this.eol(this._data.name + '-.->' + name);
            });
        }

        if (this._data.traits) {
            this._data.traits.forEach((name) => {
                relations += this.eol(this._data.name + '-.->' + name);
            });
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

        return data + this.createRelations();
    }
    
    _getStyledName() {
        return this._data.name.trim();
    }
    
    _getStyledProperties() {
        if (!this._data.properties || this._data.properties.length === 0) {
            return '';
        }

        let content = '';
        
        this._data.properties.forEach((p) => {
            let modifier = '';
            let type = p.type ? ': ' + p.type : '';

            p.modifiers.forEach((m) => {
                if (this._modifiers[m] !== undefined) {
                    modifier = this._modifiers[m];
                    return;
                }
            });

            content += modifier + '  ' + p.name + type + this.newline();
        });
        
        return this.separator() + this.newline() + content; 
    }
    
    _getStyledConstants() {
        if (!this._data.constants || this._data.constants.length === 0) {
            return '';
        }

        let content = '';

        this._data.constants.forEach((c) => {
            let value = '';
            let type = c.type ? ': ' + c.type : '';

            if (c.value !== undefined) {
                value = c.value.toString();
                value = value.length > 10 ? value.substring(0, 10) + '...' : c.value;
                value = ' [ ' + value + ' ] ';
            }

            content += c.name + type + value + this.newline();
        });

        return this.separator() + this.newline() + content; 
    }
    
    _getStyledMethods() {
        if (!this._data.methods || this._data.methods.length === 0) {
            return '';
        }

        let content = '';

        this._data.methods.forEach((m) => {
            let modifier = '';
            let argumentsContent = [];
            let type = m.type ? ': ' + m.type : '';
            
            m.modifiers.forEach((mod) => {
                if (this._modifiers[mod] !== undefined) {
                    modifier = this._modifiers[mod];
                    return;
                }
            });
            
            m.arguments.forEach((a) => {
                let atype = a.type ? a.type + ' ' : '';
                argumentsContent.push(atype + a.name);
            });
            
            
            content += modifier + '  ' + m.name + '(' + argumentsContent.join(', ') + ')' + type + this.newline();
        });
        
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
