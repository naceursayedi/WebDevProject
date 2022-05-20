/* ****************************************************************************
 **********                                                          **********
 **********            Diese Datei ist Teil von Blatt 4!             **********
 **********                                                          **********
 *************************************************************************** */

/**
 * Erweiterbarer Rechner mit Syntax im Funktionsstil. Alle Operatoren müssen
 * aus Kleinbuchstaben bestehen, die Operatoren folgen in Klammern mit Komma
 * getrennt.
 * Alle Operatoren müssen exakt 2 Operanden akzeptieren.
 * 
 * Operationen können über addOperation hinzugefügt werden.
 * 
 * ****************************************************************************
 * Beachte: Diese Datei sollte nicht bearbeitet werden!
 * ****************************************************************************
 */
export class Calculator {

    private operations: Map<string, (op1: number, op2: number) => number>;

    constructor() {
        this.operations = new Map();
    }

    /**
     * Fügt eine neue Operation hinzu.
     */
    addOperation(name: string, operation: (op1: number, op2: number) => number) {
        this.operations.set(name, operation);
    }

    /**
     * Wertet den gegebenen Ausdruck aus.
     */
    calc(expression: string): number {

        let pos = 0;

        const isLetter = (c: string) => c >= 'a' && c <= 'z';
        const isDigit = (c: string) => c >= '0' && c <= '9';
        const isSymbol = (c: string) => "(),".indexOf(c) >= 0;

        const typeRecognizers = [isLetter, isDigit, isSymbol];

        const nextToken = () => {
            while (pos < expression.length && expression[pos] == " ") pos++;
            if (pos >= expression.length) {
                return "";
            }
            for (const recognize of typeRecognizers) {
                if (recognize(expression[pos])) {
                    let token = "";
                    do {
                        token += expression[pos];
                        pos++;
                    } while (pos < expression.length && recognize(expression[pos]) && recognize !== isSymbol)
                    return token;
                }
            }
            throw new Error("Error at " + pos + ", '" + expression[pos] + "' not recognized.");
        }

        const evalToken = (token: string) => {
            if (isDigit(token[0])) {
                return parseInt(token);
            }
            if (!isLetter(token[0])) {
                throw new Error("Error at " + pos + ", operand expected, was " + token);
            }
            const op = this.operations.get(token);
            if (!op) {
                throw new Error("Error at " + pos + ", operation " + op + " no found");
            }
            if (nextToken() != "(") {
                throw new Error("Error at " + pos + ", expect '(', was " + token);
            }

            const operands: number[] = [];
            do {
                token = nextToken();

                if (isLetter(token[0]) || isDigit(token[0])) {
                    operands.push(evalToken(token));
                    token = nextToken();
                } else if (token != ")") {
                    throw new Error("Error at " + pos + ", expect operand or ')', was " + token);
                }

                if (token != ")" && token != ",") {
                    throw new Error("Error at " + pos + ", expect ')' or ',', was " + token);
                }

            } while (token == ",")
            if (operands.length != 2) { // maybe you can get rid of that restriction later on
                throw new Error("Error at " + pos + ", need exactly two operands, got " + operands.length);
            }
            return op(operands[0], operands[1]);
        }

        const result = evalToken(nextToken());
        while (pos < expression.length && expression[pos] == " ") pos++;
        if (pos < expression.length) {
            throw new Error("Error at " + pos + ", superfluous characters found");
        }
        return result;
    }

}