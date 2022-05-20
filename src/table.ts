/* ****************************************************************************
 **********                                                          **********
 **********            Diese Datei ist Teil von Blatt 5!             **********
 **********                                                          **********
 *************************************************************************** */

/**
 * Eine einfache, automatisch wachsende Tabelle mit Strings.
 * 
 * Begriffe:
 * - Spalte (Column): vertikal angeordnete Zellen
 * - Zeile (Row): horizontal angeordnete Zellen
 * - Zelle (Cell): ein Feld mit einem Wert (Value)
 * 
 * Eine Zelle ist eindeutig über Spalten- und Zeilennummer bestimmt. Die Indizes sind beginnen bei 1!
 * 
 * Nach außen sieht die Tabelle immer komplett gefüllt aus. Intern werden nur bei Bedarf
 * echte Zellen erzeugt.
 * 
 * @author Jens von Pilgrim
 */
export class Table extends Object {

    private _columnsCount = 0;
    private rows: string[][] = [];

    /**
     * Erzeugt eine Tabelle.
     * Spalten und Zeilen werden beim Setzen von Text automatisch erzeugt. 
     * 
     * @param values Initiale Werte (äußeres Array enthält die Zeilen)
     */
    constructor(values?: string[][]) {
        super();
        if(values == undefined ){
            this._columnsCount = 0;
        }else{
           this.rows = values;
        }
        
    }

    /**
     * Der Spaltenindex kann als Zahl oder als Buchstaben eingeben werden.
     * Die Buchstaben beginnen bei a,bis z, dann aa bis zz, usw. Groß-/Kleinschreibung wird ignoriert.
     * 
     * Diese Methode wird intern von vielen Methoden verwendet, um die Spaltenangabe in eine Zahl umzuwandeln.
     * 
     * @param col Spaltenindex als Zahl oder String.
     * @returns Den Spaltenindex als Zahl, beginnend bei 1.
     */
    static columnIndexAsNumber(col: string | number): number {
        let index='';
        if(typeof col ==="string"){
            col = col.toUpperCase();
            //console.log(col);
            for (let i = 0; i < col.length; i++) {
            const ascii:number = ((col.charCodeAt(i))-64); 
                index+=ascii.toString();
            }
            const y: number = +index;
            return y;
        }else{
          return col;
        }
    }

    /**
     * Gibt den Text in gegebener Spalte und Zeile zurück.
     * Falls die Zeile oder Spalte nicht existiert, wird ein leerer String zurückgegeben.
     * 
     * @param col Spaltenindex, 1-basiert oder beginnend bei 'a'
     * @param row Zeilenindex, beginnend bei 1
     * @return der Text, evtl. leer aber nie null oder undefined
     */
    getText(col: number | string, row: number): string {
        let s="";

        s = this.rows[row-1][Table.columnIndexAsNumber(col)-1]

        return s;
    }

    /**
     * Setzt den Text in der Zelle mit gegebener Spalte und Zeile.
     * 
     * Falls col gleich oder größer der aktuellen Spaltenzahl ist, werden entsprechend leere Spalten angefügt.
     * Falls row gleich oder größer der aktuellen Zeilenzahl ist, werden entsprechend leere Zeilen angefügt.
     * 
     * @param col Spaltenindex, 1-basiert oder beginnend bei 'a'
     * @param row  Zeilenindex, 1-basiert
     * @param text der zu setzende Text
     * @return Der Text, der vorher in der Zelle war (evtl. "", aber nie undefined)
     */
    setText(col: number | string, row: number, text: string): string {

    const x:number|string="";
    if(Table.columnIndexAsNumber(col) > this.columnsCount || row > this.rowsCount){
        if(this.rows[row-1]===undefined){this.rows[row-1]=[]}
        this.rows[row-1][Table.columnIndexAsNumber(col)-1]=text;
                for(let i=0;i<this.rowsCount;i++){
                        for(let j=0;j<this.columnsCount;j++){
                            if(this.rows[i][j]=== undefined){
                                this.rows[i][j]=""
                            } 
                        }
                }
            return x;
    }else{
            return(this.rows[row-1][Table.columnIndexAsNumber(col)-1])
            this.rows[row-1][Table.columnIndexAsNumber(col)-1]=text;

        }

        
    }

    /**
     * Fügt eine Spalte links von der angegebenen Stelle ein
     * und verschiebt die anderen Spalten nach rechts. D.h. danach
     * ist die neue Spalte gerade an dem gegebenen Spaltenindex.
     * 
     * Falls der Spaltenindex größer-gleich als die aktuelle Anzahl an Spalten ist,
     * wird nichts verändert.
     * 
     * @param col Spaltenindex, an der neue Spalte eingefügt werden soll.
     * @return true, wenn tatsächlich eine Spalte eingefügt wurde.
     */
    insertColumnLeft(col: number | string): boolean {
        if(!(Table.columnIndexAsNumber(col)>= this.columnsCount)){
            for(let i=0;i<this.rowsCount;i++){
                
                    this.rows[i].splice(Table.columnIndexAsNumber(col)-1, 0, '');        
            }
        
        return true;
        }else{
            return false;
        }
    }

    /**
     * Löscht die angegebene Spalte, verschiebt also alle Spalten rechts davon eins nach links.
     * 
     * Falls der Spaltenindex größer-gleich der aktuellen Anzahl an Spalten ist,
     * wird nichts verändert.
     * 
     * @param col Spaltenindex der zu löschenden Spalte
     * @returns true, wenn tatsächlich etwas verändert wurde
     */
    deleteColumn(col: number | string): boolean {
        if(!(Table.columnIndexAsNumber(col)>= this.columnsCount)){
            for(let i=0;i<this.rowsCount;i++){
                
                    this.rows[i].splice(Table.columnIndexAsNumber(col)-1, 1);        
            }
        
        return true;
        }else{
            return false;
        }
    }

