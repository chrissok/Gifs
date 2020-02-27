let GHYPY_KEY = "359rnbrpgIqGaLtmVxEVDl4IldgfqiAF";

document.addEventListener("DOMContentLoaded",init);

function init(){
    
    document.getElementById('searchButton').addEventListener('click',searchGif);
    document.getElementById('searchText').addEventListener('keyup', ev =>{
        if(ev.keyCode == 13){
            ev.preventDefault();
            searchGif();
        }
    }
    );
    
    function searchGif() {
        
        let GHYPY_KEY = "359rnbrpgIqGaLtmVxEVDl4IldgfqiAF";
        let url = `http://api.giphy.com/v1/gifs/search?api_key=${GHYPY_KEY}&limit=16&q=`;
        let str = document.getElementById('searchText').value.trim();
        url = url.concat(str);

        let grid = document.getElementById('gridBusq');
        grid.style.height = '500px';
        grid.style.overflowY = 'scroll';

        console.log(grid);

        fetch(url)
        .then(response => response.json())
        .then(content => {
            console.log(content.data);

            var container = document.querySelector('.gifGrid');
            var h1 = document.querySelector('.h')

            container.innerHTML = '';

           for (let i = 0; i < content.data.length; i++) {
               
            var img = document.createElement("img");
            img.src = `${content.data[i].images.downsized_medium.url}`;
        
            container.insertAdjacentElement('afterbegin', img);   
            
            document.getElementById('searchText').value = '';

           }
        })
        .catch(err=>{
            console.error(err);
    })
}

            let urlTr = `http://api.giphy.com/v1/gifs/trending?api_key=${GHYPY_KEY}&limit=4`;
                
            fetch(urlTr)
            .then(response => response.json())
            .then(content => {
                console.log(content.data);

                var containTr = document.querySelector('.trending');
                var g1 = document.querySelector('.g')

            for (let i = 0; i < content.data.length; i++) {
                
                var imgTr = document.createElement("img");
                imgTr.src = `${content.data[i].images.original.url}`;

                containTr.insertBefore(imgTr, g1);         
            }
            })
            .catch(err=>{
                console.error(err);
            });


    
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





