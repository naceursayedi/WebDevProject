import { promises as fsPromises } from 'fs';
import { Table } from './table';

export async function readCSV(filename: string, delimiter = ","): Promise<Table> {
    try {
        const result = await fsPromises.readFile(filename, 'utf8');


        let col = 0; let row = 0; const value: string[][] = [[]];
        let state: "vor einer Value" | "lese Unescaped" = "vor einer Value";
        for (const c of result) {
            switch (state) {
                case "vor einer Value":
                    switch (c) {
                        case delimiter: col++;
                            break;
                        case '\n': row++; col = 0; value[row] = [];
                            break;
                        case '"': state = "lese Unescaped";
                            break;
                        default: value[row][col] = c;
                            state = "lese Unescaped"
                            break;
                    }
                    break;
                case "lese Unescaped":
                    switch (c) {
                        case delimiter: col++;
                            state = "vor einer Value";
                            break;
                        case '\n': row++; col = 0; value[row] = [];
                            state = "vor einer Value";
                            break;
                        default: value[row][col] += c;
                            break;
                    }
                    break;
            }
        }
        const table = new Table(value);
        return table;
    } catch (err) {
        throw Error("Datei laden failed : " + err)
    }

}

//Wrtite into a csv File

export async function writeCSV(table: Table, filename: string, delimiter = ","): Promise<void> {

    try {
        let s = "";
        for (let i = 1; i <= table.rowsCount; i++) {
            for (let j = 1; j <= table.columnsCount; j++) {
                
                if (j == table.columnsCount ) {
                    if(table.getText(j, i)===undefined){s=s}
                    else{s = s + table.getText(j, i)}
                } else {
                    if(table.getText(j, i)===undefined){s=s+ delimiter}
                    else{s = s + table.getText(j, i) + delimiter }
                }
            }
            if (i < table.rowsCount ) {
                s = s + '\n'
            }
        }
        

        await fsPromises.appendFile(filename, s, 'utf8');
    } catch (err) {
        throw Error("Datei laden failed : " + err)
    }

}


