$(document).on("click", ".btn", function (evt) {
  let targetElement = $(evt.currentTarget);
  let x = evt.pageX - targetElement.offset().left;
  let y = evt.pageY - targetElement.offset().top;
  let bgc = targetElement.css("color");
  bgc = bgc.substring(bgc.indexOf("(") + 1);
  bgc = bgc.substring(0, bgc.length - 1);

  let duration = 500;
  let animationFrame, animationStart;

  let animationStep = function (timestamp) {
    if (!animationStart) animationStart = timestamp;

    let frame = timestamp - animationStart;
    if (frame < duration) {
      let easing = (frame / duration) * (2 - frame / duration);
      let circle = `circle at ${x}px ${y}px`;
      let color = `rgba(${bgc}, ${0.7 * (1 - easing)})`;
      let stop = 90 * easing + "%";

      targetElement.css({
        "background-image": `radial-gradient(${circle},${color} ${stop},transparent ${stop})`,
      });

      animationFrame = window.requestAnimationFrame(animationStep);
    } else {
      $(targetElement).css({ "background-image": "none" });
      window.cancelAnimationFrame(animationFrame);
    }
  };

  animationFrame = window.requestAnimationFrame(animationStep);
});
