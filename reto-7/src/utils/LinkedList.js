class Node{
    constructor(song){
        this.song = song;
        this.next = null;
    }
}

class LinkedList{
    constructor(){
        this.head = null; //Primera canción o nodo de la lista
        this.tail = null; //Última canción o ultimo nodo de la lista
        this.length = 0; //Cantidad de canciones o nodos en la lista
        this.current = null; //canción actual
    }

    append(song){
        const newSong = new Node(song);
        if(!this.head){
            this.head = newSong;
        } else{
            this.tail.next = newSong;
        }
        this.tail = newSong;
        this.length++;
    }

    next(){
        console.log("Current antes de next:", this.current?.song?.title);

        //Verifica si la lista se encuentra vacía
        if(!this.head){
            return { song: null, end: true, message: "La lista está vacía" };
        }

        //Si current (canción actual) no está definido, se asigna la primera canción
        if(!this.current){
            this.current = this.head;
            return { song: this.current.song, end: false };
        }

        //Si la canción atual tiene una siguiente, se avanza a la siguiente canción
        if(this.current.next){
            this.current = this.current.next;
            return { song: this.current.song, end: false };
        } else{
            //Si no hay siguiente canción, se indica que no hay más canciones
            return { song: this.current.song, end: true, message: "No hay más canciones" };
        }
    }

    getCurrentSong(){
        return this.current ? this.current.song : null;
    }
}

export {Node}
export default LinkedList;