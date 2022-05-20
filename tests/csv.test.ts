import { readCSV, writeCSV } from "../src/csv";
import { splitCSVLine } from "../src/csvline";
import { Table } from "../src/table";

test("readCSV", async ()=> {
const data:Table= await readCSV("tests/data.csv")
expect(data.getText(1, 1)).toBe("A");
expect(data.getText(1, 2)).toBe("1");

})
test("writeCSV", async ()=> {
    const table = new Table([["5","1","6"],["2","4"],["6","5"]]);
    await writeCSV(table,"tests/data.csv")
    const data:Table= await readCSV("tests/data.csv")
    //expect(data.toString()).toBe("A,B,C;1,2,undefined;5,1,6;2,4,undefined;6,5,undefined");
    expect(data.getText(1, 2)).toBe("1");

    
    })