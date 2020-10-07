class Logger {
    constructor() {
        this.codes = {
            debug: {
                prefix: '🐛',
                style:
                    'font-weight: bold; color: rgba(255, 102, 0, 1.0); background-color: rgba(0, 0, 0, 0.7);',
            },
            error: {
                prefix: '❌',
                style:
                    'font-weight: bold; color: rgba(255, 0, 0, 1.0); background-color: rgba(0, 0, 0, 0.7);',
            },
            info: {
                prefix: '📌',
                style:
                    'font-weight: bold; color: rgba(0, 123, 255, 1.0); background-color: rgba(0, 0, 0, 0.7);',
            },
            warning: {
                prefix: '⚠️',
                style:
                    'font-weight: bold; color: rgba(255, 255, 0, 1.0); background-color: rgba(0, 0, 0, 0.7);',
            },
            success: {
                prefix: '✔️',
                style:
                    'font-weight: bold; color: rgba(0, 190, 0, 1.0); background-color: rgba(0, 0, 0, 0.7);',
            },
        };

        this.prefix = '[extendgram]';

        if (_DEBUG) this.debug('constructor of class Logger called');
    }

    debug(msg) {
        return console.log(
            `${this.prefix} ${this.codes.debug.prefix} - %c${msg}!`,
            this.codes.debug.style
        );
    }

    error(msg) {
        return console.log(
            `${this.prefix} ${this.codes.error.prefix} - %c${msg}!`,
            this.codes.error.style
        );
    }

    info(msg) {
        return console.log(
            `${this.prefix} ${this.codes.info.prefix} - %c${msg}!`,
            this.codes.info.style
        );
    }

    warning(msg) {
        return console.log(
            `${this.prefix} ${this.codes.warning.prefix} - %c${msg}!`,
            this.codes.warning.style
        );
    }

    success(msg) {
        return console.log(
            `${this.prefix} ${this.codes.success.prefix} - %c${msg}!`,
            this.codes.success.style
        );
    }
}
