// Variables globales
let ApiKey = "qDG7dj9PhfFnB8h92ep2uoEtZAqyRZgB";
let url = "https://api.giphy.com/v1/";
let Saves = {
    estadoActual: true
};
let arrayGuifos = [];
let loadedGifs = [];
if(localStorage.savedGifsArray)
{
    let loadSavedGifs = JSON.parse(localStorage.getItem("savedGifsArray"));
    printSavedGifs(loadSavedGifs);
    arrayGuifos = loadSavedGifs;
}
else
{
    let savedGifs = [];
    savedGifs = JSON.stringify(savedGifs);
    localStorage.setItem("savedGifsArray", savedGifs);
}

function loadData(){
    if(localStorage.Saves){
        let loadData = JSON.parse(localStorage.getItem("Saves"));
        Saves = loadData;
    }
}
loadData();
// DOM 
const botonBuscar = document.getElementById("botonBuscar");
const buscadorInput = document.getElementById("buscador-input");
const botonElegirTema = document.getElementById("boton-elegirTema");
const botonElegirTemaPress = document.getElementById("botonElegirTemaPress");
const contDropDown = document.getElementById("dropDown-Content");
const contSugg = document.getElementById("contBusquedasSug");
const botonMisGifOs = document.getElementById("boton-MisGifOS");
const misGifOs = document.getElementById("misGifOs");
const crearGifOs = document.getElementById("crearGifOs");
const botonCrearGifOs = document.getElementById("boton-crearGifOs");
const sectionSugerencias = document.getElementById("sugeridos");
const sectionTendencias = document.getElementById("tendencias");
const sectionBuscador = document.getElementById("buscador");
const sectionBusqueda = document.getElementById("resultados");
const divTags = document.getElementById("tags-guardados");
const arrow = document.getElementById("arrow");
// crear gifos
const contenedorGuifoSubido = document.getElementById("contenedorGuifoSubido");
const botonCopiarGuifoSubido = document.getElementById("botonCopiarGuifoSubido");
const botonDescargarGuifoSubido = document.getElementById("botonDescargarGuifoSubido");
const previewGuifo = document.getElementById("previewGuifo");
const contenedorSubiendoGuifo = document.getElementById("contenedorSubiendoGuifo");
const botonCancelarSubir = document.getElementById("cont-boton-cancelar-subir");
const subirGuifo = document.getElementById("subir-guifo");
// Tarjetas Trending
const sugerenciasCards = document.getElementById("sugerenciasCards");

// Eventos
// Logo 
const logoClick = document.getElementById("logoGo");
const logoClickAlt = document.getElementById("logoGo1");
logoClick.addEventListener('click', () => {
    window.open("../GifOS/", "_self");
});
logoClickAlt.addEventListener('click', () => {
    window.open("../GifOS/", "_self");
});
// Buscador
const contResultados = document.getElementById("contResultado");

botonBuscar.addEventListener("click", ()=>{
    let search = buscadorInput.value;
    if(search==""){
        return;
    }
    busquedas(search);
});


