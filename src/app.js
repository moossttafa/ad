/* src/app.js */

// Styles
import "./assets/styles/app.scss"
// vendor
import "./assets/vendor/jquery-3.3.1.min.js"
// import "./assets/vendor/select2.min.js"
// import "./assets/vendor/fontawesome-free/js/all.js"
import "./assets/vendor/OwlCarousel/owl.carousel.js"
import "./assets/vendor/dropzone.js"
import "./assets/vendor/jquery-ui.min.js"


// import "./assets/vendor/bootstrap/js/bootstrap.min.js"
import "./assets/vendor/popper.min.js"
import "./assets/vendor/lightbox.min.js"
import "./assets/vendor/star/jquery.star-rating-svg"
import "./assets/vendor/venobox.min.js"
import "./assets/vendor/select2.min.js"
import "./assets/vendor/sortable.js"
// js
import "./assets/scripts/index"
// import {input} from "./assets/vendor/bootstrap/js/tests/integration/rollup.bundle"


let up = $('.count-up'),
  down = $('.count-down'),
  countable = $('.countable')


let x = {
  localCount: 0,
  get count() {
    return this.localCount
  },
  set count(v) {
    let value = v
    // if (v >= 5)
    //   value = 5
    // if (v <= 0)
    //   value = 0
    this.localCount = value
    this.countListener(value)
  },
  countListener(v) {
    console.log(v)
    countable.val(v)
  }
}


up.on('click', (v) => x.count++)
down.on('click', (v) => x.count--)
countable.on('input', v => x.count = v.target.value)
