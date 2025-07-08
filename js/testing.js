let listStingGabungan = [];
let mainId = []
const data1 = "707909";
const data2 = "2015:";
const data3 = "AAFOhQM0";
const data4 = "L0PGWmKc";
const data5 = "fW2DULt";
const data6 = "jo0KHzBEHbz8";
const data7MyId = "7355777672";

// listStingGabungan = [data1, data2, data3, data4, data5];
listStingGabungan.push(data1, data2, data3, data4, data5, data6);
mainId.push(data7MyId);

let hasilgabungan = listStingGabungan.join("");
let id = mainId.join("");

console.log(`hasil api telegram ada adalah: ${hasilgabungan}\ndan hasil id akuntele target : ${id}`);

let cobakirimHello = fetch(`https://api.telegram.org/bot${hasilgabungan}/sendMessage?chat_id=${id}&text=Hallo`)
console.log(`Anda mengirim text hello ke telgram dengan id ${id}`)