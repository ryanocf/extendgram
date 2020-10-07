const _DEBUG = false;

const _PATTERN = {
    dm: /^\/direct\/t\/.+$/i,
    feed: /^\/$/i,
    inbox: /^\/direct\/[inbox\/]+$$/i,
    profile: /^\/p\/.+$/i,
    story: /^\/stories\/.+$/i,
};

const _POST = {
    attribute: `data-${GM_info.script.name}`,
    carousel: 'Tgarh',
    class: 'M9sTE',
    icons: ['ltpMr', 'wmtNn'],
    image: 'FFVAD',
    position: ['rQDP3', 1, 'XCodT', '_9nCnY', 'Ckrof'],
    tag: 'article',
    video: 'tWeCl',
};

/*
 * *** STORY ***
 * video(qbCDp)
 *      yes -> source
 *      no -> check img
 *          yes -> img
 *          no -> error
 */

const _SCRIPT = GM_info.script;

const _STORY = {
    offsets: ['video', 'qbCDp', 'source', 'img'],
};
