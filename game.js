var game = (function () {
    /**
     * Проверяем не закончилась ли игра
     */
    var checkGameOver = function (icon, matrix){

        var matrix = matrix.slice(0).map(function(elem){
            return elem.map(a => Object.assign({}, a));
        });

        var count = 0;
            N = matrix.length;

        for (var i = 0; i < N; i++) {
            var row = true;
                column = true;
                secondary = true;
                main = true;

            for (var j = 0; j < matrix[i].length; j++) {
                count += matrix[i][j].state;
                if(matrix[i][j].player !== icon) row = false;
                if(matrix[j][i].player !== icon) column = false;
                if(matrix[j][j].player !== icon) main = false;
                if(matrix[N-j-1][j].player !== icon) secondary = false;
            }
            
            if(row || column || secondary || main){
                return {
                    result: true,
                    player: icon
                };
            }
            
        }
       if(count == N * N )
            return {
                result: true,
                player: false
            };
        else
            return false;
    }
    /**
     * Получаем текущую матрицу игры
     */
    var getGameMatrix = function (){
        
        var matrix = [];
        for (var i = 0; i < table.rows.length; i++) {
            var cells = [];
            var elements = table.rows[i].cells;
            for (var j = 0; j < elements.length; j++) {
                
                if(elements[j].classList.contains("disabled"))
                    cells.push({
                        state:1,
                        player:elements[j].getAttribute("player")
                    });
                else
                    cells.push({
                        state:0,
                    });
            }
            matrix.push(cells);
        }
        return matrix;
    }
    /**
     * Ищем свободные клетки 
     */
    var findEmptyCells = function (){
        var matrix = getGameMatrix();
        var empty = [];
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if(matrix[i][j].state == 0){
                    empty.push(i+","+j);
                }
            }
        }
        return empty;
    }
    var clearBoard = function (){
        for (var i = 0; i < table.rows.length; i++) {
            var elements = table.rows[i].cells;
            for (var j = 0; j < elements.length; j++) {
                elements[j].classList.remove("disabled");
                elements[j].removeAttribute("player");
                elements[j].innerHTML = "";
            }
        }
        document.getElementsByClassName("show-result")[0].innerHTML = "Крестики - Нолики";
    }
    var showGameResult = function (player, icons){
        var res = document.getElementsByClassName("show-result")[0];
        if (player){
            res.innerHTML = "Победа&nbsp;&mdash;&nbsp;" + icons[player];
        }else{
            res.innerHTML = "Ничья";
        }
        saveGameHistory(player);
        setTimeout(function() {
            game.clearBoard();
        },1000);
        
    }

    var saveGameHistory = function (player){
        if(!localStorage.getItem("game")){
            localStorage.setItem("game", "");
            gameHistory = [];
        }else
            gameHistory = JSON.parse(localStorage.getItem("game"));
        
        if(player)
            gameHistory.push(player);
        else
            gameHistory.push(false);

        localStorage.setItem("game", JSON.stringify(gameHistory));
        showGameHistory();
    }

    var showGameHistory = function(){
        gameHistory = JSON.parse(localStorage.getItem("game"));
        if(!gameHistory)
            return false;

        var history_container = document.getElementsByClassName("play-score")[0];
        history_container.innerHTML = "";

        var history_table = document.createElement("table");
        history_table.classList.add('play-score-inner');
        history_table.innerHTML += "<tr><td></td>"+
        "<td><svg class='icon_size-small'><use xlink:href='#cross' /></svg></td>" 
        + "<td><svg class='icon_size-small'><use xlink:href='#circle' /></svg></td></tr>"
        gameHistory.forEach(function(item, index){
            if(item == "cross")
                history_table.innerHTML += "<tr><td>Раунд&nbsp;-&nbsp;" + index + "</td>" 
                + "<td>1</td><td>0</td></tr>";
            else if(item == "circle")
                history_table.innerHTML += "<tr><td>Раунд&nbsp;-&nbsp;" + index + "</td>" 
                + "<td>0</td><td>1</td></tr>";
            else
                history_table.innerHTML += "<tr><td>Раунд&nbsp;-&nbsp;" + index + "</td>" 
                + "<td>Ничья</td></tr>";
          });
       
        history_container.appendChild(history_table);
    }
    return {
        getGameMatrix: getGameMatrix,
        checkGameOver:checkGameOver,
        findEmptyCells:findEmptyCells,
        clearBoard:clearBoard,
        showGameResult:showGameResult,
        showGameHistory:showGameHistory
    }
})();