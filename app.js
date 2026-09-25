const pages=[
{scene:"Villa Pelón despertaba despacio. Luna miró el cielo y notó que el viento estaba haciendo algo extraño.",visual:"Villa Pelón al amanecer; Luna observa el cielo y el paisaje desde un camino."},
{scene:"Entre la tierra y las bardas aparecieron unas huellas que Luna nunca había visto.",visual:"Luna agachada frente a huellas recientes entre tierra y barda."},
{scene:"Algo brilló cerca del camino. Luna se agachó y encontró un pequeño objeto de metal.",visual:"Primer plano de la mano de Luna encontrando un pequeño objeto metálico."},
{scene:"Luna corrió a mostrarle el objeto al abuelo. Él lo observó en silencio.",visual:"Luna y su abuelo mirando juntos el objeto en una casa de Villa Pelón."},
{scene:"—Esto me resulta conocido —dijo el abuelo—, pero hace falta averiguar qué significa.",visual:"Abuelo pensativo con el objeto; Luna escucha con atención."},
{scene:"El abuelo recordó una historia que había escuchado muchos años atrás.",visual:"El abuelo contando una historia mientras Luna imagina el paisaje del pasado."},
{scene:"Luna decidió seguir las pistas hasta las bardas.",visual:"Luna caminando decidida hacia las bardas, con el viento levantando polvo."},
{scene:"Una ráfaga levantó una hoja vieja que estaba escondida entre las piedras.",visual:"Una hoja antigua sale de entre piedras impulsada por el viento."},
{scene:"Era una página de un cuaderno. Una frase hablaba de un lugar donde el viento cambiaba.",visual:"Luna sostiene una página antigua y descubre una frase escrita."},
{scene:"Luna levantó la mirada. La barda estaba justo allí.",visual:"Luna compara el dibujo de la página con la barda frente a ella."},
{scene:"Entre las piedras encontró una pequeña abertura con el mismo símbolo del objeto.",visual:"Abertura entre piedras con el mismo símbolo; Luna ilumina el interior."},
{scene:"Dentro había un dibujo sencillo del río, las bardas y un punto marcado.",visual:"Mapa dibujado a mano con río, bardas y un punto señalado."},
{scene:"Siguiendo el dibujo, Luna encontró una pequeña caja de madera.",visual:"Luna descubre una pequeña caja de madera semi enterrada."},
{scene:"Adentro había fotografías antiguas del paisaje.",visual:"Fotografías antiguas desplegadas sobre las manos de Luna."},
{scene:"Luna reconoció algunos lugares, aunque parecían completamente diferentes.",visual:"Luna compara una fotografía antigua con el paisaje actual."},
{scene:"Al dorso de una foto había una frase: los lugares también guardan memoria.",visual:"Reverso de una fotografía con una frase manuscrita."},
{scene:"Luna volvió con el abuelo. Ya no buscaba un tesoro.",visual:"Luna regresa con las fotografías; su expresión muestra que comprendió la pista."},
{scene:"El abuelo miró las fotografías y sonrió. Algunas historias todavía estaban esperando ser contadas.",visual:"Abuelo y Luna contemplan las fotografías juntos."},
{scene:"Luna abrió su cuaderno y comenzó a dibujar todo lo que había descubierto.",visual:"Luna dibuja en su cuaderno mientras organiza las fotografías y pistas."},
{scene:"Desde allí, Villa Pelón parecía la misma de siempre. Pero Luna sabía que ahora podía mirarla de otra manera.",visual:"Plano amplio de Villa Pelón; Luna pequeña en primer plano mirando el territorio."}
];

let current=-1;
const text=document.querySelector("#text"),progress=document.querySelector("#progress"),pageNumber=document.querySelector("#pageNumber");
const prev=document.querySelector("#prev"),next=document.querySelector("#next"),art=document.querySelector("#art");
const cover=document.querySelector("#cover"),storyPage=document.querySelector("#storyPage");
const start=document.querySelector("#start");

function render(){
  const isCover=current===-1;
  cover.hidden=!isCover;
  storyPage.hidden=isCover;
  if(isCover){
    progress.textContent="Portada";
    prev.disabled=true; next.disabled=false;
    return;
  }
  const page=pages[current];
  text.textContent=page.scene;
  pageNumber.textContent=String(current+1).padStart(2,"0");
  progress.textContent=(current+1)+" / "+pages.length;
  prev.disabled=false; next.disabled=current===pages.length-1;
  art.setAttribute("aria-label","Ilustración conceptual: "+page.visual);
  art.dataset.scene=page.visual;
}

function go(delta){
  current=Math.max(-1,Math.min(pages.length-1,current+delta));
  render();
  history.replaceState(null,"",current<0?"#portada":"#pagina-"+(current+1));
}

function goTo(value){
  current=Math.max(-1,Math.min(pages.length-1,value));
  render();
}

start.addEventListener("click",()=>go(1));
prev.addEventListener("click",()=>go(-1));
next.addEventListener("click",()=>go(1));
document.querySelector("#first").addEventListener("click",()=>goTo(-1));
document.querySelector("#last").addEventListener("click",()=>goTo(pages.length-1));

document.addEventListener("keydown",e=>{
  if(e.key==="ArrowLeft")go(-1);
  if(e.key==="ArrowRight"||e.key==="Enter")go(1);
});

let touchX=null;
document.querySelector("#reader").addEventListener("touchstart",e=>{touchX=e.changedTouches[0].clientX},{passive:true});
document.querySelector("#reader").addEventListener("touchend",e=>{
  if(touchX===null)return;
  const dx=e.changedTouches[0].clientX-touchX;
  if(Math.abs(dx)>45)go(dx<0?1:-1);
  touchX=null;
},{passive:true});

const match=location.hash.match(/pagina-(\d+)/);
if(match)goTo(Number(match[1])-1);
else render();
