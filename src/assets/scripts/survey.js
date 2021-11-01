/*
window.onload = function() {
  var can = document.getElementById('canvas'),
      spanProcent = document.getElementById('procent'),
       c = can.getContext('2d');

  var posX = can.width / 2,
      posY = can.height / 2,
      fps = 1000 / 200,
      procent = 0,
      oneProcent = 360 / 100,
      result = oneProcent * 64;

  c.lineCap = 'round';
  arcMove();

  function arcMove(){
    var deegres = 0;
    var acrInterval = setInterval (function() {
      deegres += 1;
      c.clearRect( 0, 0, can.width, can.height );
      procent = deegres / oneProcent;

      spanProcent.innerHTML = procent.toFixed();

      c.beginPath();
      c.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
      c.strokeStyle = '#b1b1b1';
      c.lineWidth = '10';
      c.stroke();

      c.beginPath();
      c.strokeStyle = '#FAB01C';
      c.lineWidth = '10';
      c.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + deegres) );
      c.stroke();
      if( deegres >= result ) clearInterval(acrInterval);
    }, fps);

  }


}*/
// const numb = document.querySelector(".number");
// let counter = 0;
// setInterval(() => {
//   if(counter == 100 ){
//     clearInterval();
//   }else{
//     counter+=1;
//     numb.textContent = counter + "%";
//   }
// }, 80);