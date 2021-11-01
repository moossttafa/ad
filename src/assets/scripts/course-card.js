const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};
const getBreakpoint = () => {
    let docWidth = $(document).width();
    if (docWidth < breakpoints.sm) return "xs";
    else if (docWidth >= breakpoints.sm && docWidth < breakpoints.md)
      return "sm";
    else if (docWidth >= breakpoints.md && docWidth < breakpoints.lg)
      return "md";
    else if (docWidth >= breakpoints.lg && docWidth < breakpoints.xl)
      return "lg";
    else return "xl";
  },
  getBreakpointClass = (colClasses) => {
    let colClass = colClasses.find(
      (className) => className.indexOf(getBreakpoint()) !== -1
    );
    return colClass
      ? colClass
      : colClasses.find(
          (className) =>
            className.indexOf(
              colClasses
                .map((colClass) => colClass.split("-")[1])
                .reduce((a, b) => (breakpoints[a] < breakpoints[b] ? a : b))
            ) !== -1
        );
  };

let NoOfCols = 0,
  Position = 0;

// $(document)
//   .on("mouseenter", '.course-card-container .course-card__preview', function () {
//     let parent = $(this).closest('.course-card'),
//       container = $(this).closest('.course-card-container'),
//       count = Number(container.data('count')),
//       col = container.closest("[class^='col-']"),
//       currentBreakpoint = getBreakpoint(),
//       activeClasses = col.attr('class').split(' ')
//         .filter(className => className.indexOf('col-') !== -1),
//       activeClass = getBreakpointClass(activeClasses),
//       colWidth = Number(activeClass.split('-')[2])

//     NoOfCols = 12 / colWidth
//     let positionNo = count % NoOfCols
//     Position = positionNo !== 0 ? positionNo : NoOfCols
//     let toHideBefore = Position - 1,
//       toHideAfter = NoOfCols - Position

//     let toHide = col
//     for (let i = 0; i <= toHideAfter; i++) {
//       toHide = toHide.next()
//       toHide.hide()
//     }
//     toHide = col
//     for (let i = 0; i <= toHideBefore; i++) {
//       toHide = toHide.prev()
//       toHide.hide()
//     }
//     parent.addClass("course-card--hover animation")
//     col.addClass(`col-${currentBreakpoint}-12`)
//   })
//   .on("mouseleave", '.course-card-container .course-card__preview', function () {
//     let parent = $(this).closest('.course-card'),
//       container = $(this).closest('.course-card-container'),
//       col = container.closest("[class^='col-']"),
//       currentBreakpoint = getBreakpoint(),
//       toShowBefore = Position - 1,
//       toShowAfter = NoOfCols - Position;

//     let toShow = col
//     for (let i = 0; i <= toShowAfter; i++) {
//       toShow = toShow.next()
//       toShow.show()
//     }
//     toShow = col
//     for (let i = 0; i <= toShowBefore; i++) {
//       toShow = toShow.prev()
//       toShow.show()
//     }
//     parent.removeClass("course-card--hover animation")
//     col.removeClass(`col-${currentBreakpoint}-12`)
//   })

const courseTemplate = function (course) {
  return `
    <div class="course-card course-card--grid-view">
      <a href="${course.url}" class="course-card__preview youtube-activator">
        <img src="${course.cover}" alt="${course.title}" class="course-card__preview-cover">
        <div class="course-card__preview-video youtube-player"
             id="course-${course.id}"
             data-video-id="${course.video_id}"></div>
        <div class="course-card__preview-overlay"></div>
      </a>
      <div class="course-card__content">
				<a class="title-link text-2 semi-bold" href="${course.url}">${course.title}</a>
				<p class="title-link course-card__description body-2 gray">${course.description}</p>
				<div class="course-card__meta">
					<p class="body-2 gray">${course.category}</p>
          <p class="body-2 course-card__rate">
            <i class="fa fa-star"></i>${course.total_rate}
          </p>
        </div>
      </div>
			
    </div>`;
};

$(".course-card-container").each(function (i, item) {
  let course = $(item),
    data = course.data("data");
  course.html($(courseTemplate(data)));
});
