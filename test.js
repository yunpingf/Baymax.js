//Baymax.greet();
//alert(Baymax.html5_test.inputType('date'));
console.log('font-size-adjust'+" "+Baymax.css_test.supports('font-size-adjust'));
console.log(Baymax.css_test.validProp('display','auto1'));
console.log(Baymax.performance.networkLatency());

var progress = 100;

function render () {
	var element = document.getElementById("SomeElementYouWantToAnimate");
	element.style.position = 'absolute';
	element.style.left = Math.min(progress/10, 200) + "px";
	progress += 100;
}

Baymax.performance.fpsStart(render);

/*var start = null;
var element = document.getElementById("SomeElementYouWantToAnimate");
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress/10, 200) + "px";
  console.log(timestamp);
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);*/