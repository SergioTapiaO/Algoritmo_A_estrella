class Cordenada{

    constructor(numFila,numCol, finalX, finalY, distanciaAct){
        this.numFila= parseInt(numFila);
        this.numCol=parseInt(numCol);
        this.anterior=null;
    
        // coordenadas de la casilla final para calcular d
        this.finalFila = parseInt(finalX);
        this.finalCol = parseInt(finalY);
        this.distancia = this.calcularDistancia(); //es la distancia al nodo meta
        this.distanciaAct = distanciaAct; //es la distancia al nodo actual
    }

    calcularDistancia(){
        let x =  Math.pow((this.finalFila - this.numFila), 2);
        let y = Math.pow((this.finalCol - this.numCol), 2);
        return Math.sqrt(x + y);
    }
    getCol(){
        return this.numCol;
    }

    getFila(){
        return this.numFila;
    }

    setFin(fil, col){
        this.finalFila = fil;
        this.finalCol = col;
    }

    getAnterior(){
        return this.anterior;
    }

    getDistanciaAct(){
        return this.distanciaAct;
    }

    setAnterior(anterior){
        this.anterior=anterior;
    }

    setDistanciaAct(distancia){
        this.distanciaAct = distancia;
    }

    comparator(a, b){
        return a.distanciaAct + a.distancia < b.distanciaAct + b.distancia;
    }

    comprobarAnterior(filaActual, colActual){
        //devuelve falso si no es el nodo padre
        if(this.anterior == null){ //si es null es que es el primero
            return false;
        }
        else if(this.anterior.numFila != filaActual || this.anterior.numCol != colActual){
            return false;
        }
        else{
            // cumple que la fila y la col actual son iguales que los de su anterior
            //y por tanto es su padre
            return true;
        }
    }
}