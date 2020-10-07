class Settings {
    defaults = {
        main_color: 'rgba(102, 0, 255, 1)',
        volume: 0.3,
    };

    constructor() {
        this.obj = this.get();
        console.log(this.obj);
        if (_DEBUG) L.debug('constructor of class Settings called');
    }

    delete(key) {
        GM_deleteValue(key);
        delete this.obj[key];

        if (_DEBUG) L.debug(`${key} deleted`);

        return key;
    }

    get() {
        let obj = {};

        for (let key in this.defaults) {
            let value = GM_getValue(key);

            if (typeof value === 'undefined') {
                obj[key] = this.defaults[key];
                L.warning(
                    `${key} was not found so it got replaced with the default value`
                );
                this.set(key, this.defaults[key]);
            } else {
                obj[key] = value;
            }
        }

        return obj;
    }

    set(key, value) {
        GM_setValue(key, value);
        this.obj[key] = value;

        if (_DEBUG) L.debug(`${key} set to ${value}`);

        return { key: value };
    }
}
