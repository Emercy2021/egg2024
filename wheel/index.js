/*
 * Copyright (c) 2020. shtrih
 */

const dataSets = {
    inventory: [
        'Щit',
        'Комбинезон химзащиты',
        'Рулон туалетной бумаги',
        'Респиратор',
        'Одноразовые перчатки',
        'Банка шпината',
        'Крышка от мусорного бака',
        'Ремонтный набор',
        'Антисептик',
        'Рука для фистинга имени Билли Херрингтона',
        'Сексуальные чулки',
        'Четырехлистный клевер',
        'Кукла вуду',
        'Набор выживальщика',
        'Наперсток удачи',
        'Переносной телепорт',
        'Футляр',
        'Жилетка Вассермана',
        'Стул мамы Мерфи',
        'Шиш кебаб',
        'Альпинистский трос',
        'Хакерский компьютер',
        'Корона короля петучей',
        'Благословение Хакса',
        'Порошок прозрения',
    ],
    effects: [
        'Мистер Ржавчик',
        'Облизанный ободок унитаза',
        'Ловушка Джокера',
        'Знаток выгоды',
        'Стримбернар',
        'В бухгалтерии все перепутали',
        'Скупщик гречи',
        'Грабли',
        'Выключенный ОБС',
        'ОПЯТЬ НДИДИ',
        'Шуточное колесо',
        'Вор',
        'Чат выбирает',
        'Ультрамошна',
        'Суд присяжных',
        'Тест на вирус',
        'Успешная вылазка',
        'Штаны на 40 хрывень',
        'ВзрывОчка',
        'Залутанная локация',
        'Конченное событие',
        'Комбо неудач',
        'Дух Рэмбо',
        'Настоящий бунтарь',
        'Чуйка на говно',
        'Не та позиция тебе выпала, стремлер',
        'Выбор Бумера',
        'Выбор Зумера',
        'Чат здесь закон',
        'Я здесь закон',
        'Три топора',
        'Сраное колдунье',
        'Два по цене одного',
        'Интрига',
        'РокировОЧКА',
        'По магазинам с чатом',
        'Открытая пачка сухариков',
        'Сырое мясо',
        'Проблев',
        'Кефир с замазанным сроком годности',
        'Таблетки без названия',
        'Сладкий рулет ХПГ',
        'Подземное убежище',
        'Аттракцион невиданной щедрости',
        'Never Lucky',
        'Сахарные бомбы',
        'Наелся и спит',
        'Предательский столб',
        'Падение пиццианской башни',
        'Полное свинство',
    ],
    coin: [
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Ребро!',
    ],
    streamers: [
        'MistaFaker',
        'Lasqa',
        'Liz0n',
        'Melharucos',
        'UselessMouth',
        'UncleBjorn',
    ],
    debuffs: [
        'Мистер Ржавчик',
        'Облизанный ободок унитаза',
        'Скупщик гречи',
        'ОПЯТЬ НДИДИ',
        'Вор',
        'Чат выбирает',
        'Тест на вирус',
        'Штаны на 40 хрывень',
        'Залутанная локация',
        'Конченное событие',
        'Комбо неудач',
        'Дух Рэмбо',
        'Не та позиция тебе выпала, стремлер',
        'Чуйка на говно',
        'Три топора',
        'Аттракцион невиданной щедрости',
        'Предательский столб',
        'Падение пиццианской башни',
    ]
};
let currentDataSet = 'inventory',
    editedDataSets = {};

const editDialog = document.getElementById('dialog-edit'),
    editButton = document.getElementById('btn-edit'),
    editConfirmButton = editDialog.getElementsByClassName('apply')[0],
    editOptions = editDialog.getElementsByClassName('options')[0],
    editPresets = editDialog.getElementsByClassName('presets')[0],
    optionClick = function (option, checked) {
        editedDataSets[currentDataSet][option] = checked;
    },
    generateOptions = function (dataObject) {
        let options = '';
        for (let i in dataObject) {
            options += `<label><input type="checkbox" onchange="optionClick('${i}', this.checked)" ${dataObject[i] ? 'checked' : ''} />${i}</label><br />`;
        }

        return options;
    },
    resetEditedDataSet = function () {
        editedDataSets[currentDataSet] = Object.fromEntries(dataSets[currentDataSet].map(v => v).sort().map(v => [v, true]));
    },
    editedDataToArray = function () {
        let result = [];

        for (let [key, value] of Object.entries(editedDataSets[currentDataSet])) {
            if (value) {
                result.push(key)
            }
        }

        return result;
    }
;

editButton.addEventListener('click', function () {
    if (currentDataSet === 'custom') {
        p5Instance.mouseDragEnable(false);
        customDialog.style.display = 'block';

        return;
    }

    editDialog.style.display = 'block';
    p5Instance.mouseDragEnable(false);

    editPresets.innerHTML = '';
    editPresets.append(...presets.getNodes(currentDataSet));
    editOptions.innerHTML = generateOptions(editedDataSets[currentDataSet]);
});
editConfirmButton.addEventListener('click', function () {
    editDialog.style.display = 'none';
    p5Instance.mouseDragEnable();

    p5Instance.setData(editedDataToArray());
});

class Preset {
    constructor(title, disabledEntries, isDefault) {
        this._title = title;
        this._disabledEntries = disabledEntries;
        this._isDefault = Boolean(isDefault);
    }

    get isDefault() {
        return this._isDefault;
    }

    get domNode() {
        const el = document.createElement('a');

        el.setAttribute('href', '#');
        el.appendChild(document.createTextNode(this._title));
        el.addEventListener('click', this.handleClick.bind(this));

        return el;
    }

