function countersAnimation(elementID) {
    //dodao sam parametar elementID u funkciju kako bi kreirao querySelector koji gadja elemente samo pod tim id-em
    var elements = document.querySelectorAll("#" + elementID + " .counterNumber");

    for (var i = 0; i < elements.length; i++) {
        playCounters(elements[i], elements[i].innerHTML);
    }

    function playCounters(element, counterEnd) {

        var counter = 0;

        var interval = setInterval(function () {

            if (counter == 50) {
                clearInterval(interval);
                element.innerHTML = counterEnd;
            } else {
                counter++;
                element.innerHTML = counter;
            }

        }, 40)

    }

}


//f-ja za prikaz menija na mob-u
function displayMenuFromLeft() {

    var maskBlock = document.getElementById("mob-mask-block");
    var menuMob = document.getElementById("menu-block-mob");

    maskBlock.style.display = "block"
    menuMob.style.display = "block"

    //kopiram ceo inner html iz menu block u menu-mob block
    menuMob.innerHTML = document.getElementById("menu-block").innerHTML;

    maskBlock.style.left = "0%";
    menuMob.style.left = "0%";

}

//f-ja za zatvaranje menija na mob-u
function closeMenuMob() {

    var maskBlock = document.getElementById("mob-mask-block");
    var menuMob = document.getElementById("menu-block-mob");

    maskBlock.style.left = "-100%";
    menuMob.style.left = "-100%";

}

//f-ja za prikazivanje elementa sa strana sajta(efekat kao da element upada u sajt)
function jumpInAnimation(elementID) {
    //dodao sam parametar elementID u funkciju kako bi kreirao querySelector koji gadja elemente samo pod tim id-em

    //smestam u niz sve elemente koje nadje querySelectorAll
    var jumpInElements = document.querySelectorAll("#" + elementID + " .jumpIn");

    for (var i = 0; i < jumpInElements.length; i++) {
        jumpInElements[i].style.position = "relative";
        jumpInElements[i].style.float = "left";
        jumpInElements[i].style.visibility = "visible";
        jumpInElements[i].style[jumpInElements[i].getAttribute("data-direction")] = "0";
    }

}

//dodajem klik dogadjaj na sandwic meni
document.getElementById("menu-mob-sandwich").addEventListener("click", displayMenuFromLeft);

//dodajem klik dogadjaj na close menu
document.getElementById("close-mask-block").addEventListener("click", closeMenuMob);

//dodajem dogadjaj scroll, na svaki skrol izvrsava se funkcija
window.addEventListener("scroll", function (ev) {

    var sections = document.getElementsByClassName("sectionBlock");

    for (var i = 0; i < sections.length; i++) {

        //ovde mi je uslov za promenu pozicije menija, kad je scrol veci od 100, meni menja boju i postaje fixed
        if (window.pageYOffset > 100) {
            document.getElementById("headerTopFixedBlock").style.backgroundColor = "rgba(52, 59, 64, 0.9)";
            document.getElementById("headerTopFixedBlock").style.position = "fixed";
        } else {
            document.getElementById("headerTopFixedBlock").style.backgroundColor = "transparent";
        }

        
         
        if (window.pageYOffset >= sections[i].offsetTop - 1000) {

            sections[i].style.opacity = "1";
            //ovde pozivam funkciju za updanje elemenata i šaljem joj parametar id od elementa koji je trenutno na skrolu
            jumpInAnimation(sections[i].getAttribute("id"));
            //ovde pozivam funkciju za brojanje i isto joj šaljem id elementa
            countersAnimation(sections[i].getAttribute("id"));
            //ovde brisem klasu sectionBlock kako mi se ne bi ponavljalo na svakki skrol, odradi jednom i skine klasu
            sections[i].classList.remove("sectionBlock");

        }
    }

})

tabItemsShow()

function tabItemsShow() {

    var tabs = document.getElementsByClassName("itemsShowClick");

    for(var i=0;i<tabs.length;i++){
        tabs[i].addEventListener("click", function (e) {
            //sa e prevent sprecavam da me na klik na a baca na vrh strane, sprecavam podrazumevanu akciju
            e.preventDefault();
            //sakrivam sve slike
            hideItems();
            //postavljam uslov da li treba da prikažem sve ili samo odredjene
            if(e.target.getAttribute("data-items") == "all"){
                var itemsToShow = document.getElementsByClassName("items"); 
            }else{
                var itemsToShow = document.getElementsByClassName(e.target.getAttribute("data-items")); // spajaju se preko klase i data-item atribut koji im je naziv zanr, i dodata je i klasa naziv zanra
            }
            

            for(var j=0;j<itemsToShow.length;j++){
                displayTabItems(itemsToShow[j],"block")
                console.log("prikayujem sve",itemsToShow[j]);
                itemsToShow[j].style.opacity = "1";
            }

        })
    }

}

function hideItems() {

    var items = document.getElementsByClassName("items");
    for(var i = 0;i<items.length;i++){
        displayTabItems(items[i],"none");
    }

}


function displayTabItems(e,status){
    setTimeout(function(){e.style.display = status;},500)
}

