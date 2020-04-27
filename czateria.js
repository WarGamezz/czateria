//funkcja zmieniajaca podstawowe elementy
function podstawy(){
    document.getElementsByClassName('floatbox-box-background')[0].style.background = '#2c2c2c';         //zmien kolor tla na szary
    document.getElementById('mainHeader').remove();                                                     //usun naglowek
    document.getElementById('m-tab-main-container-1').style.height = '100%'                             //rozciagnij okno rozmowy na cala wysokosc 
}

podstawy()

//wybierz wezel obserwacji  - w tym wypadku okno rozmowy
const targetNode = document.getElementsByClassName('m-messagesTextArea')[0];

//dodaj opcje ktore maja byc obserwowane (wezly podrzedne)
const config = { childList: true, subtree: true };

//funkcja wykonywana gdy zaobserwowana jest mutacja
const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {                                                                //dla kazdej mutacji wezla "okno wiadomosci"
        if (mutation.type === 'childList') {                                                            //jezeli dodana zostala nowa wiadomosc                                                            
            if(mutation.addedNodes[0].className == 'm-msg-item accosted'){                              //jezeli klasa wiadomosci ode mnie z uzyciem mojego nicka
                console.log('Wiadomosc do mnie :)');                                                   //wiadomosc testowa w konsoli
                let url = chrome.runtime.getURL('note.mp3');                                            //uzyskaj dostep do pliku note.mp3                                                           
	            let a = new Audio(url);
	            a.play();                                                                               //odtworz plik                                                                                   
            }                
        }            
    }
};


//utworz instancje obserwacji z funkcja callback w razie zaobserwowanych zmian
const observer = new MutationObserver(callback);

//zacznij obserwowac
observer.observe(targetNode, config);
