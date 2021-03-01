function getParameters(){
    var options = {}
    options.phrase = document.getElementById("inputField").value
    options.colorOn = document.getElementById("colorOn").value
    options.colorOff = document.getElementById("colorOff").value
    return options
}

function createGraph(phrase,colorOn,colorOff) {
    var myCanvas = document.getElementById("myCanvas");
    //var colorOn = document.getElementById("colorOn").value
    //var colorOff = document.getElementById("colorOff").value
    ctx = myCanvas.getContext("2d")
    myCanvas.width = 400;
    myCanvas.height = 400;

    fullPhrase = phrase.split(" ")
    newphrase=""
    wordArray = []
    for( i=0; i<fullPhrase.length; i++){
        wordArray.push(stringToBinary(fullPhrase[i]))
        newphrase = "\"" + phrase + "\""
    }
    for (wordNum=0;wordNum<wordArray.length;wordNum++){
        WordObjects = convertWordToObjects(wordArray[wordNum],colorOn,colorOff)
        ratioSize = 1-((wordNum+1)/(wordArray.length+1))
        var myDougnutChart = new Piechart(
        {
            radius:Math.min((myCanvas.width/2.5)*(ratioSize),(myCanvas.height/2.5)*(ratioSize)),
            canvas:myCanvas,
            data:WordObjects,
            doughnutHoleSize:ratioSize,
            ratioSize:ratioSize
        }
    );
    myDougnutChart.draw();
    }
    fontSize = Math.max(Math.floor(myCanvas.width/newphrase.length),1)
    ctx.font = "italic bold "+fontSize+"pt Courier";
    ctx.fillStyle = colorOn;
    ctx.textAlign = "center";
    ctx.fillText(newphrase, myCanvas.width/2, myCanvas.height-20);
    // document.getElementById("fullText").innerHTML = newphrase.italics()
}

function gettingInfo() {
    options = getParameters();
    phrase = options.phrase;
    colorOn = options.colorOn;
    colorOff = options.colorOff;
    // = document.getElementById("inputField").value
}

function generateGraph(){
    options = getParameters();
    phrase = options.phrase;
    colorOn = options.colorOn;
    colorOff = options.colorOff;
    createGraph(phrase,colorOn,colorOff)
}

function stringToBinary(input) {
    var characters = input.split('');
  
    return characters.map(function(char) {
      const binary = char.charCodeAt(0).toString(2)
      const pad = Math.max(8 - binary.length, 0);
      // Just to make sure it is 8 bits long.
      return '0'.repeat(pad) + binary;
    }).join('');
}

function createChartData(arrayOfWords){
    item = [];
    for(i=0;i<arrayOfWords.length; i++){
        
    }

}

var convertWordToObjects = function(word,colorOn,colorOff){
    items = []
    for(i=0;i<word.length;i++){
        items.push(new Slice(word[i],colorOn,colorOff));
    }
    return items
}

var Slice = function(letter,colorOn,colorOff){
    this.color = letter=="1"?colorOn:colorOff;
}

var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.radius = options.radius;
    this.ratioSize = options.ratioSize;
 
    this.draw = function(){
        var color_index = 0;
        var start_angle = 0;
        for (categ in this.options.data){
            var slice_angle = 2 * Math.PI * 1 / options.data.length;
 
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                this.radius,
                start_angle,
                start_angle+slice_angle,
                options.data[color_index%options.data.length].color,
                false
            );
 
            start_angle += slice_angle;
            color_index++;
        }
 
        //drawing a white circle over the chart
        //to create the doughnut chart
        if (this.options.doughnutHoleSize){
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                this.options.doughnutHoleSize * (this.radius*ratioSize),
                0,
                2 * Math.PI,
                "#ffffff",
                true
            );
        }
    }
}

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color, doughnut){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX+0.5,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.linewidth = 1000
    if(doughnut){
        ctx.stroke()
    }
    ctx.fill();
    if(!doughnut){
        ctx.stroke();
    }
}

function exportImage(){
    options = getParameters();
    phrase = options.phrase;
    colorOn = options.colorOn;
    colorOff = options.colorOff;
    myPopup = window.open("export.html")
    myPopup.addEventListener('load', generateGraph(phrase,colorOn,colorOff), false);
    // generateGraph(phrase,colorOn,colorOff)
}
