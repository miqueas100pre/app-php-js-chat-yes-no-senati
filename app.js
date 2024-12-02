const apiUrl = "http://localhost/app-php-js-chat-yes-no-senati/api.php";
const wtfUrl = "https://yesno.wtf/api";

async function getData(){
    console.log('ingreso a get data');
    try {
        const respuesta = await fetch(
            `${apiUrl}?id=123&nombre=Miqueas&apellidos=Vilcatoma`,{
            method: "GET"
        });
        const data = await respuesta.json();
        console.log('data');
        console.log(data);
    } catch (error) {
        console.log("error al momento de hacer la petición GET:", error);
    }
}

let botonGet = document.querySelector('#getdata');
botonGet.addEventListener('click', function() {
    getData();
});

async function postData(){
    //alert('Ingreso Aqui!');
    try {
        const respuesta= await fetch(apiUrl ,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                nombre:"Miqueas",
                apellido:"Vilcatoma",
                lenguaje_favorito:"Ninguno",
                color:"Verde"
            })
        } );
        const data_retorno = await respuesta.json();
        console.log(data_retorno);
          
    } catch (error) {
        console.log("error al momento de hacer la petición POST:", error); 
    }

}

let botonPost = document.querySelector('#post-data');
botonPost.addEventListener('click',function(){
    postData();
});

async function getWTF() {
    try {
        const response = await fetch(wtfUrl, 
        {
            method: "GET"
        });
        const data = await response.json();
        //console.log(data.image);
        console.log(data);
        // agregarMensaje(data.answer,data.answer=='no'?true:false);
        agregarMensaje(data.answer,false,data.image);

    } catch (error) {
        console.log("Error WTF:", error);
    }
}

let botonYesNo = document.querySelector('#getwtf');
botonYesNo.addEventListener('click', function() {
    getWTF();
});

async function putData() {
    try {
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: "Miqueas",
                apellido: "Vilcatoma",
                lenguaje_favorito: "JavaScript",
                color: "Azul"
            })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error al momento de hacer la petición PUT:", error);
    }
}

let botonPut = document.querySelector('#put-data');
botonPut.addEventListener('click', function() {
    putData();
});

async function deleteData() {
    try {
        const response = await fetch(apiUrl, {
            method: "DELETE"
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error al momento de hacer la petición DELETE:", error);
    }
}

let botonDelete = document.querySelector('#delete-data');
botonDelete.addEventListener('click', function() {
    deleteData();
});

//Funcionalidad Si No
let chatMessages = document.getElementById("chatMessages");
let chatForm = document.getElementById("chatForm");
let messageInput = document.getElementById("messageInput");

function agregarMensaje(mensaje, soYo = true, imagen = null) {
    const mesajeDiv = document.createElement('div');
    mesajeDiv.classList.add('message');
    mesajeDiv.classList.add(soYo?'user-message':'api-message');
    mesajeDiv.textContent = mensaje;

    if(imagen) {
        const img = document.createElement('img');
        img.src = imagen;
        mesajeDiv.appendChild(img);
    }

    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight                
    }, 500);
    // setTimeout(() => {
    //     mensaje.remove(); 
    // }, 500);

    chatMessages.appendChild(mesajeDiv);
}
agregarMensaje("Hola Soy Mike", true);
agregarMensaje("Hola Soy Robobalquer", false);

chatForm.addEventListener('submit',function(e){
    //Evitar que actualize la pagina
    e.preventDefault();
    const miMensaje = messageInput.value;
    agregarMensaje(miMensaje,true);
    messageInput.value = "";
    getWTF();
});
