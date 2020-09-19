let canvasElem = document.getElementById("canvasArea");
let canvasContext = canvasElem.getContext('2d');
let vertical = document.getElementById('vertical');
let square = document.getElementById('square');
let horizontal = document.getElementById('horizontal');
let json1 = document.getElementById('json1');
let json2 = document.getElementById('json2');
let json3 = document.getElementById('json3');
let puttingInf = document.getElementsByClassName("puttingInf");
let tempData = null;


// canvasElem.width = "1080";
// canvasElem.height = "1080";
let JSON1 = null;
let canvasLoadedElem = null;
let length = null;

// canvasContext.fill();

var xhttp = new XMLHttpRequest();

function startPutting(elem){
    // console.log("==================start Putting==============");
    // console.log(canvasLoadedElem[elem]);
    // console.log("index is: "+elem);
        if(canvasLoadedElem[elem].text){
            canvasLoadedElem[elem].text.split("\n").forEach((item, index)=>{ 
                // console.log(item);
                let fontSize = canvasLoadedElem[elem].fontSize;
                let increace = fontSize * index;
                canvasContext.textAlign = canvasLoadedElem[elem].textAlign;
                canvasContext.font = `${fontSize}px ${canvasLoadedElem[elem].fontFamily}`;
                canvasContext.fillStyle = canvasLoadedElem[elem].color;
                canvasContext.fillText(item, canvasLoadedElem[elem].x, canvasLoadedElem[elem].y + increace);
            });
            canvasContext.globalAlpha = canvasLoadedElem[elem].opacity;
            length--;
            startRendering();
        }else if(canvasLoadedElem[elem].name === "Rectange"){
            canvasContext.scale(canvasLoadedElem[elem].scaleX, canvasLoadedElem[elem].scaleY);
            canvasContext.fillStyle = canvasLoadedElem[elem].color;
            canvasContext.fillRect(canvasLoadedElem[elem].x, canvasLoadedElem[elem].y, canvasLoadedElem[elem].width, canvasLoadedElem[elem].height);
            canvasContext.globalAlpha = canvasLoadedElem[elem].opacity;
            length--;
            startRendering();
        }else{
            const img = new Image();
            img.src = canvasLoadedElem[elem].exportedAsset;
            img.onload = function(){ 
                img.width = canvasLoadedElem[elem].width;
                img.height = canvasLoadedElem[elem].height;
                canvasContext.scale(canvasLoadedElem[elem].scaleX, canvasLoadedElem[elem].scaleY);
                canvasContext.drawImage(img, canvasLoadedElem[elem].x, canvasLoadedElem[elem].y, canvasLoadedElem[elem].width, canvasLoadedElem[elem].height);
                canvasContext.globalAlpha = canvasLoadedElem[elem].opacity;
                length--;
                startRendering();
        }
    }
}

function startRendering(){ 
    // console.log("length", length);
    if(length <= 0){
        vertical.removeAttribute('disabled');
        square.removeAttribute('disabled');
        horizontal.removeAttribute('disabled');
        json1.removeAttribute('disabled');
        json2.removeAttribute('disabled');
        puttingInf[0].innerHTML = "Completed";
        puttingInf[1].innerHTML = "Completed";
        return false;
    }
    startPutting(length-1);
}

function renderCanvas(data = JSON1){ 
    vertical.setAttribute('disabled', 'true');
    square.setAttribute('disabled', 'true');
    horizontal.setAttribute('disabled', 'true');
    json1.setAttribute('disabled', 'true');
    json2.setAttribute('disabled', 'true');
    puttingInf[0].innerHTML = "Loading...";
    puttingInf[1].innerHTML = "Loading...";
    // console.log(JSON1.width, JSON1.height)
    canvasElem.width = data.width;
    canvasElem.height = data.height;
    //we are loading childs here
    canvasLoadedElem = data.children;
    length = canvasLoadedElem.length;
    canvasContext.clearRect(0,0, canvasElem.width, canvasElem.height);
    startRendering();
}   

