const overlay = $($('.overlay')[0]),
  body = $('body')

export const openOverlay = (full = true) => {
  body.addClass('no-scroll')
  overlay.addClass('overlay--active')
  if (full)
    overlay.addClass('overlay--full')
}

export const closeOverlay = (full = true) => {
  body.removeClass('no-scroll')
  overlay.removeClass('overlay--active')
  if (full)
    overlay.removeClass('overlay--full')
}
