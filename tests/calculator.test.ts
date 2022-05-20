/* ****************************************************************************
 **********                                                          **********
 **********            Diese Datei ist Teil von Blatt 4!             **********
 **********                                                          **********
 *************************************************************************** */

 import { Calculator } from "../src/calculator";

test("42", () => {
    const testee = new Calculator();
    expect(testee.calc("42")).toBe(42);
});



// TODO: add tests
test("add", () => {
    const testee = new Calculator();
    testee.addOperation("add",(x,y) => x+y)
    expect(testee.calc("add(21,21)")).toBe(42);
});

test("mul", () => {
    const testee = new Calculator();
    testee.addOperation("mul",(x,y) => x*y)
    expect(testee.calc("mul(5,5)")).toBe(25);
});
test("sub", () => {
    const testee = new Calculator();
    testee.addOperation("sub",(x,y) => x-y)
    expect(testee.calc("sub(21,1)")).toBe(20);
});
test("div", () => {
    const testee = new Calculator();
    testee.addOperation("div",(x,y) => x/y)
    expect(testee.calc("div(20,5)")).toBe(4);
});
test("divImpossible", () => {
    const testee = new Calculator();
    testee.addOperation("div",(x,y) => x/y)
    expect(testee.calc("div(20,0)")).toBe(Infinity);
});
test("opartions", () => {
    const testee = new Calculator();
    testee.addOperation("mul",(x,y) => x*y)
    testee.addOperation("add",(x,y) => x+y)
    testee.addOperation("sub",(x,y) => x-y)
    expect(testee.calc("mul(2,add(22,sub(50,30)))")).toBe(84);
});
// TODO: add also some negative tests
test("empty", ()=>{
    const testee = new Calculator();
    expect(()=>testee.calc("")).toThrowError();
    });
test("Unexpected operators", ()=>{
    const testee = new Calculator();
    testee.addOperation("mul",(x,y) => x*y)
    testee.addOperation("add",(x,y) => x+y)
    testee.addOperation("sub",(x,y) => x-y)
    expect(()=>testee.calc("-2+3*4")).toThrowError();
    });
test("only string", ()=>{
    const testee = new Calculator();
    testee.addOperation("mul",(x,y) => x*y)
    testee.addOperation("add",(x,y) => x+y)
    testee.addOperation("sub",(x,y) => x-y)
    expect(()=>testee.calc("mul(two,add(twenty,sub(five,three)))")).toThrowError();
    });
test("without parenthese", ()=>{
    const testee = new Calculator();
    testee.addOperation("sub",(x,y) => x-y)
    expect(()=>testee.calc("sub 50,30 ")).toThrowError();
    });
test("without Comma", ()=>{
    const testee = new Calculator();
    testee.addOperation("mul",(x,y) => x*y)
    expect(()=>testee.calc("mul(5;5)")).toThrowError();
    });