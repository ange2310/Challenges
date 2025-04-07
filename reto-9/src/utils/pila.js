
class Queue {
    constructor() {
      this.items = [];
    }
  
    enqueue(item) {
      this.items.push(item);
    }
  
    dequeue() {
      return this.items.length > 0 ? this.items.shift() : null;
    }
  
    peek() {
      return this.items.length > 0 ? this.items[0] : null;
    }
  
    size() {
      return this.items.length;
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    print() {
      this.items.forEach(item => {
        console.log(item);
      });
    }
  
    getAll() {
      return [...this.items]; // Devuelve una copia de los elementos
    }
  }
  
  export default Queue;