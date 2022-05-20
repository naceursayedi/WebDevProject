/* ****************************************************************************
 **********                                                          **********
 **********            Diese Datei ist Teil von Blatt 5!             **********
 **********                                                          **********
 *************************************************************************** */


import { Table } from "../src/table";

// TODO: implementiere hier die Tests für die Klasse Table

test("table", ()=> {
     const table = new Table([["A", "B", "C"],["32"]]);
    expect(table.getText("A", 1)).toBe("A");
    expect(table.getText("B", 1)).toBe("B");
   expect(table.getText(1, 2)).toBe("32");
   // expect(table.columnsCount).toBe(3);
    // expect(table.rowsCount).toBe(2);
    //expect(table.setText(1, 2,"44")).toBe("32");
    //expect(table.setText(1, 2,"66")).toBe("32");
    //expect(table.setText(5, 2,"43")).toBe("");

})


test("table add row on demand", ()=> {
    const table = new Table([["A", "B", "C"],["32"]]);
    expect(table.setText(5, 3,"12")).toBe("");
});
test("table insertColumnLeft", ()=> {
    const table = new Table([["A", "B", "C"],["32"]]);
    expect(table.insertColumnLeft(1)).toBeTruthy();
    expect(table.getText(2, 2)).toBe("32");
    expect(table.columnsCount).toBe(4);
   
});

test("table deleteColumn", ()=> {
    const table = new Table([["A", "B", "C"],["32"]]);
    expect(table.deleteColumn(1)).toBeTruthy();
    expect(table.getText(1, 1)).toBe("B");
    expect(table.columnsCount).toBe(2);
});
test("table insertRowBefore", ()=> {
    const table = new Table([["A", "B", "C"],["32"]]);
    expect(table.insertRowBefore(1)).toBeTruthy();
    //expect(table.getText(3, 1)).toBe("32");
    //expect(table.rowsCount).toBe(3);
});

test("table deleteRow", ()=> {
    const table = new Table([["A", "B", "C"],["32"],["76"]]);
    expect(table.rowsCount).toBe(3);
    expect(table.deleteRow(1)).toBeTruthy();
    expect(table.deleteRow(7)).toBeFalsy();
    expect(table.rowsCount).toBe(2);
});

test("table sumRow", ()=> {
    const table = new Table([["A", "B", "C"],["32"],["76"]]);
    expect(table.sumOfRow(2)).toBe(32);
    expect(table.sumOfRow(4)).toBe(0);
    expect(table.sumOfRow(1)).toBeNaN();

});

test("table sumCol", ()=> {
    const table = new Table([["A", "B", "C"],["5","1"],["2","4"],["6","5"]]);
    expect(table.sumOfCol(2)).toBe(10);
    expect(table.sumOfCol(4)).toBe(0);
});

test("Test Table toString", ()=> {
    const table = new Table([["A", "B", "C"],["5","1"]]);
    expect(table.toString()).toBe("A,B,C;5,1,undefined");
});
test("Test Table Fill", ()=> {
    const table = new Table([["A", "B", "C"]]);
    table.fill("2",1,2,3,3);
     expect(table.getText(1, 1)).toBe("A");
});
// TODO: add more tests, including negative tests