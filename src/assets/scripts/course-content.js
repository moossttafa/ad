const contentTemplate = (item) => `
<div class="course-card course-card--grid-view">
	<a href="${item.url}" class="course-card__preview youtube-activator">
		<img src="${item.thumb}" alt="" class="course-card__preview-cover">
		<div class="course-card__preview-overlay"></div>
	</a>
	<div class="course-card__content">
		${
      item.enabled
        ? `<a class="title-5" href="${item.url}">${item.title}</a>`
        : item.title
    }
		<p class="title-link course-card__description body-2 gray">${
      item.description
    }</p>
		
	</div>

`;

const chapterTemplate = (item) => `
  <h3 class="chapter-item__title">${item.title}</h3>
  <div class="chapter-item__details">
    <span class="title-5">${item.progress}<span>lectures</span></span>
    <span class="title-5">${item.duration}</span>
  </div>`;

$(".content-list-item").each(function (i, item) {
  item = $(item);
  let data = item.data("data");
  item.html($(contentTemplate(data)));
});

$(".chapter-item").each(function (i, item) {
  item = $(item);
  let data = item.data("data");
  item.html($(chapterTemplate(data)));
});