    handleClick() {
        resetEditedDataSet();

        for(const i in this._disabledEntries) {
            if (editedDataSets[currentDataSet][this._disabledEntries[i]]) {
                editedDataSets[currentDataSet][this._disabledEntries[i]] = false;
            }
        }

        editOptions.innerHTML = generateOptions(editedDataSets[currentDataSet]);

        return false;
    }
}

class PresetAll extends Preset {
    constructor(isDefault) {
        super('Выбрать всё', [], isDefault);
    }
}

class PresetWithoutSpecialRolls extends Preset {
    constructor(isDefault) {
        super(
            'Без спецроллов',
            [
                'Чуйка на говно',
                'Выбор Бумера',
                'Выбор Зумера',
                'Чат здесь закон',
                'Я здесь закон',
                'Never Lucky',
            ],
            isDefault
        );
    }
}

class Presets {
    constructor() {
        this._presets = {
            // inventory: [
            //     new PresetAll(),
            // ],
            effects: [
                new PresetAll(),
                new PresetWithoutSpecialRolls(true),
            ],
            debuffs: [
                new PresetAll(),
                new PresetWithoutSpecialRolls(true),
            ],
            streamers: [
                new PresetAll(),
            ],
        };
    }

    hasPreset(dataSetKey) {
        return !!this._presets[dataSetKey];
    }

    getNodes(dataSetKey) {
        let result = [];

        for(const i in this._presets[dataSetKey]) {
            if (i % 2) {
                result.push(document.createTextNode(', '));
            }
            result.push(this._presets[dataSetKey][i].domNode);
        }

        return result;
    }

    applyDefaults(dataSetKey) {
        for(const i in this._presets[dataSetKey]) {
            if (this._presets[dataSetKey][i].isDefault) {
                this._presets[dataSetKey][i].handleClick();
            }
        }
    }
}

const presets = new Presets;

function getImageURI(index) {
    let result = '../hpg-inventory/images/000.png',
        offset = 0
    ;
    switch (currentDataSet) {
        case "inventory":
            offset = 50;
        case "effects":
            result = '../hpg-inventory/images/0' + ('0' + (index+1 + offset)).slice(-2) + '.png';
            break;

        case "debuffs":
            const mapping = [
                1,
                2,
                7,
                10,
                12,
                13,
                16,
                18,
                20,
                21,
                22,
                23,
                26,
                25,
                31,
                44,
                48,
                49
            ];
            result = '../hpg-inventory/images/0' + ('0' + (mapping[index])).slice(-2) + '.png';
            break;

        case "coin":
            result = '../images/coin-obverse-20.png';
            if (index === 1) {
                result = '../images/coin-reverse-20.png';
            }
            if (index === 10) {
                result = '../images/coin-gurt.png';
            }
            break;

        case "streamers":
            result = '../images/streamers/'+ dataSets[currentDataSet][index] +'.png';
            break;
    }

    return result;
}

const p5Instance = new p5(wheelSketch);

p5Instance.onAfterSetup = function () {
    p5Instance.setVideos([
     
    
['videos/1.mov', 0],
['videos/2.mp4', 0],
['videos/3.mp4', 0],
['videos/4.mp4', 0],
['videos/5.mp4', 0],
['videos/6.mp4', 0],
['videos/7.mp4', 0],
['videos/8.mp4', 6],
['videos/9.mp4', 0],
['videos/10.mov', 0],
['videos/11.mp4', 0],
['videos/12.mp4', 0],
['videos/13.mp4', 11],
['videos/14.mp4', 4],
['videos/15.mp4', 17],
['videos/17.mp4', 0],
['videos/18.mp4', 10],
['videos/19.mp4', 0],
['videos/20.mp4', 0],
['videos/21.mp4', 0],
['videos/22.mp4', 0],
['videos/23.mp4', 0],
['videos/24.mp4', 10],
['videos/25.mp4', 0],
['videos/26.mp4', 0],
['videos/27.mp4', 0],
['videos/28.mp4', 0],
['videos/29.mp4', 0],
['videos/30.mp4', 0],
  
      
      
        
    ]);
};

const image = document.querySelector('#item-image img');
p5Instance.onSelectItem = function(data, selectedKey) {
    if (dataSets[currentDataSet]) {
        image.src = getImageURI(dataSets[currentDataSet].indexOf(data[selectedKey]));
    }
    else {
        image.src = '../hpg-inventory/images/000.png';
    }
};

const customDialog = document.getElementById('custom-list'),
    customTextarea = customDialog.getElementsByTagName('textarea')[0],
    customButton = customDialog.getElementsByTagName('button')[0]
;

customButton.addEventListener('click', function () {
    customDialog.style.display = 'none';

    p5Instance.setData(customTextarea.value.split('\n'));
    p5Instance.mouseDragEnable();
});

let radios = document.querySelectorAll('[name="list"]');
for(let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('click', function () {
        currentDataSet = this.value;

        if (this.value === 'custom') {
            p5Instance.mouseDragEnable(false);
            customDialog.style.display = 'block';

            return;
        }

        customDialog.style.display = 'none';
        p5Instance.mouseDragEnable();

        if (presets.hasPreset(currentDataSet)) {
            if (!editedDataSets[currentDataSet]) {
                resetEditedDataSet();
                presets.applyDefaults(currentDataSet);
            }

            p5Instance.setData(editedDataToArray());
            editButton.removeAttribute('disabled');
        }
        else {
            p5Instance.setData(dataSets[currentDataSet]);
            editButton.setAttribute('disabled', 'disabled');
        }
    });

    // Выбираем начальный вариант при загрузке страницы
    if (radios[i].hasAttribute('checked')) {
        radios[i].dispatchEvent(new Event('click'));
    }
}
