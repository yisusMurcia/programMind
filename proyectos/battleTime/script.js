//Probabilidad de mejora, entre 0 y 1
//Boast chance, between 0 and 1
let getABoast=(num)=>{
    return Math.random< num;
};
let updateStats= ()=>{
    let title1= document.querySelector("#player1Title");
    title1.innerHTML= `${player1.name}: ${player1.live}`;
    let title2= document.querySelector("#player2Title");
    title2.innerHTML= `${player2.name}: ${player2.live}`;
}
//Crear la clase d epersonajes
//Create class character
class Character{
    constructor(name, live, damage, critic, criticNum, heal, healNum){
        this.name= name;
        this.live= live;
        this.maxLive= live;
        this.damage= damage;
        this.critic= critic;
        this.criticNum= criticNum;
        this.heal= heal;
        this.healNum= healNum;
    };
    attack(enemy){
        let attack= this.damage;
        if(getABoast(this.criticNum)){
            attack= this.critic;
        };
        enemy.live-= attack;
        updateStats();
    };
    healing(){
        let heal= 20;
        if (getABoast(this.healNum)){
            heal= this.heal;
        };
        this.live+= heal;
        //La curación no puede sobrepasar la vida máxima
        //The healing can´t be greater than the max live
        if (this.live> this.maxLive){
            this.live= this.maxLive;
        };
        updateStats()
    };
};
//Crear clases para los personajes
//Create class of the characters
class Ninja extends Character{
    constructor(name, live, damage, critic, criticNum, heal, healNum){
        super("Ninja", 300, 25, 40, 0.25, 45, 0.2);
    };
};
class Gentleman extends Character{
    constructor(name, live, damage, critic, criticNum, heal, healNum){
        super("Gentleman", 750, 10, 50, 0.2, 60, 0.7);
    };
};
class Raptor extends Character{
    constructor(name, live, damage, critic, criticNum, heal, healNum){
        super("Raptor", 400, 20, 40, 0.25, 45, 0.2);
    };
};
class Caveman extends Character{
    constructor(name, live, damage, critic, criticNum, heal, healNum){
        super("Caveman", 600, 15, 20, 0.2, 50, 0.5);
    };
};
const characters= [Ninja, Gentleman, Raptor, Caveman];
//Definir botones
//define buttons
const readyButton= document.querySelector("#ready");
const attack1= document.querySelector("#player1Attack");
const heal1= document.querySelector("#player1Heal");
const attack2= document.querySelector("#player2Attack");
const heal2= document.querySelector("#player2Heal");
//Establecer los personajes de los jugadores
//Set player´s characters
let player1;
let player2
const setCharacters=()=>{
    //Mostrar botones
    //Show buttons
    const hidden= document.querySelectorAll("button.hidden");
    for (const element of hidden){
        element.removeAttribute("class", "visible");
    };
    //Player 1
    let select= document.querySelector("#player1");
    select.setAttribute("class", "hidden");
    player1 = new characters[select.value];
    //Player 2
    select= document.querySelector("#player2");
    select.setAttribute("class", "hidden");
    player2 = new characters[select.value];
    readyButton.replaceWith(document.createElement("br"));
    updateStats();
};
//Configurar botones
//Set buttons
readyButton.addEventListener("click", ()=>{
    setCharacters();
    readyButton.removeEventListener("click");
});
attack1.addEventListener("click", ()=> player1.attack(player2));
attack2.addEventListener("click", ()=>player2.attack(player1));
heal1.addEventListener("click", ()=> player1.healing());
heal2.addEventListener("click", ()=>player2.healing());