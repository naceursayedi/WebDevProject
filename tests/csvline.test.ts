/* ****************************************************************************
 **********                                                          **********
 **********            Diese Datei ist Teil von Blatt 4!             **********
 **********                                                          **********
 *************************************************************************** */

 import { splitCSVLine } from "../src/csvline";

 // TODO: fix this test by implementing ../src/csvline.ts
 test.each([
   // vgl. [RFC4180] 2.4
   ["Unescaped values", 'aaa,bbb,ccc', [ 'aaa', 'bbb', 'ccc']],
   // vgl. [RFC4180] 2.5
   ["Escaped values", '"aaa","bbb","ccc"', [ 'aaa', 'bbb', 'ccc']],
   // vgl. [RFC4180] 2.7
   ["2 DQuotes in escaped value", '"aaa","b""bb","ccc"', [ 'aaa', 'b"bb', 'ccc']],
   // vgl. [RFC4180] 2.6
   ["CR/LF in escaped val", '"aaa","b\r\nbb","ccc"', [ 'aaa', 'b\r\nbb', 'ccc']],
   // not in [RFC4180] but convenient
   ["empty value", 'aaa,,ccc', [ 'aaa', '', 'ccc']], 
   // not in [RFC4180] but convenient
   ["empty 4 values", ',,,,ccc', [ '', '', '','', 'ccc']], 
   // not in [RFC4180] but convenient
   ["trim values", 'aaa , bbb , ccc', [ 'aaa', 'bbb', 'ccc']], 
   // not in [RFC4180] but convenient
   ["trim values escaped", '"aaa" , "bbb" , "ccc"', [ 'aaa', 'bbb', 'ccc']], 

 ])('splitCSVLine, %s', (_name: string, line: string, expectedValues: string[]) => {
     const values = splitCSVLine(line);
     expect(values).toEqual(expectedValues);
 });
 
 // TODO: add more tests, including negative tests
 