function busquedas(search){

    fetch(url + "gifs/search?api_key=" + ApiKey + "&q=" + search + "&limit=10&offset=0&rating=g&lang=en")
    .then(response => response.json())
    .then(resp => {
            console.log(resp);

                let data = resp.data;
                let contResGrid = document.getElementById("contResGrid");
                const resText = document.getElementById("resText");
                
                if(contResGrid.children.length != 0){ 
                    contResGrid.innerHTML = "";
                }
                resText.innerText = `${search} (resultados)`;

                for(let i = 0; i<10; i++){
        
                    let divCont = document.createElement("div");
                    divCont.setAttribute("class", "contTendencias");
        
                    let img = document.createElement("img");
                    img.setAttribute("src", data[i].images.original.url);
                    img.setAttribute("class", "imgTend");
                    img.setAttribute("style", "height: 300px;");
                    if(data[i].images.original.width / data[i].images.original.height > 1.3){
                        divCont.setAttribute("style", "grid-column: span 2;");
                    }
                    divCont.appendChild(img);
        
                    let p = document.createElement("p");
                    if(data[i].tags){
                        for(let tag of data[i].tags){
                            p.innerText += " #" + tag;
                        }
                    }else{
                        p.innerText = "No tags Found";
                    }
                    p.setAttribute("class", "pTendencias");
                    let divP = document.createElement("div");
                    divP.setAttribute("class", "divPTend");
                    divP.appendChild(p);
                    divCont.appendChild(divP);
        
                    contResGrid.appendChild(divCont);
            }
            })
            .then(() => {
                const tendenciasSect = document.getElementById("tendencias");
                const resultadosSect = document.getElementById("resultados");
                const sugeridosSect = document.getElementById("sugeridos");

                tendenciasSect.style.display = "none";
                sugeridosSect.style.display = "none"; 
                resultadosSect.style.display = "flex";
                contSugg.style.display = "none";
            })
            clickableLinkSearch(search);

}


function clickableLinkSearch(search){
    fetch(url + "tags/related/" + search + "?api_key=" + ApiKey)
    .then(resultados => resultados.json())
    .then(resultados => {

        let contenedorTags = document.getElementById("tags-guardados");

        contenedorTags.innerHTML = "";

        for(let resultado of resultados.data){
            let divCont = document.createElement('div');
            divCont.setAttribute("class", "tag-indiv");
            let parr = document.createElement('p');
            parr.innerText = `#${resultado.name}`;
            divCont.appendChild(parr);
            divCont.addEventListener("click", () => {
                buscadorInput.value = resultado.name
                busquedas(resultado.name);
            });
            
            contenedorTags.appendChild(divCont);
        }
    })
}


let elegirTemaClick = true;
botonElegirTemaPress.addEventListener('click', ()=>{
    if(elegirTemaClick){
        contDropDown.style.display = "inline";
        botonElegirTema.style.top = "3.2rem";
        elegirTemaClick = false;
    }else{
        contDropDown.style.display = "none";
        botonElegirTema.style.top = "0";
        elegirTemaClick = true;
    }
})


function createRandom(){
    for(let i = 0; i<4; i++){
        let busca = ["Cats", "Dogs", "Game of thrones", "It Crowd"];

        fetch("https://api.giphy.com/v1/gifs/search?api_key=qDG7dj9PhfFnB8h92ep2uoEtZAqyRZgB&q=" + busca[i] + "&limit=1&offset=0&rating=g&lang=en")
        .then(response => response.json())
        .then(function(resp){
        let array = resp.data[0];

        let divCont = document.createElement("div");
        divCont.setAttribute("class","card");

        let divBarraTitulo = document.createElement("div");
        divBarraTitulo.setAttribute("class","barraTitulo");

        let p = document.createElement("p");
        p.innerText = "#" + busca[i];
        p.id = "tituloCard";
        divBarraTitulo.appendChild(p);
        
        let iframe = document.createElement("iframe");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("src", "./assets/close.svg");
        divBarraTitulo.appendChild(iframe);
        divCont.appendChild(divBarraTitulo);
        

        let img = document.createElement("img");
        img.setAttribute("src", array.images.downsized_medium.url);
        divCont.appendChild(img);
        
        let divVerMas = document.createElement("div");
        divVerMas.addEventListener('click',()=>{
            switch(busca[i]){
                case "Cats":
                    window.open("https://giphy.com/search/cats", "_blank");
                break;
                case "Dogs":
                    window.open("https://giphy.com/search/dogs", "_blank");
                break;
                case "Game of thrones":
                    window.open("https://giphy.com/search/game-of-thrones", "_blank");
                break;
                case "It Crowd":
                    window.open("https://giphy.com/search/It-crowd", "_blank");
                break;
            }
            
        });

        divVerMas.id = "verMas";
        divVerMas.setAttribute("class","verMas");

        let pVerMas = document.createElement("p");
        pVerMas.innerText = "Ver mas...";
        divVerMas.appendChild(pVerMas);
        divCont.appendChild(divVerMas);
        
        sugerenciasCards.appendChild(divCont);
        })
    }
}
createRandom();

