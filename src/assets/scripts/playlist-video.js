$('.header-dark__course-name , .sidebar-dark__close').on('click', function(e) {
    $('.sidebar-dark').toggleClass("sidebar-dark--close"); //you can list several class names 
    e.preventDefault();
  })