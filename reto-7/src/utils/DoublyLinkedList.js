// Nodo para almacenar una página en la lista doblemente enlazada
class Node{
    constructor(page){
        this.page = page;      
        this.next = null;       
        this.previous = null;   
    }
}

// Lista doblemente enlazada para simular el historial de navegación
class DoublyLinkedList{
    constructor(){
        this.head = null;      
        this.tail = null;      
        this.length = 0;       
        this.current = null;
    }

    // Añadir una nueva página al final del historial
    append(page){
        const newPage = new Node(page);
        // Si la lista está vacía
        if(!this.head){
            this.head = newPage;
            this.tail = newPage;
            return;
        }

        // Conectar el nuevo nodo al final de la lista
        this.tail.next = newPage;
        newPage.previous = this.tail;
        this.tail = newPage;
        
        this.length++;
    }

    // Avanzar a la siguiente página (botón "Adelante" del navegador)
    next(){
        // Verificar si la lista está vacía o no hay página actual
        if (!this.head || !this.current) {
            return { page: null, canGoForward: false, canGoBack: false };
          }

        // Si hay una página siguiente, avanzar a ella
        if (this.current.next) {
            this.current = this.current.next;
            return { 
              page: this.current.page, 
              canGoForward: this.current.next !== null,
              canGoBack: true 
            };
        } else {
            // Ya estamos en la página más reciente
            return { 
              page: this.current.page,
              canGoForward: false,
              canGoBack: this.current.previous !== null 
            };
        }
    }

    // Retroceder a la página anterior (botón "Atrás" del navegador)
    previous(){
        // Verificar si la lista está vacía o no hay página actual
        if(!this.head || !this.current){
            return{page:null, canGoForward:false,canGoBack:false};
        }

        // Si hay una página anterior, retroceder a ella
        if(this.current.previous){
            this.current = this.current.previous;
            return{
                page: this.current.page,
                canGoForward:true,
                canGoBack:this.current.previous !== null
            };   
        } else{
            // Página más antigua
            return{
                page:this.current.page, 
                canGoForward:this.current.next !== null,
                canGoBack:false
            };
        }
    }

    // Obtener la página actual
    getCurrentPage(){
        return this.current ? this.current.page : null; 
    }

    // Verifica si es posible retroceder a una página anterior
    canGoBack(){
        return this.current && this.current.previous !== null;
    }

    // Verifica si es posible avanzar a una página siguiente
    canGoForward(){
        return this.current && this.current.next !== null;
    }
}

export{Node}
export default DoublyLinkedList;