function tendenciasGifs(){
    fetch("https://api.giphy.com/v1/gifs/trending?api_key=qDG7dj9PhfFnB8h92ep2uoEtZAqyRZgB&limit=25&rating=g")
    .then(resp => resp.json())
    .then(function(resp){
        let data = resp.data;
        let contTendGrid = document.getElementById("contTendGrid");
        for(let i = 0; i<25; i++){

            let divCont = document.createElement("div");
            divCont.addEventListener('click', () => {
                window.open(`${data[i].url}`, "_blank");
            });
            divCont.setAttribute("class", "contTendencias");

            let img = document.createElement("img");
            img.setAttribute("src", data[i].images.original.url);
            img.setAttribute("class", "imgTend");
            img.setAttribute("style", "height: 300px;");
            if(data[i].images.original.width / data[i].images.original.height > 1.3){
                divCont.setAttribute("style", "grid-column: span 2;");
            }
            divCont.appendChild(img);

            let p = document.createElement("p");
            if(data[i].tags){
                for(let tag of data[i].tags){
                    p.innerText += " #" + tag;
                }
            }else{
                p.innerText = "No tags Found";
            }
            //p.style.display = "none";
            p.setAttribute("class", "pTendencias");
            let divP = document.createElement("div");
            divP.setAttribute("class", "divPTend");
            divP.appendChild(p);
            divCont.appendChild(divP);

            contTendGrid.appendChild(divCont);

        }
    })
}
tendenciasGifs();

