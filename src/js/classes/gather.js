class Gather {
    constructor() {
        this.interval = setInterval(() => {
            this.main();
        }, 1000);
        this.url = window.location.pathname;
        this.observer_opt = {
            attributes: true,
        };
        this.observer = new MutationObserver((list, observer) => {
            let p = list[0].target;
            if (p.getElementsByClassName(_POST.video).length >= 1) {
                let e = p;
                for (let i = 0; i < 4; i++) {
                    e = e.parentElement;
                }
                this.handle_carousel(e);
            }
        });

        if (_DEBUG) L.debug('constructor of class Gather called');
    }

    main = function () {
        this.url = window.location.pathname;

        switch (true) {
            case _PATTERN.dm.test(this.url):
                break;

            case _PATTERN.feed.test(this.url):
                this.handle_posts();
                break;

            case _PATTERN.inbox.test(this.url):
                break;

            case _PATTERN.profile.test(this.url):
                this.handle_posts();
                break;

            case _PATTERN.story.test(this.url):
                this.handle_stories();
                break;

            default:
                break;
        }
    };

    handle_carousel = function (post) {
        let index = 0;

        let p = post.parentElement.parentElement.parentElement;

        const positions = p.getElementsByClassName(_POST.position[0])[0]
            .children[_POST.position[1]].children;

        for (let i = 0; i < positions.length; i++) {
            if (positions[i].classList.contains(_POST.position[2])) {
                index = i;
                break;
            }
        }

        if (index > 1) index = 1;

        let _p = p.getElementsByClassName(_POST.position[4])[index];

        let src =
            _p.getElementsByClassName(_POST.image).length == 1
                ? _p.getElementsByClassName(_POST.image)[0]
                : _p.getElementsByClassName(_POST.video)[0];

        if (src.classList.contains(_POST.video)) {
            src.volume = settings.obj.volume;

            this.handle_videos(_p);
        }

        return src.src;
    };

    handle_posts = function () {
        const posts = document.getElementsByClassName(_POST.class);

        for (let i = 0; i < posts.length; i++) {
            if (posts[i].getElementsByClassName('_8jZFn'))
                this.handle_videos(posts[i]); // image always appears again if scrolling down in feed

            if (posts[i].getAttribute(_POST.attribute)) continue;

            let src;

            if (posts[i].classList.contains(_POST.carousel)) {
                const p = posts[i].getElementsByClassName(_POST.position[4]);
                const c = posts[i].getElementsByClassName(_POST.position[3])[0];

                let links = [];
                for (let j = 0; j < p.length; j++) {
                    try {
                        links.push(
                            p[j].getElementsByClassName(_POST.image).length == 1
                                ? p[j].getElementsByClassName(_POST.image)[0]
                                      .src
                                : p[j].getElementsByClassName(_POST.video)[0]
                                      .src
                        );
                        this.observer.observe(c, this.observer_opt);
                    } catch (err) {
                        L.error(err);
                    }
                }

                src = links;
            } else {
                try {
                    if (
                        posts[i].getElementsByClassName(_POST.image).length == 1
                    ) {
                        src = posts[i].getElementsByClassName(_POST.image)[0]
                            .src;
                    } else {
                        let p = posts[i].getElementsByClassName(_POST.video)[0];
                        src = p.src;
                        p.volume = settings.obj.volume;
                        this.handle_videos(posts[i]);
                    }
                } catch (err) {
                    L.error(err);
                }
            }

            if (typeof src === 'undefined') continue;

            this.append_icons(posts[i], src, 'copy');
            this.append_icons(posts[i], src, 'download');
            this.append_icons(posts[i], src, 'in_new');
            posts[i].setAttribute(_POST.attribute, 'true');
        }
    };

    handle_videos = function (post) {
        try {
            post.getElementsByClassName('fXIG0')[0].style.display = 'none';
            post.getElementsByClassName('PyenC')[0].style.display = 'none';
            post.getElementsByClassName(_POST.video)[0].controls = true;
            post.getElementsByClassName('_8jZFn')[0].style.display = 'none';
        } catch (e) {}
    };

    handle_stories = function () {};

    append_icons = function (post, src, icon) {
        let range = document.createRange();
        let element = post.getElementsByClassName(_POST.icons[0])[0];
        range.selectNode(element);

        let append;
        let p;

        switch (icon) {
            case 'copy':
                append = range.createContextualFragment(`
                    <span class="${_SCRIPT.name}-${icon}">
                        <button class="wpO6b" type="button">
                            <div class="QBdPU">
                                <svg aria-label="copy link" class="_8-yf5" fill="#262626" height="24" viewBox="0 0 24 24" width="24">
                                    <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
                                </svg>
                            </div>
                        </button>
                    </span>
                `);

                helper.insert_before(
                    append,
                    post.getElementsByClassName(_POST.icons[1])[0]
                );

                p = post.getElementsByClassName(`${_SCRIPT.name}-${icon}`)[0];
                if (typeof src === 'object')
                    p.addEventListener('click', () => {
                        helper.to_clipboard(this.handle_carousel(p), 'url');
                    });
                else
                    p.addEventListener('click', () => {
                        helper.to_clipboard(src, 'url');
                    });
                break;

            case 'download':
                append = range.createContextualFragment(`
                    <span class="${_SCRIPT.name}-${icon}">
                        <button class="wpO6b" type="button">
                            <div class="QBdPU">
                                <svg aria-label="download" class="_8-yf5" fill="#262626" height="24" viewBox="0 0 24 24" width="24">
                                    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                </svg>
                            </div>
                        </button>
                    </span>
                `);

                helper.insert_before(
                    append,
                    post.getElementsByClassName(_POST.icons[1])[0]
                );

                p = post.getElementsByClassName(`${_SCRIPT.name}-${icon}`)[0];
                if (typeof src === 'object')
                    p.addEventListener('click', () => {
                        helper.download(this.handle_carousel(p));
                    });
                else
                    p.addEventListener('click', () => {
                        helper.download(src);
                    });
                break;

            case 'in_new':
                append = range.createContextualFragment(`
                    <span class="${_SCRIPT.name}-${icon}">
                        <button class="wpO6b" type="button">
                            <div class="QBdPU">
                                <svg aria-label="open in new tab" class="_8-yf5" fill="#262626" height="24" viewBox="0 0 24 24" width="24">
                                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                                </svg>
                            </div>
                        </button>
                    </span>
                `);

                helper.insert_before(
                    append,
                    post.getElementsByClassName(_POST.icons[1])[0]
                );

                p = post.getElementsByClassName(`${_SCRIPT.name}-${icon}`)[0];
                if (typeof src === 'object')
                    p.addEventListener('click', () => {
                        helper.in_new(this.handle_carousel(p));
                    });
                else
                    p.addEventListener('click', () => {
                        helper.in_new(src);
                    });
                break;

            default:
                break;
        }
    };
}
