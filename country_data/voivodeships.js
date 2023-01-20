var countries = [
  ["Name","TERYT code","TERYT id"],
  ["dolnoslaskie","DS","02"],
  ["kujawsko-pomorskie","KP","04"],
  ["lubelskie","LU","06"],
  ["lubuskie","LB","08"],
  ["lodzkie","LD","10"],
  ["malopolskie","MA","12"],
  ["mazowieckie","MZ","14"],
  ["opolskie","OP","16"],
  ["podkarpackie","PK","18"],
  ["podlaskie","PD","20"],
  ["pomorskie","PM","22"],
  ["slaskie","SL","24"],
  ["swietokrzyskie","SK","26"],
  ["warminsko-mazurskie","WN","28"],
  ["wielkopolskie","WP","30"],
  ["zachodniopomorskie","ZP","32"]
]

name_to_id = new Map();
three_letters_to_id = new Map();
id_to_id = new Map();

for (let i=1; i < countries.length; i++)
{
    record = countries[i];
    
    name_to_id.set(record[0],record[1]);
    three_letters_to_id.set(record[2],record[1]);
    id_to_id.set(record[1],record[1]);
}
