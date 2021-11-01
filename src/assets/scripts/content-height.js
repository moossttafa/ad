MutationObserver = window.MutationObserver || window.WebKitMutationObserver;


const fitHeight = () => {
  let documentHeight = $(document).height(),
    headerHeight = $($('.header')[0]).height(),
    footerHeight = $($('.footer')[0]).height() + 60, //60 for margin top
    pageContent = $($('.page__content')[0]),
    pageContentHeight = pageContent.height()
  // console.log('documentHeight', documentHeight)
  // console.log('footerHeight', footerHeight)
  // console.log('pageContent', pageContent)
  // console.log('pageContentHeight', pageContentHeight)
  // console.log('===================')

  if (documentHeight >= (headerHeight + pageContentHeight + footerHeight)) {
    let newPageContentHeight = documentHeight - (headerHeight + footerHeight)
    // pageContent.css('height', `${newPageContentHeight}px`)
  }
}

// $(document).ready(() => {
//   fitHeight()
// })
// $(window).on('resize', () => {
//   fitHeight()
// })


let observer = new MutationObserver(function (mutations, observer) {
  fitHeight()
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer
  .observe(document, {
    subtree: true,
    attributes: true,
    childList: true,
  })
// observer.observe(document.querySelector(`#categories-listing`), {subtree: true, childList: true})
