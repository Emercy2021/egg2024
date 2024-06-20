
let huey = document.getElementById("huey");
huey.addEventListener('click', function () {
    document.getElementById("image").style.borderRadius = "50%" ;
    }
);

let dewey = document.getElementById("dewey");
dewey.addEventListener('click', function () {
    document.getElementById("image").style.borderRadius = "50%" ;
    }
);


let scrudge = document.getElementById("scrudge");
scrudge.addEventListener('click', function () {
    document.getElementById("image").style.borderRadius = "0%";
    
    }
);


let scrooge = document.getElementById("scrooge");
scrooge.addEventListener('click', function () {
    document.getElementById("image").style.borderRadius = "0%";
    
    }
);

let descriptionContainer = document.getElementById("descriptionContainer");

let inventoryDescription = [
    'Получите +1 к итоговому значению следующего броска.',
    'Получите -1 к итоговому значению следующего броска.',
    'Получите +2 к итоговому значению следующего броска.',
    'Получите -2 к итоговому значению следующего броска.',
    'Переместитесь на клетку "Аукошная" и пройдите там игру.',
    'Переместитесь на клетку "Лотерея" и пройдите там игру.',
    'Переместитесь на клетку с противоположной от вас стороны и пройдите там игру.',
    'Получите 1 поинт.',
    'Потеряйте 1 поинт.',
    'Верхний порог времени следующей клетки ниже на 2 часа.',
    'Текущее преодоление всего игрового поля дает лишь 2 поинта, вместо 5.',
    'Вернитесь на клетку, с которой вы начинали текущий ход и совершите ход заново.',
    'Если участник на момент выпадения этого пункта находится в первой половине участников по поинтам, он получает -2 к своему следующему броску кубика для перехода по секторам. Если нет то +2.',
    'Следующая игра ролится по "жанровым" правилам.',
    'Следующая игра ролится по "обычным" правилам.',
    'Киньте 3 кубика. Выберите два из них и переместитесь на сумму их значений.',

];




    
    








   