function somethingInteresting(W, H, o){
    //console.log("Upper Part===================", tempData);
    tempData = null;
    tempData = JSON.parse(JSON.stringify(JSON1));
    console.log("After Copying===================", tempData);
    let intialProjectSizeWidth = tempData.width;
    let intialProjectSizeHeight = tempData.height;

    let changeWidth = W;
    let changeHeight = H;

    tempData.children.forEach((item, index)=>{ 
        // console.log('ITEM============');
        // console.log(item);
        if(item.text){
            // console.log(item.text, o);
            // console.log(item.text === "ORDER FROM BALCONY CAFE", o === true);
            let oldFontSize = item.fontSize;
            let oldX = item.x;
            let oldY = item.y;
            let perX = oldX / intialProjectSizeWidth;
            let perY = oldY / intialProjectSizeHeight;
            item.x = changeWidth * perX;
            item.y = changeHeight * perY;
            let percentFont =  oldFontSize / intialProjectSizeWidth;
            let newFontSize = percentFont * changeWidth;
            item.fontSize = newFontSize;
            // console.log(item.text === "ORDER FROM BALCONY CAFE", o === true);
            // console.log(o === "true" && item.text === "ORDER FROM BALCONY CAFE");
            if(item.text === "ORDER FROM BALCONY CAFE"){
                // console.log("if run");
                item.y -= 20;
            }
            }else if(item.name === "Rectange"){
                let oldX = item.x;
                let oldY = item.y;
                let oldWidth = item.width;
                let oldHeight = item.height;
                let perX = oldX / intialProjectSizeWidth;
                let perY = oldY / intialProjectSizeHeight;
                let perWidth = oldWidth / intialProjectSizeWidth;
                let perHeight = oldHeight / intialProjectSizeHeight;
                item.x = changeWidth * perX;
                item.y = changeHeight * perY;
                item.width = changeWidth * perWidth;
                item.height = changeHeight * perHeight;
            }else{
                let oldX = item.x;
                let oldY = item.y;
                let oldWidth = item.width;
                let oldHeight = item.height;
                let perX = oldX / intialProjectSizeWidth
                let perY = oldY / intialProjectSizeHeight;
                let perWidth = oldWidth / intialProjectSizeWidth;
                let perHeight = oldHeight / intialProjectSizeHeight;
                item.x = changeWidth * perX;
                item.y = changeHeight * perY;
                item.width = changeWidth * perWidth;
                item.height = changeHeight * perHeight;
            }
    });
    tempData.width = changeWidth;
    tempData.height = changeHeight;
    console.log("==========JSON1============", JSON1);
    console.log("Before Going===================", tempData);
    renderCanvas(tempData);
}


var createFunction = function(pName) {
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
              JSON1 = JSON.parse(this.response);
            //   console.log(JSON1);
              renderCanvas();
            }
    }
    xhttp.open("GET", pName, true);
    xhttp.send();
}



createFunction('json/Template1.json');

square.addEventListener('click', (e)=>{
    somethingInteresting(1000, 1000);
});
vertical.addEventListener('click', (e)=>{
    somethingInteresting(300, 600);
});
horizontal.addEventListener('click', (e)=>{
    somethingInteresting(468, 200, true);
});

json1.addEventListener('click', (e)=>{ 
    e.preventDefault();
    createFunction('json/Template1.json');

});

json2.addEventListener('click', (e)=>{ 
    e.preventDefault();
    createFunction('json/Template2.json');

});

// json3.addEventListener('click', (e)=>{ 
//     e.preventDefault();
//     createFunction('json/Template3.json');

// });

json3.addEventListener('click', (e)=>{ 
    e.preventDefault();
    if(tempData){   
        var fileName = 'myData.json';

        // Create a blob of the data
        var fileToSave = new Blob([JSON.stringify(tempData)], {
            type: 'application/json',
            name: fileName
        });
        
        // Save the file
        saveAs(fileToSave, fileName);

    }else{
        var fileName = 'myData.json';

        // Create a blob of the data
        var fileToSave = new Blob([JSON.stringify(JSON1)], {
            type: 'application/json',
            name: fileName
        });

        // Save the file
        saveAs(fileToSave, fileName);
    }
});