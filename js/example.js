//метод класса Array, который перемешивает массив в случайном порядке
Array.prototype.myshuffle = function(){
  var min = 0;
  var max = this.length - 1;
	var temp;
	for(var i = 0; i < this.length; i++) {
		var randNum1 = Math.floor(Math.random() * (max - min + 1)) + min;
		var randNum2 = Math.floor(Math.random() * (max - min + 1)) + min;
		temp = this[randNum1];
		this[randNum1] = this[randNum2];
		this[randNum2] = temp;
	}
};
//метод класса Array, который перемещает первые n элементов в конец массива
Array.prototype.moveBeginToEnd = function(n){
  var temp;
  for(var i = 0; i < n; i++) {
    temp = this.shift();
    this.push(temp);
  }
};
//генерирует целое число в диапазоне min-max включительно
function generateInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
//метод премешивающий столбики
Array.prototype.shuffleRow = function() {
  var rand1 = 0;
  var rand2 = 0;
  var temp;
  for(var i = 0; i < this.length; i = i + 3) {
    for(var j = 0; j < 5; j++) {
      do {
        rand1 = generateInteger(i, i + 2);
        rand2 = generateInteger(i, i + 2);
      } while(rand1 == rand2)
      for(var k = 0; k < this.length; k++) {
        temp = this[rand1][k];
        this[rand1][k] = this[rand2][k];
        this[rand2][k] = temp;
      }
    }
  }
};
//метод премешивающий строки
Array.prototype.shuffleCol = function() {
  var rand1 = 0;
  var rand2 = 0;
  var temp;
  for(var i = 0; i < this.length; i = i + 3) {
    for(var j = 0; j < 5; j++) {
      do {
        rand1 = generateInteger(i, i + 2);
        rand2 = generateInteger(i, i + 2);
      } while(rand1 == rand2)
      for(var k = 0; k < this.length; k++) {
        temp = this[k][rand1];
        this[k][rand1] = this[k][rand2];
        this[k][rand2] = temp;
      }
    }
  }
};
//выводит таблицу импутов со значениями из массива
function showInputValue(table) {
  for(var i = 0; i < SIZE; i++) {
    var div = document.createElement('div');
    div.id = i;
    for(var x = 0; x < SIZE; x++) {
      var inp = document.createElement('input');
      inp.type = "text";
      inp.size = "1";
      //блокирует возможность редактирования
      if(table[i][x] != "")
        inp.setAttribute("readonly", true);
      //ограничивает ко-во цифр
      inp.setAttribute("maxlength", '1');
      inp.value = table[i][x];
      div.appendChild(inp);
    }
    document.getElementById('sudocu').appendChild(div);
  }
};
//заполняет массив для судоку числами
function fillArray(table) {
  var ar = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  ar.myshuffle();
  for(var k = 0; k < table.length; k = k + 3) {
    for(var i = k; i < k + 3; i++) {
      for(var j = 0; j < SIZE; j++) {
        table[i][j] = ar[j];
      }
      ar.moveBeginToEnd(3);
    }
    ar.moveBeginToEnd(1);
  }
};
//метод рандомно убирающий n цифр 
Array.prototype.clearCell = function(n) {
  var x = 0;
  var y = 0;
  for(var i = 0; i < n; i++) {
    do {
        x = generateInteger(0, 8);
        y = generateInteger(0, 8);
      } while(x == y || this[x][y] == "")
    this[x][y] = "";
  }
};

var SIZE = 9;
function SudocuTable() {
  //создаем двумерный массив
  var table = new Array(SIZE);
  for(var k = 0; k < table.length; k++)
    table[k] = new Array(SIZE);
    
  //заполняем массив по правилам судоку
  fillArray(table);
    
  //showInputValue(table);
  
  // мешаем, мешаем, мешаем...  
  table.shuffleCol();
  table.shuffleRow();
  table.shuffleCol();
  table.shuffleRow();
  table.shuffleCol();
  table.shuffleRow();
  table.shuffleCol();
  table.shuffleRow();
  table.shuffleCol();
  table.shuffleRow();
  
  //отображаем готовое судоку
  //showInputValue(table);
  
  var table2 = table;
  table2.clearCell(40);
  showInputValue(table2);
};
