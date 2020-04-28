//funkcja zmieniajaca podstawowe elementy
function podstawy(){
    document.getElementsByClassName('floatbox-box-background')[0].style.background = '#2c2c2c';         //zmien kolor tla na szary
    var elementExists = document.getElementById('mainHeader');                                          //sprawdz czy mainHeader istnieje
    if (typeof(elementExists) != 'undefined' && elementExists != null){                                 //jezeli istnieje to go usun
        document.getElementById('mainHeader').remove();
    }
    document.getElementById('m-tab-main-container-1').style.height = '100%'                             //rozciagnij okno rozmowy na cala wysokosc 

    var uzytkownicy = document.getElementsByClassName('m-list-user-item');
    var i;
    for (i = 0; i < uzytkownicy.length; i++) {
        if(uzytkownicy[i].getAttribute("data-perm") == '0'){
            uzytkownicy[i].className = 'm-list-user-item ignored' 
            uzytkownicy[i].remove();
        }
    }
}   

podstawy()

//wybierz wezel obserwacji  - w tym wypadku okno rozmowy
const targetNode = document.getElementsByClassName('m-messagesTextArea')[0];

//dodaj opcje ktore maja byc obserwowane (wezly podrzedne)
const config = { childList: true, subtree: true };

//funkcja wykonywana gdy zaobserwowana jest mutacja
const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {                                                                //dla kazdej mutacji wezla "okno wiadomosci"
        if (mutation.type === 'childList') {                                                            //sprawdz czy dodano nowy childnode
            var playerExists = document.getElementsByClassName('video-player-container')[0];            //skoro juz tu jestesmy sprawdz czy jest video player                                          
            if (typeof(playerExists) != 'undefined' && playerExists != null){                           //jezeli jest to go usun                              
                playerExists.remove();
            }
            var uzytkownicy = document.getElementsByClassName('m-list-user-item');
            var i;
            for (i = 0; i < uzytkownicy.length; i++) {
                if(uzytkownicy[i].getAttribute("data-perm") == '0'){
                    uzytkownicy[i].className = 'm-list-user-item ignored';
                    uzytkownicy[i].remove();
                }
            }
            if(mutation.addedNodes[0].className == 'm-msg-item accosted'){                              //jezeli klasa wiadomosci ode mnie z uzyciem mojego nicka
                console.log('Wiadomosc do mnie :)');                                                    //wiadomosc testowa w konsoli
                let url = chrome.runtime.getURL('note.mp3');                                            //uzyskaj dostep do pliku note.mp3                                                           
	            let a = new Audio(url);
	            a.play();                                                                               //odtworz plik audio                                                                                   
            }                
        }            
    }
};


//utworz instancje obserwacji z funkcja callback w razie zaobserwowanych zmian
const observer = new MutationObserver(callback);

//zacznij obserwowac
observer.observe(targetNode, config);
