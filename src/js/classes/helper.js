class Helper {
    constructor() {
        if (_DEBUG) L.debug('constructor of class Helper called');
    }

    download = async function (src) {
        await GM_download(src, 'download');
    };

    /* https://plainjs.com/javascript/manipulation/insert-an-element-after-or-before-another-32/ */
    insert_after = function (element, reference) {
        reference.parentNode.insertBefore(element, reference.nextSibling);
    };

    insert_before = function (element, reference) {
        reference.parentNode.insertBefore(element, reference);
    };

    in_new = async function (data) {
        await GM_openInTab(data, { active: true, insert: true });
    };

    notification = async function (text) {
        /* image = 256x256 */
        await GM_notification({
            text: text,
            title: `${_SCRIPT.name} v${_SCRIPT.version}`,
            silent: true,
            timeout: 3000,
        });
    };

    to_clipboard = async function (data, mode) {
        switch (mode) {
            case 'url':
                await GM_setClipboard(data, {
                    type: 'text',
                    mimetype: 'text/plain',
                });
                break;

            default:
                break;
        }

        this.notification('Copied to clipboard!');
    };
}
