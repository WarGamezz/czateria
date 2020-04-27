function test(){
    document.getElementsByClassName('floatbox-box-background')[0].style.background = '#2c2c2c';
    document.getElementById('m-tab-main-container-1').style.height = '100%'   
    document.getElementById('mainHeader').remove();
    document.getElementsByClassName('video-player-container')[0].remove();
    document.getElementsByClassName('reminder-link visible common')[0].remove();
}

test()