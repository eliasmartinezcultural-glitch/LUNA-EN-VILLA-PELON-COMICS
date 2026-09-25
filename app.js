const pages=[
"Villa Pelón despertaba despacio. Luna miró el cielo y notó que el viento estaba haciendo algo extraño.",
"Entre la tierra y las bardas aparecieron unas huellas que Luna nunca había visto.",
"Algo brilló cerca del camino. Luna se agachó y encontró un pequeño objeto de metal.",
"Luna corrió a mostrarle el objeto al abuelo. Él lo observó en silencio.",
"—Esto me resulta conocido —dijo el abuelo—, pero hace falta averiguar qué significa.",
"El abuelo recordó una historia que había escuchado muchos años atrás.",
"Luna decidió seguir las pistas hasta las bardas.",
"Una ráfaga levantó una hoja vieja que estaba escondida entre las piedras.",
"Era una página de un cuaderno. Una frase hablaba de un lugar donde el viento cambiaba.",
"Luna levantó la mirada. La barda estaba justo allí.",
"Entre las piedras encontró una pequeña abertura con el mismo símbolo del objeto.",
"Dentro había un dibujo sencillo del río, las bardas y un punto marcado.",
"Siguiendo el dibujo, Luna encontró una pequeña caja de madera.",
"Adentro había fotografías antiguas del paisaje.",
"Luna reconoció algunos lugares, aunque parecían completamente diferentes.",
"Al dorso de una foto había una frase: los lugares también guardan memoria.",
"Luna volvió con el abuelo. Ya no buscaba un tesoro.",
"El abuelo miró las fotografías y sonrió. Algunas historias todavía estaban esperando ser contadas.",
"Luna abrió su cuaderno y comenzó a dibujar todo lo que había descubierto.",
"Desde allí, Villa Pelón parecía la misma de siempre. Pero Luna sabía que ahora podía mirarla de otra manera."
];
let current=0;
const text=document.querySelector("#text"),progress=document.querySelector("#progress"),pageNumber=document.querySelector("#pageNumber"),prev=document.querySelector("#prev"),next=document.querySelector("#next"),art=document.querySelector("#art");
function render(){text.textContent=pages[current];pageNumber.textContent=String(current+1).padStart(2,"0");progress.textContent=(current+1)+" / "+pages.length;prev.disabled=current===0;next.disabled=current===pages.length-1;art.setAttribute("aria-label","Ilustración de la página "+(current+1));}
function go(delta){current=Math.max(0,Math.min(pages.length-1,current+delta));render();}
prev.addEventListener("click",()=>go(-1));next.addEventListener("click",()=>go(1));
document.querySelector("#first").addEventListener("click",()=>{current=0;render()});
document.querySelector("#last").addEventListener("click",()=>{current=pages.length-1;render()});
document.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")go(-1);if(e.key==="ArrowRight")go(1)});
render();