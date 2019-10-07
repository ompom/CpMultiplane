
var d = document;

module.exports = {

    selector:       '',
    group:          null,
    active:         false,
    currentItem:    null,
    currentGallery: null,
    galleries:      [],
    captions:       [],
    img:            d.createElement('img'),
    lightbox:       d.createElement('div'),
    wrap:           d.createElement('div'),
    caption:        d.createElement('div'),
    closeButton:    d.createElement('a'),
    prevButton:     d.createElement('a'),
    nextButton:     d.createElement('a'),
    lastFocus:      null,

    init: function(options) {

        var $this = this;

        // overwrite config
        if (options) {
            if (typeof options == 'string') {
                this.selector = options;
            } else {
                Object.keys(options).forEach(function(k) {
                    $this[k] = options[k];
                });
            }
        } else { return; }

        this.lightbox.setAttribute('class', 'lightbox');
        this.lightbox.setAttribute('role', 'dialog');
        this.lightbox.setAttribute('aria-hidden', 'true');
        this.lightbox.tabIndex = -1;

        d.querySelector('body').appendChild(this.lightbox);

        this.prevButton.setAttribute('href', '#');
        this.nextButton.setAttribute('href', '#');
        this.closeButton.setAttribute('href', '#');
        
        this.prevButton.setAttribute('aria-label', 'previous');
        this.nextButton.setAttribute('aria-label', 'next');
        this.closeButton.setAttribute('aria-label', 'close');

        this.prevButton.classList.add('prev');
        this.nextButton.classList.add('next');
        this.closeButton.classList.add('icon-close');

        this.lightbox.appendChild(this.wrap);
        this.lightbox.appendChild(this.prevButton);
        this.lightbox.appendChild(this.nextButton);
        this.lightbox.appendChild(this.closeButton);
        this.wrap.appendChild(this.img);

        if (this.group) {
            var groups = d.querySelectorAll(this.group);
            Array.prototype.forEach.call(groups, function(el, i) {
                $this.galleries.push(el.querySelectorAll($this.selector));
            });
        }
        else {
            this.galleries.push(d.querySelectorAll(this.selector));
        }

        Array.prototype.forEach.call(this.galleries, function(gallery, k) {

            $this.captions[k] = {};

            Array.prototype.forEach.call(gallery, function(el, i) {

                el.addEventListener('click', function(e) {

                    if (e) e.preventDefault();
                    
                    $this.lastFocus = el || d.activeElement;

                    $this.active         = true;
                    $this.currentItem    = i;
                    $this.currentGallery = k;

                    $this.update();

                });

                // find caption
                var node = (el.parentNode).querySelector('figcaption');
                if (node) {
                    $this.captions[k][i] = node.innerHTML;
                } else if (el.getAttribute('title')) {
                    $this.captions[k][i] = el.getAttribute('title');
                } else if (el.dataset.title) {
                    $this.captions[k][i] = el.dataset.title;
                }

            });
        });

        this.prevButton.addEventListener('click', function(e) {
            if (e) {e.preventDefault();e.stopPropagation();};
            $this.prev(e);
        });

        this.nextButton.addEventListener('click', function(e) {
            if (e) {e.preventDefault();e.stopPropagation();};
            $this.next(e);
        });

        this.closeButton.addEventListener('click', function(e) {
            if (e) e.preventDefault();
        });

        // close lightbox on click
        this.lightbox.addEventListener('click', function(e) {
            if (e && e.target.nodeName == 'IMG') {
                return; // don't close when clicking on image
            }
            $this.close(e);
        });

        // force focus to modal
        d.addEventListener('focus', function(e) {
            if ($this.active && !$this.lightbox.contains(e.target)) {
                e.stopPropagation();
                $this.lightbox.focus();
            }
        }, true);

        d.addEventListener('keydown', function(e) {
            if ($this.active) {
                if (e.keyCode == 37) $this.prev(e);
                if (e.keyCode == 39) $this.next(e);
                if (e.keyCode == 27) $this.close(e);
            }
        });

    },

    update: function() {

        // show/hide lightbox
        if (!this.active) {
            this.lightbox.classList.remove('active');

            // accessibility
            this.lightbox.setAttribute('aria-hidden', 'true');
            this.lastFocus.focus();
            return;
        }

        this.lightbox.classList.add('active');

        // accessibility
        this.lightbox.focus();

        // hide first/last prev/next buttons
        if (this.currentItem == 0) {
            this.prevButton.classList.add('hidden');
        } else this.prevButton.classList.remove('hidden');

        if (this.currentItem == this.galleries[this.currentGallery].length -1) {
            this.nextButton.classList.add('hidden');
        }
        else this.nextButton.classList.remove('hidden');

        // switch image
        this.img.setAttribute('src', this.galleries[this.currentGallery][this.currentItem].getAttribute('href'));

        // switch caption
        if (this.captions[this.currentGallery][this.currentItem]) {
            this.caption.innerHTML = this.captions[this.currentGallery][this.currentItem];
            this.wrap.appendChild(this.caption);
        } else if (this.wrap.contains(this.caption)) {
            this.wrap.removeChild(this.caption);
        }

    },

    prev: function(e) {
        if (this.galleries[this.currentGallery][this.currentItem - 1]) {
            this.currentItem -= 1;
            this.update();
        }
    },

    next: function(e) {
        if (this.galleries[this.currentGallery][this.currentItem + 1]) {
            this.currentItem += 1;
            this.update();
        }
    },

    close: function(e) {
        this.active = false;
        this.update();
    },

};
