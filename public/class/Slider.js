class Slider {
    privates = {}
    constructor(setting) {
        this.setting = setting
        this.privates.setting = this.setting;

        this.privates.sel = {
            "main": document.querySelector(this.privates.setting.main),
            "wrap": document.querySelector(this.privates.setting.wrap),
            "children": document.querySelector(this.privates.setting.wrap).children,
            "prev": document.querySelector(this.privates.setting.prev),
            "next": document.querySelector(this.privates.setting.next),
            "wrapDots": document.querySelector(this.privates.setting.wrapDots),
            "dots": document.querySelector(this.privates.setting.wrapDots).children
        };

        // опции слайдера
        this.privates.opt = {
            "position": 0,
            "max_position": document.querySelector(this.privates.setting.wrap).children.length
        };

    
    }

    startSlider() {
        if(this.privates.sel.prev !== null || this.privates.sel.next !== null) {
            this.privates.sel.prev.addEventListener('click', () => {
                this.#prev_slide();
            });

            this.privates.sel.next.addEventListener('click', () => {
                this.#next_slide();
            });
        } 

        if(this.privates.sel.dots !== null) {
            let dots = [...this.privates.sel.dots];

            let numDataset = 0
            dots.forEach(element => {
                element.setAttribute("data-position", numDataset++)
            })

            this.#dotsSwitching(dots);
        }

    }

    // следующий слайд
    #next_slide() {
        ++this.privates.opt.position;

        try {
            const findClassActive = document.querySelector('.active')
            findClassActive.classList.remove('active')
            findClassActive.nextElementSibling.classList.add('active')
        } catch (e) {
            this.privates.sel.wrapDots.firstElementChild.classList.add('active')
        }

        if(this.privates.opt.position >= this.privates.opt.max_position) {
            this.privates.opt.position = 0;
        }

        this.privates.sel.wrap.style["transform"] = `translateX(-${this.privates.opt.position}00%)`;
    };


    // предыдущий слайд
    #prev_slide() {
        --this.privates.opt.position;

        try {
            const findClassActive = document.querySelector('.active')
            findClassActive.classList.remove('active')
            findClassActive.previousElementSibling.classList.add('active')
        } catch (e) {
            this.privates.sel.wrapDots.lastElementChild.classList.add('active')
        }

        if(this.privates.opt.position < 0) {
            this.privates.opt.position = this.privates.opt.max_position - 1;
        }

        this.privates.sel.wrap.style["transform"] = `translateX(-${this.privates.opt.position}00%)`;
    };


    // Функция менят слайд при клике на точку.
    #dotsSwitching(dots) {
        dots.forEach(item => {
            item.addEventListener('click', event => {
                event.preventDefault()

                // Показывате на активную точку.
                const findClassActive = document.querySelector('.active')
                findClassActive.classList.remove('active')
                event.target.classList.add('active')


                // При клике на точку меняет слайд
                this.privates.opt.position = event.target.dataset.position
                let dataPosition = event.target.dataset.position;
                this.privates.sel.wrap.style["transform"] = `translateX(-${dataPosition}00%)`;
            })
        })
    }

}