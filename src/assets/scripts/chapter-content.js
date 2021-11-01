const chapterTemplate = item => `
<div class="course-content mt-0">
  <h3 class="course-content__title">${item.courseName}</h3>
  <div class="course-content__details">
    <ul class="details__list">
        <li class="list__list-item"><span class="list--expand-all">Expand all</span></li>
        <li class="list__list-item"><span class="list--list-content-number">${item.noOfLectures}</span></li>
        <li class="list__list-item"><span class="list--time-course">${item.totalDuration}</span></li>
    </ul>
  </div>

  <div class="course-content">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="course-content__title">Chapter content</h3>
    </div>
    
    <div id="sortable">
      ${item.chapter.map(item =>(
        `<div>
            <div class="course-list__header">
              <div class="header__header-title">
                <span class="header-title__title">
                  <i class="fas fa-grip-vertical title__icon handle"></i>
                  <i class="fas fa-layer-group title__icon"></i>
                  <a href='#' class="title__title-text">${item.title}</a>
                </span>
              </div>
              <div class="header__header-details">
                <a class="btn btn--primary btn--text btn--icon mb-0" href="${item.actions.edit}"><i class="far fa-edit"></i></a>
                <a class="btn btn--primary btn--text btn--icon mb-0" href="${item.actions.translate}/${item.id}"><i class="fas fa-globe"></i></a>
                <a class="btn btn--primary btn--text btn--icon mb-0" href="${item.actions.delete}/${item.id}"><i class="far fa-trash-alt"></i></a>
                <a class="btn btn--primary btn--text btn--icon mb-0" href="#"><i class="fas fa-arrows-alt"></i></a>
              </div>
            </div>

            <div class="course-list__list-content">
              <div class="list-content__content-item">
                <div class="content-item__content-name">
                  <i class="uil uil-play-circle content-name__icon"></i>
                  <div class="content-name__top-title">
                  <div class="top-title__title">Why This Course?</div>
                </div></div><div class="content-item__details"><a class="details--preview-text" href="#">Preview</a><span class="details__content-summary">07:48</span></div></div>
            </div>
          </div>
        `))}
    </div>
      
      
  </div>
  </div>
`


$(".chapter").each(function (i, item){
  item = $(item)
  let data = item.data("data") 
  item.html($(chapterTemplate(data)))
})