    /**
     * Fügt eine Zeile oberhalb von der angegebenen Zeile ein
     * und verschiebt die anderen Zeilen nach unten. D.h. danach
     * ist die neue Zeile  gerade an dem gegebenen Zeilenindex.
     * 
     * Falls der Zeilenindex größer-gleich als die aktuelle Anzahl an Zeilen ist,
     * wird nichts verändert.
     * 
     * @param row Zeilenindex, an der neue Zeile eingefügt werden soll.
     * @return true, wenn tatsächlich eine Zeile eingefügt wurde.
     */
    insertRowBefore(row: number): boolean {
        if(!(row>= this.rowsCount)){
          
                
                    this.rows.splice(row-1, 0,[]);        
          
        
        return true;
        }else{
            return false;
        }
    }

    /**
     * Löscht die angegebene Spalte, verschiebt also alle Spalten rechts davon eins nach links.
     * 
     * Falls der Spaltenindex größer-gleich der aktuellen Anzahl an Spalten ist,
     * wird nichts verändert.
     * 
     * @param row Spaltenindex der zu löschenden Spalte
     * @returns true, wenn tatsächlich etwas verändert wurde
     */
    deleteRow(row: number): boolean {
        if(!(row>= this.rowsCount)){

            this.rows.splice(row-1, 1);        
  
        return true;
        }else{
            return false;
       }  
    }

    /**
     * Summiert alle Werte einer Zeile. Die einzelnen Werte werden in Zahlen umgewandelt (mittels parseInt).
     * 
     * @param row Die Zeile, deren Inhalte summiert werden sollen
     * @returns die Summe, ggf. 0 falls die Zeile nicht existiert
     */
    sumOfRow(row: number): number {
        if(!(row>= this.rowsCount))
            {
                let sum=0;
                for(let i=0;i<this.columnsCount;i++){
                    if(this.rows[row-1][i]!==undefined){
                    sum=+(parseInt(this.rows[row-1][i]))
                    }
                }
                return sum;
            }
        else
            {return 0;}
    }
    /**
     * Summiert alle Werte einer Reihe. Die einzelnen Werte werden in Zahlen umgewandelt (mittels parseInt).
     * 
     * @param col Die Reihe, deren Inhalte summiert werden sollen, als Zahl oder Buchstaben
     * @returns die Summe, ggf. 0 falls die Reihe nicht existiert
     */
    sumOfCol(col: number|string): number {
        const c:number=Table.columnIndexAsNumber(col);
        if(!(c>= this.columnsCount))
        {
                let sum=0;
                for(let i=1;i<this.rowsCount;i++){
                    if(this.rows[i][c-1]!==undefined){
                    sum=sum+(parseInt(this.rows[i][c-1]))
                    }
                }
                return sum;
            }
        else
            {return 0;}
    }

    /**
     * Setzt alle Zellen zwischen den angegebenen Spalten/Zeilen auf den angegebenen Wert.
     * 
     * @param text      Der zu setzende Text
     * @param colFrom   Spaltenindex (inklusive), ab dem Zellen gesetzt werden
     * @param rowFrom   Zeilenindex (inklusive), ab dem Zellen gesetzt werden
     * @param colTo     Spaltenindex (inklusive), bis zu dem Zellen gesetzt werden
     * @param rowTo     Zeilenindex (inklusive) , bis zu dem Zellen gesetzt werden
     */
    fill(text: string, colFrom: number | string, rowFrom: number, colTo: number | string, rowTo: number): void {
        
        const cF:number=Table.columnIndexAsNumber(colFrom);
        const cT:number=Table.columnIndexAsNumber(colTo);
        
        for(let i=rowFrom;i<rowTo;i++){
            for(let j=cF;j<cT;j++){
                this.setText(i,j,text)
              
                
            }
    }
    }

    /**
     * Gibt die Anzahl der Spalten zurück.
     */
    get columnsCount(): number {
        if (this.rows[0]) {
         return this.rows[0].length
        }
        return 0;
    }

    /**
     * Gibt die Anzahl der Zeilen der Tabelle zurück.
     */
    get rowsCount(): number {
        return this.rows.length
    }


    /**
     * Convenience (Bequemlichkeits-) Methode zur Anzeige der Tabelle im Debugger
     */
    override toString(): string {
       // eslint-disable-next-line @typescript-eslint/no-inferrable-types
       let s:string="";
       for(let i=0;i<this.rowsCount;i++){
        for(let j=0;j<this.columnsCount;j++){
           
            if(j==this.columnsCount-1){
                s=s+this.rows[i][j]
            }else{s=s+this.rows[i][j]+","}
        }
        if(i<this.rowsCount-1)
        {
            s=s+';'
        }
        }
        return s;
    }

    /**
     * Convenience Methode um Tests zu vereinfachen, gibt true zurück, wenn
     * die Tabelle die gleichen Inhalte hat wie das übergebene Array.
     * 
     * @param arr Array mit Vergleichswerten, das äußere Array enthält die Zeilen.
     *            In dem Array müssen zumindest alle Zeile existieren, auch wenn diese sparse sein können.
     */
    equalsArray(arr: string[][]): boolean {
        throw new TypeError("Method not implemented yet");
    }

}

