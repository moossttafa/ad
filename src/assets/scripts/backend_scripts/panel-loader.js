
$(document)
  .on("click", ".replacer", function (e) {
    e.preventDefault()
    let replacable = $(this).closest(".replacable"),
      targetTemplate = $($(this).data("target")),
      swap = $('<div>')

    swap.empty().html($(replacable.html()))
    replacable.empty().html($(targetTemplate.html()))
    targetTemplate.empty().html($(swap.html()))
    swap = $('<div>')
  })

export var reviewUpdateForm = function (item, url) {
  return `
    <div class="card__header">
      <a class="primary bold" href="#">
        ${item.user.fullname} ${item.user.is_verified ? '<i class="fa fa-check-circle ml-1"></i>' : ''}
      </a>
    </div>
    <form action="${url}" method="post">
      <div class="field-wrapper field-wrapper--no-label">
        <label class="field-wrapper__label">Review</label>
        <div class="field-wrapper__content">
            <input class="field-wrapper__input" type="text" placeholder="Insert your course title." name="title">
        </div>
        <ul class="messages"></ul>
      </div>
      <div class="field-wrapper field-wrapper--no-label">
        <label class="field-wrapper__label"></label>
        <div class="field-wrapper__content">
            <div class="rate-input"></div>
        </div>
        <ul class="messages"></ul>
        </div>
        <button class="btn btn--primary btn--text replacer" type="reset" data-target="#update-review-form">Cancel</button>
        <button class=" btn btn--primary btn--rounded" type="submit">Add Review</button>
    </form>
  </div>`
}
export var rednerReview = function (item) {
  return `<div class="card card--side-col card--transparent">
      <div class="card__side-col">
        <img class="image image--rounded image--profile"
             src="../../assets/images/hd_dp.jpg" alt="">
      </div>
      <div class="card__content replacable">
        <div class="card__header">
          <div class="card__header-multiline">
            <a class="primary bold" href="#">
              ${item.user.fullname} ${item.user.is_verified ? '<i class="fa fa-check-circle ml-1"></i>' : ''}
            </a>
            <time class="subtitle-2 gray">${item.created_at}</time>
            <div class="rate-display" data-rate="5"></div>
          </div>
          <div class="card__tools">
            <div class="more-dropdown">
              <a class="more-dropdown__link">
                <i class="fas fa-ellipsis-h"></i>
              </a>
              <div class="more-dropdown__content">
                <span class="content__item replacer" data-target="#update-review-form">
                  <i class="item__icon fa fa-edit"></i>Edit
                </span>
                <span class="content__item">
                    <i class="item__icon fa fa-trash"></i>Delete
                </span>
              </div>
            </div>
          </div>
          </div>
          <p class="text-2">${item.content}</p>
        </div>
    </div>`
}
export var renderReviewList = function (target, items) {
    let temp = $('<div>')
    temp.html($(target.html()))
    for (let item of items)
      temp.append($(rednerReview(item)))
    target.empty().append(temp)
  }
window.toggleLoading = function ($target, loading = false) {
    let target = $($target)
    target.toggleClass('panel__loader-loading')
    if (loading)
      target.empty().text('loading...')
    else
      target.empty().text('See More Reviews')
  }
export var hideLoading = function ($target) {
    $($target).remove()
  }

export class ListLoader {
  constructor(target) {
    this.target = $(target)
  }

  renderList() {
    console.log("lorem")
  }



}
