const pages=[
["TERRITORIO","Villa Pelón despierta con una mañana de viento. Luna cruza el paisaje y algo en el suelo llama su atención.","El territorio despierta."],
["MISTERIO","Luna se agacha. Hay unas huellas que no recuerda haber visto antes. Las observa antes de decidir qué hacer.","Las huellas."],
["PISTA","Entre tierra y pequeñas piedras encuentra un objeto metálico viejo. Tiene una marca que parece un símbolo.","El objeto."],
["MEMORIA","Luna lleva el objeto al Abuelo. Él lo mira durante unos segundos antes de responder.","El Abuelo."],
["DUDA","—Me resulta conocido —dice el Abuelo—, pero no quiero inventarte una historia. Primero tenemos que mirar mejor.","La duda."],
["HISTORIA","El Abuelo recuerda algo ocurrido hace muchos años cerca de las bardas. Su recuerdo abre una pregunta, no una respuesta definitiva.","Una historia."],
["CAMINO","Luna decide seguir la pista. El camino hacia las bardas atraviesa un territorio que ahora mira de otra manera.","Hacia las bardas."],
["SEGUNDA PISTA","Una ráfaga levanta una hoja vieja. Luna la alcanza antes de que vuelva a perderse entre la tierra.","La hoja."],
["PREGUNTA","La hoja tiene una indicación breve. No explica el misterio: señala un lugar donde el viento cambia.","La frase."],
["COINCIDENCIA","Luna compara el dibujo de la hoja con las bardas que tiene delante. Algo coincide.","La coincidencia."],
["SÍMBOLO","En una pequeña abertura aparece nuevamente el mismo símbolo del objeto metálico.","El símbolo."],
["MAPA","Dentro encuentra un mapa sencillo. El río, las bardas y una marca forman una ruta que Luna intenta comprender.","El mapa."],
["DESCUBRIMIENTO","La ruta conduce hasta una caja de madera enterrada. Luna la encuentra después de seguir cuidadosamente la marca.","La caja."],
["PASADO","Dentro hay fotografías antiguas. El paisaje aparece en ellas, pero también personas y momentos que Luna no conocía.","Las fotografías."],
["COMPARAR","Luna mira una fotografía y luego levanta la vista. El lugar sigue allí. Algunas cosas cambiaron; otras permanecen.","El mismo lugar."],
["MEMORIA","Una anotación breve recuerda que los lugares también guardan historias en sus rastros, sus relatos y su memoria.","La memoria."],
["REGRESO","Luna vuelve con el Abuelo. Ya no lleva solamente un objeto: lleva preguntas, imágenes y una nueva forma de mirar.","El regreso."],
["COMPARTIR","Los dos observan las fotografías juntos. El Abuelo también descubre detalles que había olvidado.","Compartir."],
["REGISTRAR","Luna abre su cuaderno y comienza a dibujar. Esta vez no quiere olvidar lo que ella misma vio.","Registrar."],
["NUEVA MIRADA","Desde lejos, Villa Pelón parece la misma. Pero Luna sabe que un lugar puede esconder historias a plena vista.","Nueva mirada."]
];
let current=-1;
const $=s=>document.querySelector(s);
function render(){
 if(current<0){$("#cover").classList.remove("hidden");$("#reader").classList.add("hidden");$("#progressLabel").textContent="PORTADA";$("#progressBar").style.width="0%";return}
 $("#cover").classList.add("hidden");$("#reader").classList.remove("hidden");
 const [tag,text,title]=pages[current];
 $("#pageNumber").textContent=String(current+1).padStart(2,"0");
 $("#sceneTag").textContent=tag;
 $("#story").textContent=text;
 $("#caption").textContent=title;
 $("#artLabel").textContent=tag;
 $("#progressLabel").textContent=(current+1)+" / "+pages.length;
 $("#progressBar").style.width=((current+1)/pages.length*100)+"%";
 $("#prevBtn").disabled=current===0;
 $("#nextBtn").disabled=current===pages.length-1;
 location.hash="pagina-"+(current+1);
 window.scrollTo({top:0,behavior:"smooth"});
}
function start(){current=0;render()}
function next(){if(current<pages.length-1){current++;render()}}
function prev(){if(current>0){current--;render()}}
$("#startBtn").onclick=start;
$("#nextBtn").onclick=next;
$("#prevBtn").onclick=prev;
$("#firstBtn").onclick=()=>{current=0;render()};
$("#lastBtn").onclick=()=>{current=pages.length-1;render()};
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")prev();if(e.key==="Enter"&&current<0)start()});
let x=0;
document.addEventListener("touchstart",e=>x=e.changedTouches[0].clientX,{passive:true});
document.addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-x;if(Math.abs(d)>50)(d<0?next:prev)()},{passive:true});
const match=location.hash.match(/pagina-(\d+)/);
if(match)current=Math.max(0,Math.min(pages.length-1,+match[1]-1));
render();