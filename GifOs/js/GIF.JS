let GHYPY_KEY = "359rnbrpgIqGaLtmVxEVDl4IldgfqiAF";

document.addEventListener("DOMContentLoaded",init);


function init(){

    document.getElementById('capture').addEventListener('click', () => { 
        let constraintObj = { 
        audio: false, 
        video: { 
            facingMode: "user", 
            width: { min: 100, ideal: 360, max: 1920 },
            height: { min: 100, ideal: 240, max: 1080 } 
        } 
    }; 

    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
        navigator.mediaDevices.getUserMedia = function(constraintObj) {
            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraintObj, resolve, reject);
            });
        }
    }else{
        navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            devices.forEach(device=>{
                console.log(device.kind.toUpperCase(), device.label);
                //, device.deviceId
            })
        })
        .catch(err=>{
            console.log(err.name, err.message);
        })
    }
    navigator.mediaDevices.getUserMedia(constraintObj)
    .then(function(stream) {


        let gifElem = document.getElementById('gifSave');

        let videoStream = document.querySelector("video");
        videoStream.srcObject = stream;

        videoStream.onloadedmetadata = function(ev) {
            videoStream.play();
            gifElem.style.display = 'none';
            vidCamera.style.display = 'block';
            subir.style.display = 'none';
            guardar.style.display = 'none';

        }
        
        let capture = document.getElementById('capture');
        capture.style.display = 'none';
        gifElem.style.display = 'block';

        let subir = document.querySelector('#subir');
        let vidCamera = document.querySelector('.c1 video');
        let start = document.getElementById('startBtn');
        start.style.display = "block";
        let stop = document.getElementById('stopBtn');
        let gifSave = document.getElementById('gifSave');
        let guardar = document.getElementById('guardar');


        let mediaRecorder = new GifRecorder(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            })

    start.addEventListener('click', ()=> {
        mediaRecorder.record();
        start.style.display = "none";
        stop.style.display = "block";
    })

    stop.addEventListener('click', ()=>{

        gifSave.style.display = "block";
        vidCamera.style.display = 'none';
        stop.style.display = "none";
        capture.style.display = 'block';
        subir.style.display = "block";
        guardar.style.display = "block";

    
        mediaRecorder.stop( (blob)=> {


            gifSave.src = URL.createObjectURL(blob);

            subir.addEventListener('click', () =>{

                let form = new FormData();
                
                let stringGIF = JSON.stringify(form.append('gif',blob,'myGif.gif'));

               // console.log(form.get('file'));
            })

            guardar.addEventListener('click', () => {

                //let form = new FormData();
                
                //form.append('gif',blob,'myGif.gif');

                //let localGIF = form.get('gif');

                localStorage.setItem('myGif', JSON.stringify(URL.createObjectURL(blob)));

            })

        
        

        });
        
    })
    })

    .catch(function(err) {
        console.log(err.name, err.message); 
        });
    }
    )


    //------------------------THEMES----------------------------//

    let modoBut = document.getElementById('modoBut');
    let root = document.documentElement;
    let logo = document.getElementById('logo');
    let logoDark = document.getElementById('logoDark');
    var flag = false;


    modoBut.addEventListener('click', () => {

        if(flag == false){
        root.style.setProperty('--backgr','var(--backgrDark)');
        root.style.setProperty('--gradient','var(--gradientDark)');
        root.style.setProperty('--button','var(--buttonDark)');
        root.style.setProperty('--fontOne','var(--fontOneDark)');
        root.style.setProperty('--fontTwo','var(--fontTwoDark)');
       
        root.style.setProperty('--modoBut','var(--buttonCute)');
        root.style.setProperty('--modoFont','var(--fontOneCute)');
        
        logo.style.display = 'none';
        logoDark.style.display = 'block';

        modoBut.innerHTML= "Modo LIGHT";

        flag = true;
    }else{

        root.style.setProperty('--backgr','var(--backgrCute)');
        root.style.setProperty('--gradient','var(--gradientCute)');
        root.style.setProperty('--button','var(--buttonCute)');
        root.style.setProperty('--fontOne','var(--fontOneCute)');
        root.style.setProperty('--fontTwo','var(--fontTwoCute)');
       
        root.style.setProperty('--modoBut','var(--buttonDark)');
        root.style.setProperty('--modoFont','var(--fontOneDark)');
        
        logo.style.display = 'block';
        logoDark.style.display = 'none';

        modoBut.innerHTML= "Modo DARK";

        flag = false;
    }
        })

    
    }