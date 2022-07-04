class AEstrella{
   

    constructor(ini,fin,obstaculos, wayPoint, tamTableroX, tamTableroY){
        this.tamTableroFila=tamTableroX;
        this.tamTableroCol=tamTableroY;

        this.matriz = new Array();
        this.arraySoluciones = new Array();//para guardar los diferentes caminos entre wayPoints
        this.abierta=new PriorityQueue(comparator);
        this.cerrada=new Array();
        wayPoint.push(fin);//Meto ini como el ultimo
        this.wayPoint=wayPoint;//Cordenada
        this.ini=ini;
        this.fin=ini;//Cordenada
        this.obstaculos=obstaculos//Array cordenadas
    }


    iniciar(){
        // inicializamos la matriz
        this.matriz = new Array(this.tamTableroFila);
        for(let i = 0; i < this.tamTableroFila; i++){
            this.matriz[i] = new Array(this.tamTableroCol);
        }

        //rellenamos la matriz
        for(let i = 0; i < this.tamTableroFila; i++){
            for(let j = 0; j < this.tamTableroCol;j++){
                this.matriz[i][j] = "vacio";
            }
        }

        //colocamos los obstaculos
        for(let i = 0; i < this.obstaculos.length; i++){
            this.matriz[this.obstaculos[i].numFila][this.obstaculos[i].numCol] = "obstaculo";
        }
    }

    loopWayPoint(){
        //bucle way point

        //Reseteamos las listas y array
        this.abierta=new PriorityQueue(comparator);
        this.cerrada=new Array();

        this.iniciar();
        
        this.ini= this.fin;//ini ahora es fin
        this.fin = this.wayPoint.shift(); //fin es el sigueinte way point
        this.ini.setFin(this.fin.numFila, this.fin.numCol);// Colocamos el nuevo fin para la distancia

        //colocamos el ini en la matriz
        this.matriz[this.ini.numFila][this.ini.numCol] = "ini";
        //colocamos el fin en la matriz
        this.matriz[this.fin.numFila][this.fin.numCol] = "fin";
    }

    arraySolucion(){
        let arraySol = new Array();
        let coor = this.fin.getAnterior();
        if(coor != null){
            while(coor.numFila != this.ini.numFila || coor.numCol != this.ini.numCol){
                arraySol.push(coor);
                coor = coor.getAnterior();
            }
        }
        return arraySol;
    }

    algoritmo(){
        while(this.wayPoint.length != 0){
            this.loopWayPoint();//Se resetea para volver a colocar ini y fin segun los wayPoint

            let terminado=false;
            let puntoInicial = new Cordenada(this.ini.numFila, this.ini.numCol, this.fin.numFila, this.fin.numCol, 0);
            this.abierta.push(puntoInicial);

            while(!terminado && !this.abierta.isEmpty()){
                let actual = this.abierta.pop();
                this.cerrada.push(actual);

                //bucle para recorre las casillas adyacentes a la actual
                for(let i = -1; i < 2 && !terminado; i++){
                    for(let j = -1; j < 2 && !terminado; j++){
                        let filaActual = parseInt(actual.numFila) + i;
                        let colActual = parseInt(actual.numCol) + j;

                        if(i != 0 || j != 0){ //que no mire la actual
                            //comprobar que no se salga del tablero
                            if(-1 < filaActual && filaActual < this.tamTableroFila && -1 < colActual && colActual < this.tamTableroCol ){

                                // comprobamos que no sea obstaculo ni el inicio y que no sea el nodo padre y que no este en cerrada
                                if(this.matriz[filaActual][colActual] != "obstaculo" && this.matriz[filaActual][colActual] != "ini" && 
                                    !actual.comprobarAnterior(filaActual, colActual) && !this.estaCerrada(filaActual, colActual)
                                        && this.matriz[filaActual][colActual] != "abierta"){

                                    //calculamos la distancia euclidea de actual hasta la nueva
                                    let x = Math.pow(filaActual - i -filaActual, 2)
                                    let y = Math.pow((colActual - j) - colActual , 2);
                                    let distancia = Math.sqrt(x + y); //hay que hacer las operaciones por separado

                                    // hemos llegado al final?
                                    if(this.matriz[filaActual][colActual] == "fin"){
                                        terminado = true;
                                        this.fin = new Cordenada(filaActual, colActual, fin.numFila, fin.numCol, actual.distanciaAct + distancia);
                                        this.fin.setAnterior(actual);
                                        this.arraySoluciones.push(this.arraySolucion());
                                    }
                                    //seguimos
                                    else{

                                        let nueva = new Cordenada(filaActual, colActual, this.fin.numFila, this.fin.numCol, actual.distanciaAct + distancia);
                                        nueva.setAnterior(actual); 
                                        this.abierta.push(nueva);
                                        this.matriz[filaActual][colActual] = "abierta";
                                        //this.cerrada.push(actual);
                                    }

                                }
                            }
                        }

                    } // for2
                } 
            } //while

            if(!terminado){
                console.log("no hay sol");
            }
        }

    }

    comparator(a, b){
        return a.distanciaAct + a.distancia < b.distanciaAct + b.distancia;
    }

    returnArraySoluciones(){
        return this.arraySoluciones;
    }

    estaCerrada(fila, col){
        //comprobamos que la coordenada no este cerrada
        let esta = false;
        for(let i = 0; i < this.cerrada.length && !esta; i++){
            if(this.cerrada[i].numFila == fila && this.cerrada[i].numCol == col){
                esta = true;
            }
        }
    }

}