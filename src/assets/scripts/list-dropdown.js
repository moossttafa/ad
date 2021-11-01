$(document).on('click', '.list-item', function () {
  if ($(this).next('.list-item-group')) { 
    $(this).toggleClass("list-item--open");
  }
})  