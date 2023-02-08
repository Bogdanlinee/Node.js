let exampleText = "Київ, Харків, Бердичів, Вінниця, Броварі, Ужгород,Львів    Житомир";

let csv = `
44.38,34.33,Київ,12,
49.46,30.17,Харків,8888,
49.54,28.49,Бердичів,222,#некоммент

#
46.49,36.58,#Бердянськ,33,
49.15,28.41,Вінниця,441,
#45.40,34.29,Джанкой,6666,
49.15,28.41,Броварі,44434444,
49.15,28.41,Ужгород,999444,
49.15,28.41,Львів,888333,
49.15,28.41,Житомир,1,
`;

/* function which works with csv file */
function csvText(csv, textToModify) {
  csv = csv.trim();
  csv = csv.split('\n');
  csv = csv.map(item => item.split(','));
  csv = csv.filter(item => { if (item.length >= 4) return true });
  csv = csv.map(item => item.slice(0, 4));
  csv = csv.filter(item => {
    let coordReg = /^\d+\.\d+$/;
    let cityReg = /^[а-яієїґ\'\s]+$/i;
    let populatReg = /^\d+$/;

    if (coordReg.test(item[0]) && coordReg.test(item[1]) &&
      cityReg.test(item[2]) && populatReg.test(item[3])) {
      return true;
    }
  });
  csv = csv.map(item => ({ x: item[0], y: item[1], name: item[2], population: item[3] }));
  csv = csv.sort((a, b) => b.population - a.population);
  csv = csv.slice(0, 10);
  csv = csv.reduce((accum, item, index) => {
    accum[item.name] = {
      popolation: item.population,
      rating: ++index
    }
    return accum;
  }, {});

  /* returns modified text */
  return (text) => {
    let regString = Object.keys(csv).map(item => '(?<![а-яієїґ\'])' + item + '(?![а-яієїґ\'])').join('|');
    let reg = new RegExp(regString, 'gi');
    return text.replaceAll(reg, (...args) => `${args[0]} (${csv[args[0]].rating} место в ТОП-10 самых крупных городов Украины, население ${csv[args[0]].popolation})`
    );
  };
}

let csvResult = csvText(csv);
let modifiedText = csvResult(exampleText);

/* final result of text modification */
console.log(modifiedText);