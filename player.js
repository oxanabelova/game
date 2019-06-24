var player = (function (icon) {

    var icons = {
        circle : '<svg class="icon"><use xlink:href="#circle" /></svg>',
        cross : '<svg class="icon"><use xlink:href="#cross" /></svg>'
    }

    var makeMove = function (x, y, icon){
        var elem = table.rows[x].cells[y];         
        elem.innerHTML = icons[icon];
        elem.classList.add('disabled');
        elem.setAttribute('player', icon);
        
        var matrix = game.getGameMatrix();
        over = game.checkGameOver(icon, matrix);
        if(over){
            play = "stop";
            game.showGameResult(over.player, icons);
        }else{
            play = "start";
        }
    }
    return {
        makeMove: makeMove,
    }
})();