var computer = (function () {

    /**
     * Компьютер проверяет, нельзя ли завершить игру победой или испортить победу врагу
     */
    var findWinCell = function (){
        var winCell = false;
        var opponentCell = false;
        var matrix = game.getGameMatrix().slice(0).map(function(elem){
            return elem.map(a => Object.assign({}, a));
        });
        var flag = 0;

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {

                if(matrix[i][j].state == 0){
                    //Проверяем ход компьютера
    
                    matrix[i][j] = {
                        state:1,
                        player:comp
                    };
                    
                    if(game.checkGameOver(comp, matrix)){
                        winCell = [i, j];
                    }
                    
                    //Проверяем ход соперника
                    matrix[i][j] = {
                        state:1,
                        player:human
                    };
                    if(game.checkGameOver(human, matrix)){
                        opponentCell = [i, j];
                    }
                    matrix[i][j] = {
                        state:0
                    };
                   
                }
                if(winCell)
                    break;
            }
        }
        
        if(winCell)
            return winCell;
        else if(opponentCell)
            return opponentCell;
        return false;
    }

     /**
     * Компьютер проверяет, нельзя ли попасть на выгодную позицию.
     */
    var findGoodCell = function(){
        var goodCells = [
            "0,0", "0,2", "2,0", "1,1", "2,2"

        ];
        var empty = game.findEmptyCells();
        var intersection = empty.filter(function(item){ return goodCells.indexOf(item) > -1}); 
        if(intersection.length > 1){
            var rand = Math.floor(Math.random() * intersection.length);
            cell = intersection[rand].split(",");
            return(cell);
        }
        return false;
    }

    /**
     * Компьютер ходит на первую пустую клетку
     */
    var findAnyCell = function(){
        var empty = game.findEmptyCells();
        var rand = Math.floor(Math.random() * empty.length);
        cell = empty[rand].split(",");
        return(cell);
    }

    /**
     * Компьютер делает ход.
     */
    var makeStep = function(){
        
        if(cell = findWinCell()){
            setTimeout(player.makeMove(cell[0],cell[1],comp), 4000);
           
            return;
        }else if(cell = findGoodCell()){
            player.makeMove(cell[0],cell[1],comp);
            return;
        }else{
            cell = findAnyCell();
            player.makeMove(cell[0],cell[1],comp);
        }
        
    }

    return {
        makeStep: makeStep,
    }

})();