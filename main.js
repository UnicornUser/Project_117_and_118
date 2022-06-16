quick_draw_data_set=["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book"];

random_no = Math.floor((Math.random()*quick_draw_data_set.length)+1);
Element_of_array = quick_draw_data_set[random_no];
document.getElementById("sketch_to_be_drawn").innerHTML = "Sketch To Be Drawn: "+Element_of_array;

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;

function check_sketch() {
    timer_counter++;
    document.getElementById('time').innerHTML='Timer: '+timer_counter;
    console.log(timer_counter) 
    if(timer_counter > 400) { timer_counter = 0; timer_check = "completed" } 
    if(timer_check =="completed" || answer_holder == "set") 
    { timer_check = ""; answer_holder = ""; updateCanvas(); } 
}

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clearCanvas() {
    background("white");
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function classifyCanvas() {
    classifier.classify(canvas,gotResult);
}

function draw() {
}
   strokeWeight(13);
   stroke(0);

   if (mouseIsPressed) {
       line(pmouseX, pmouseY, mouseX, mouseY);
   }

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Label:' + results[0].label;

    document.getElementById('confidence').innerHTML = 'Confidence:' +Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechsynthesisisUtterance(results[0].label);
    SpeechSynthesis.speak(utterThis);
}