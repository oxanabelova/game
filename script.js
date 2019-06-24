var table = document.getElementById('playing-field');
var human = "cross";
var comp = "circle";
var play = "stop";
var disabled = false;

(function() {
    game.showGameHistory();
   
    table.onclick = function(e) {
        var target = e.target;
        while (target != this) {
            if (target.classList.contains("playing-field__cell") 
                && !target.classList.contains("disabled")) {
                if(!disabled)
                    player.makeMove(target.parentElement.rowIndex, target.cellIndex, "cross");
                if(play == "start"){
                    disabled = true;
                    setTimeout(function() {computer.makeStep(); disabled = false;},800);
                   
                }
                    
                return;
            }
            target = target.parentNode;
        }
        
    }
    
}());