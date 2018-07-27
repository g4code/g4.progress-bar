;(function() {

    var ProgressBar = function () {
        this.width = 0;
        this.elem  = document.getElementById("js_progress_bar");
    };

    ProgressBar.prototype = {

        start: function()
        {
            this.elem.style.width   = 0 + 'px';
            this.elem.style.display = 'block';
            this.id = setInterval(this.startLoader.bind(this), 10);
            this.elem.setAttribute('data-interval-id', this.id);
        },

        stop: function()
        {
            this.elem.style.width = 100 + '%';

            clearInterval(this.elem.getAttribute('data-interval-id'));
            this.elem.removeAttribute('data-interval-id');

            setTimeout(this.hideLoader.bind(this), 100);
        },

        startLoader: function()
        {
            if (this.width >= 100) {
                clearInterval(this.id);
                return;
            }

            this.width++;
            this.elem.style.width = this.width + '%';
        },

        hideLoader: function()
        {
            this.elem.style.display = 'none';
        }
    };

    if (typeof define != 'undefined' && define.hasOwnProperty('amd') && define.amd) { // RequireJS AMD
        define(function(){
            return ProgressBar;
        });
    }
    else if ((typeof module != 'undefined') && (module.exports)) { // Node Module
        module.exports = ProgressBar;
    }
    else if (typeof window != 'undefined') { // Fall back to attaching to window
        window.G4 = typeof G4 != "undefined" ? G4 : {};
        window.G4.progressbar = typeof G4.progressbar != "undefined" ? G4.progressbar : {};
        window.G4.progressbar = ProgressBar;
    }

}.call(this));