function suggest(){
    const sugUno = document.getElementById("sugUno");
    const sugDos = document.getElementById("sugDos");
    const sugTres = document.getElementById("sugTres");
    sugUno.addEventListener('click', () => {
        buscadorInput.value = sugUno.innerText;
    });
    
    sugDos.addEventListener('click', () => {
        buscadorInput.value = sugDos.innerText;
    });
    
    sugTres.addEventListener('click', () => {
        buscadorInput.value = sugTres.innerText;
    });
    
    buscadorInput.addEventListener("keydown", () => {

        
        if(buscadorInput.value){
            fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${ApiKey}&q=${buscadorInput.value}`)
            .then(response => response.json())
            .then(response => {
                sugUno.innerText = response.data[0].name
                sugDos.innerText = response.data[1].name
                sugTres.innerText = response.data[2].name
                contSugg.style.display = "block";
            })
        }

    })
    buscadorInput.addEventListener("focusout", () => {
        if(buscadorInput.value.length <= 0){
            contSugg.style.display = "none";
        }
    })
}
suggest();

// DOM crearGifOs
const textoContenedor = document.getElementById("contenedor-imgText");
const crearGifOsTexto = document.getElementById("crearGifOs-texto");
const pantallaGifOs = document.getElementById("pantalla-CrearGifOs");
const contBotones = document.getElementById("cont-botones-CrearGifOs");
const button3 = document.getElementById("button3CrearGifOs");
const videoGifOs = document.getElementById("contenedor-videoGifOs");
const botonesVideoGifOs = document.getElementById("cont-botones-videoGifOs");
const botonCaptura = document.getElementById("boton-capturar");
const botonCancelarCrearGifOs = document.getElementById("boton-cancelar-CrearGifOs");

// Boton de Mis GifOs

botonMisGifOs.addEventListener('click', () => {
    misGifOs.style.display = "flex";
    crearGifOs.style.display = "none";
    sectionSugerencias.style.display = "none";
    sectionTendencias.style.display = "none";
    sectionBusqueda.style.display = "none";
    arrow.style.display = "none";
    sectionBuscador.style.display = "none";
    divTags.style.display = "none";
    reinicioCrearGifs();
});

// Boton Cancelar GifOs
botonCancelarCrearGifOs.addEventListener('click', () => {
    reinicioCrearGifs();
    crearGifOs.style.display = "none";
});

// Boton de crear GifOs
botonCrearGifOs.addEventListener('click', () => {
    crearGifOs.style.display = "flex";
    misGifOs.style.display = "flex";
    arrow.style.display = "inline";
    sectionSugerencias.style.display = "none";
    sectionTendencias.style.display = "none";
    sectionBusqueda.style.display = "none";
    sectionBuscador.style.display = "none";
    divTags.style.display = "none";   
    reinicioCrearGifs();
});

// Boton de volver
arrow.addEventListener('click', () => {
    window.open("../GifOS/", "_self");
});
function reinicioCrearGifs(){
        // reinicia creador de gifs
        textoContenedor.style.display = "flex";
        crearGifOsTexto.innerText = "Crear Guifos";
        pantallaGifOs.style.width = "684px";
        pantallaGifOs.style.height = "386px";
        contBotones.style.display = "flex";
        button3.style.display = "none";
        videoGifOs.style.display = "none";
        videoGifOs.style.width = "0px";
        videoGifOs.style.height = "0px";
        botonesVideoGifOs.style.display = "none";
        contenedorGuifoSubido.style.display = "none";
        contenedorSubiendoGuifo.style.display = "none";
        botonCancelarSubir.style.display = "none";
}
// Funcionamiento del creador de gifs
const comenzarBoton = document.getElementById("boton-comenzar-CrearGifOs");
comenzarBoton.addEventListener("click", () => {
    // darle forma a la ventana nueva
    textoContenedor.style.display = "none";
    crearGifOsTexto.innerText = "Un Chequeo Antes de Empezar";
    pantallaGifOs.style.width = "860px";
    pantallaGifOs.style.height = "548px";
    contBotones.style.display = "none";
    button3.style.display = "block";
    videoGifOs.style.display = "flex";
    videoGifOs.style.width = "832px";
    videoGifOs.style.height = "434px";
    botonesVideoGifOs.style.display = "flex";
    botonCaptura.style.display = "flex";
});

// Button 3 cerrar ventana
button3.addEventListener("click", () => {
    reinicioCrearGifs();
    crearGifOs.style.display = "none";
});

// Parte video 

comenzarBoton.addEventListener("click", getStreamAndRecord());
const video = document.getElementById("videoGifTag"); 

let tracks = '';
function getStreamAndRecord () { 
    navigator.mediaDevices.getUserMedia({ 
        audio: false, 
        video: { 
            height: { max: 480 } 
        }  
    }) 
    .then(function(stream) { 
        video.srcObject = stream;
        tracks = stream.getTracks();
        video.play()
    });
}



// Cambio de temas
const botonSailorDay = document.getElementById("sailorDay");
const botonSailorNight = document.getElementById("sailorNight");
const linkCss = document.getElementById("linkCss");


function estadoTema(){
    if(!Saves.estadoActual){
        linkCss.setAttribute("href", "styles/dark.css"); 
    }
}
estadoTema();



botonSailorDay.addEventListener("click", () => {
    linkCss.setAttribute("href", "styles/light.css");
    Saves.estadoActual = true;
    let saveData = JSON.stringify(Saves);
    localStorage.setItem("Saves", saveData);
    contDropDown.style.display = "none";
    botonElegirTema.style.top = "0";
    elegirTemaClick = true;
});
botonSailorNight.addEventListener("click", () => {
    linkCss.setAttribute("href", "styles/dark.css");
    Saves.estadoActual = false;
    let saveData = JSON.stringify(Saves);
    localStorage.setItem("Saves", saveData);
    contDropDown.style.display = "none";
    botonElegirTema.style.top = "0";
    elegirTemaClick = true;
});



let gifPreview = document.getElementById("gifPreview");
let botonDetener = document.getElementById("boton-detener");
let timer = document.getElementById('numeros-vistaP');
let contVistaPrevia = document.getElementById("cont-botones-vistaP");
let botonPlayVistaPrevia = document.getElementById("boton-play-vistaP");
let contBotonesVistaPrevia = document.getElementById("cont-botones-vistaP");
let contRepetirSubir = document.getElementById("cont-repetir-subir");
let repetirCaptura = document.getElementById("repetir-captura");
let barraCarga = document.getElementById("barraCarga");

botonCaptura.addEventListener('click', () => {
    startCapturing(false)
});
botonCaptura.addEventListener('click', timerStart);
repetirCaptura.addEventListener('click', () => {
    startCapturing(true)
});
repetirCaptura.addEventListener('click', timerStart);
let clicksPlay = 0;
botonPlayVistaPrevia.addEventListener('click', () => {
    if(gifPreview.duration == gifPreview.currentTime||clicksPlay == 0)
    {
        gifPreview.play();
        clicksPlay = 1;
    }
    else
    {
        gifPreview.pause();
        clicksPlay = 0;
    }
})
// Barra progreso
let arrayProgreso = document.getElementsByClassName("barraCargaProgreso");

function actualizarBarraProgreso(video)
{
    let videoCurrentTime = video.currentTime;
    let videoDuration = video.duration;
    let porcentajeVideo = (videoCurrentTime/videoDuration)*100;

    if(porcentajeVideo<6)
    {
       paintIt(0, arrayProgreso); 
    }else if(porcentajeVideo>6&&porcentajeVideo<12)
    {
        paintIt(1, arrayProgreso);
    }else if(porcentajeVideo>12&&porcentajeVideo<18)
    {
        paintIt(2, arrayProgreso);
    }else if(porcentajeVideo>18&&porcentajeVideo<24)
    {
        paintIt(3, arrayProgreso);
    }else if(porcentajeVideo>24&&porcentajeVideo<30)
    {
        paintIt(4, arrayProgreso);
    }else if(porcentajeVideo>30&&porcentajeVideo<36)
    {
        paintIt(5, arrayProgreso);
    }else if(porcentajeVideo>36&&porcentajeVideo<42)
    {
        paintIt(6, arrayProgreso);
    }else if(porcentajeVideo>42&&porcentajeVideo<48)
    {
        paintIt(7, arrayProgreso);
    }else if(porcentajeVideo>48&&porcentajeVideo<54)
    {
        paintIt(8, arrayProgreso);
    }else if(porcentajeVideo>54&&porcentajeVideo<60)
    {
        paintIt(9, arrayProgreso);
    }else if(porcentajeVideo>60&&porcentajeVideo<66)
    {
        paintIt(10, arrayProgreso);
    }else if(porcentajeVideo>66&&porcentajeVideo<72)
    {
        paintIt(11, arrayProgreso);
    }else if(porcentajeVideo>72&&porcentajeVideo<78)
    {
        paintIt(12, arrayProgreso);
    }else if(porcentajeVideo>78&&porcentajeVideo<84)
    {
        paintIt(13, arrayProgreso);
    }else if(porcentajeVideo>84&&porcentajeVideo<90)
    {
        paintIt(14, arrayProgreso);
    }else if(porcentajeVideo>90&&porcentajeVideo<96)
    {
        paintIt(15, arrayProgreso);
    }else if(porcentajeVideo>96&&porcentajeVideo<102)
    {
        paintIt(16, arrayProgreso);
    }
}

function paintIt(value, array)
{
    for(let i = 0; i<=array.length-1; i++)
    {
        array[i].style.background = "#999999";
    }
    for(let i = 0; i<=value; i++)
    {
        if(Saves.estadoActual)
        {
            array[i].style.background = "#F7C9F3";
        }
        else{
            array[i].style.background = "#EE3EFE";
        }
    }
}


// Funciones al grabar video

// Timer
function timerStart()
{
    let firstDate = new Date();
    let intervalTimes = setInterval(() => {
        let secondDate = new Date();
        let realHour = {
            hour: ("0" + Math.abs(firstDate.getHours() - secondDate.getHours())).slice(-2),
            minutes: ("0" + Math.abs(firstDate.getMinutes() - secondDate.getMinutes())).slice(-2) ,
            seconds: ("0" + Math.abs(firstDate.getSeconds() - secondDate.getSeconds())).slice(-2),
            miliseconds: ("0" + Math.abs(firstDate.getMilliseconds() - secondDate.getMilliseconds())).slice(-2)
        }
        timer.innerText = `${realHour.hour}:${realHour.minutes}:${realHour.seconds}:${realHour.miliseconds}`
    }, 10);
    botonDetener.addEventListener('click', () => {
        clearInterval(intervalTimes);
    });
}
// Variables fuera de scope
let blobGif;
// Capturar
async function startCapturing(isRepeating)
{
    // Esconder barras 
    if(isRepeating)
    {
        video.style.display = "inline";
        gifPreview.style.display = "none";
        botonPlayVistaPrevia.style.display = "none";
        contBotonesVistaPrevia.style.display = "none";
        contRepetirSubir.style.display = "none";
        barraCarga.style.display = "none";
        blobGif = '';
        blob = '';
        url = '';
    }
    crearGifOsTexto.innerText = "Capturando Tu Guifo";
    botonCaptura.style.display = "none";
    botonDetener.style.display = "flex";
    contVistaPrevia.style.display = "flex";
    let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    let gifRecorder = new RecordRTCPromisesHandler(stream, {
        type: 'gif',
        frameRate: 200, 
        quality: 10
    });
    let vidRecorder = new RecordRTCPromisesHandler(stream, {
        type: 'video',
        mimeType: "video/webm"
    });
    gifRecorder.startRecording();
    vidRecorder.startRecording();
    let timeOutRecord = setTimeout(() => {
        stopRecordingFunct();
    }, 1000 * 15);
            
    botonDetener.addEventListener("click", stopRecordingFunct); 
    botonDetener.addEventListener("click", () => {
        clearTimeout(timeOutRecord);
    }) 
    
    async function stopRecordingFunct()
    {
        await gifRecorder.stopRecording();
        await vidRecorder.stopRecording();
        blobGif = await gifRecorder.getBlob();
        let blob = await vidRecorder.getBlob();
        let url = await URL.createObjectURL(blob);
        gifPreview.src = url;
        crearGifOsTexto.innerText = "Vista Previa";
        video.style.display = "none";
        gifPreview.style.display = "inline";
        botonDetener.style.display = "none";
        botonPlayVistaPrevia.style.display = "flex";
        contBotonesVistaPrevia.style.display = "flex";
        contRepetirSubir.style.display = "flex";
        barraCarga.style.display = "flex";
        // Check de progress bar
        gifPreview.play();
        setInterval(() => {
            actualizarBarraProgreso(gifPreview);
        }, 200);
        
    }
}
subirGuifo.addEventListener('click', () => {
    let form = new FormData();
    form.append("file", blobGif, "myGif.gif");
    barraDeCargaSubir();
    contBotonesVistaPrevia.style.display = 'none';
    gifPreview.style.display = "none";
    contenedorSubiendoGuifo.style.display = "flex";
    botonCancelarSubir.style.display = "flex";
    crearGifOsTexto.innerText = "Subiendo Guifo";
    uploadGif(form);
});



// Subir GifOs
async function uploadGif(gifCont)
{
    try{
        tracks[0].stop();
        fetch(`https://upload.giphy.com/v1/gifs?api_key=${ApiKey}`, 
        {
            method: 'POST',
            body: gifCont
        })
        .then(res => res.json())
        .then(res => {
            if(res.meta.status == 200)
            {
                saveGifo(res.data.id);
                fetch(`https://api.giphy.com/v1/gifs/${res.data.id}?api_key=${ApiKey}`)
                .then(res => res.json())
                .then(res => {
                    // Imagen
                    previewGuifo.src = res.data.images.downsized_large.url;
                    // Url para copiar
                    botonCopiarGuifoSubido.addEventListener('click', () => {
                        copiarElemento(res.data.id);
                    });
                    // Descargar Guifo
                    botonDescargarGuifoSubido.addEventListener('click', () => {
                        downloadGuifo(res.data.id)
                    });
                    pantallaGifOs.style.height = "391px";
                    pantallaGifOs.style.width = "721px";
                    videoGifOs.style.display = "none";
                    botonesVideoGifOs.style.display = "none";
                    contenedorGuifoSubido.style.display = "flex";
                    crearGifOsTexto.innerText = "Guifo Subido Con Éxito";
                })
            }
            else{
                console.log("There was an error submiting the gif");
            }
        });
    }
    catch (err) {
        console.log("Theres an error", err);
    }
}




// Barra de carga subiendo Guifo


// Functions
// Copiar elemento
function copiarElemento(id)
{
    const elemento = document.createElement("textarea");
    elemento.value = `https://media.giphy.com/media/${id}/giphy.gif`;
    elemento.setAttribute("readonly", "");
    elemento.style.position = 'absolute';
    elemento.style.left = "-9999px";
    document.body.appendChild(elemento);
    elemento.select();
    document.execCommand("copy");
    console.log("copied");
    document.body.removeChild(elemento);
}

async function downloadGuifo(id)
{
    const downloadUrl = fetch(`https://media.giphy.com/media/${id}/giphy.gif`);
    const fetchUrl = (await downloadUrl).blob();
    const urlGif = URL.createObjectURL(await fetchUrl);
    const gifSave = document.createElement("a");
    gifSave.href = urlGif;
    gifSave.download = "new-guifo.gif";
    gifSave.style.display = "none";
    document.body.appendChild(gifSave);
    gifSave.click();
    document.body.removeChild(gifSave);
}


// Guardar en localHost los gifOS
function saveGifo(gif)
{
    loadedGifs = JSON.parse(localStorage.getItem("savedGifsArray"));
    loadedGifs.push(gif);
    let savedGifs = JSON.stringify(loadedGifs);
    printSavedGifs(loadedGifs);
    localStorage.setItem("savedGifsArray", savedGifs);
}


// Print Saved Gifs
async function printSavedGifs(array)
{
    contenedorMisGuifos.innerHTML = '';
    for(let i of array)
    {
        fetch(`https://api.giphy.com/v1/gifs/${i}?api_key=${ApiKey}`)
        .then(res => res.json())
        .then(res => {
            let div = document.createElement("div");
            let gif = document.createElement("img");
            gif.src = res.data.images.original.url;
            div.appendChild(gif);
            let contenedorMisGuifos = document.getElementById("contenedor-misGifOs");
            contenedorMisGuifos.appendChild(div);
        });
    }
}

function barraDeCargaSubir()
{
    let barraCargaSubirGuifo = document.getElementsByClassName("barraCargaSubirGuifo");

    let value = 0;
    // 21 valor maximo
    setInterval(() => {
        if(value > 21)
        {
            value=0;
        }
        paintIt(value, barraCargaSubirGuifo);
        value++;
    }, 200);
}

// Boton Listo en pantalla de guifo subido
const botonListoGuifoSubido = document.getElementById("botonListoGuifoSubido");
botonListoGuifoSubido.addEventListener('click', () => {
    reinicioCrearGifs();
    crearGifOs.style.display = "none";
});
