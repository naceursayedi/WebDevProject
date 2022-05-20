/* ****************************************************************************
 **********                                                          **********
 **********            Diese Datei ist Teil von Blatt 4!             **********
 **********                                                          **********
 *************************************************************************** */

 /**
  * Zerlegt eine Zeile mit Komma separierten Werten und gibt die Werte als Array zurück. 
  * 
  * @param line Zeile mit Komma separierten Werten
  * @returns Werte als Array
  */
export function splitCSVLine(line: string): string[] {

  const values: string[] = [];

  // TODO: write your code here
  let start ="vor einer Value"
  let i=0;
  values[i]='';
  for(const c of line){

    switch(start){

      // 1 Fall 
      case 'vor einer Value':
        switch(c){
          case '"' : start="Unescaped"; break;
          case ',' : i++;values[i]=''; break;
          case ' ' :  break;
          default  : values[i]+=c; start="Unescaped";break;
        }
      break;

      // 2 Fall 
      case 'Unescaped': 
        switch(c){
          case ',' : i++; values[i]='';  start="vor einer Value"; break;
          case ' ' :  break;
          default  : values[i]+=c; start="vor einer Value";break;
        }
      break;
      
      
    }
  }
  return values;

}