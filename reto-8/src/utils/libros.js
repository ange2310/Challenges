class Libro {
    constructor(nombre, isbn, autor, editorial) {
        this.nombre = nombre;
        this.isbn = isbn;
        this.autor = autor;
        this.editorial = editorial;
    }
}

class Stack {
    constructor() {
        this.items = [];
    }

    push(Libro) {
        this.items.push(Libro);
    }
    
    pop() {
        return this.items.length > 0 ? this.items.pop() : null;
    }

    peek() {
        return this.items.length > 0 ? this.items[this.items.length - 1] : null;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    print() {
        this.items.slice().reverse().forEach(item => {
            console.log(item);
        });
    }
    
    getItems() {
        return [...this.items]; // Devuelve una copia para evitar modificaciones externas
    }
}

// Crear una instancia del Stack y exportarla
const stackInstance = new Stack();
// Agregar un libro inicial
stackInstance.push(new Libro("Cien años de soledad", "1234567", "Gabriel García Márquez", "Panamericana"));

// Exportar correctamente las clases y la instancia
export { Libro };
export { stackInstance as Stack };