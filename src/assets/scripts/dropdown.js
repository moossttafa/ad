// $('.dropdown__activator').each(function () {
//   $(this).on('click', function () {
//     $(this).toggleClass('dropdown--active')
//   })
//   if($(this).siblings().hasClass('dropdown--active')){
//     $(this).siblings().removeClass('dropdown--active')
//   }
// })
const DROPDOWN = {
  localEl: null,
  get el() {
    return this.localEl
  },
  set el(v) {
    this.localEl = v
  }
}

$(document)
  .on('click', '.dropdown__activator', function (e) {
    e.preventDefault()
    DROPDOWN.el = $(this).closest('.dropdown')
    DROPDOWN.el.addClass('dropdown--active')
  })
  .mouseup(function (e) {
    if (!DROPDOWN.el) return
    if ((!DROPDOWN.el.is(e.target) && DROPDOWN.el.has(e.target).length === 0) || DROPDOWN.el.hasClass('dropdown--close-on-click')) {
      DROPDOWN.el.removeClass('dropdown--active')
      DROPDOWN.el = null
    }
  })


$('.dropdown--header').each(function (item) {
  let content = $(item).find('.dropdown__content')
  // console.log(content)
  // if ($(document).attr('dir') === 'ltr') {
  //   console.log('4564')
  //   content.css('right', `-${$(document).width() - (content.offset().left + content.width())}px`)
  // } else {
  //   console.log('ere')
  //   content.css('left', `-${$(document).width() - content.offset().left}px`)
  // }
})
