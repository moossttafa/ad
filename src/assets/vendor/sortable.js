import Sortable from 'sortablejs/modular/sortable.complete.esm.js';

if ($('#content').length || $('#test').length){

  var chapterContentItem = document.getElementById('content');
  
  var sortableContentItem = Sortable.create(chapterContentItem);
  
  var sortableContentItem = new Sortable(chapterContentItem, {
    sort: true,
  })

  var chapterItem = document.getElementById('test');
  
  var sortableChapterItem = Sortable.create(chapterItem);
  
  var sortableChapterItem = new Sortable.create(chapterItem, {
    sort: true
  })
  
}



