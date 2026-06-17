let idUser = 1

class User{
    constructor(name, email, password){ /*Creacion de objetos */
       this.id = idUser++; 
       this.name = name;
       this.email = email;
       this.password = password; 
       
    }
}

/*Vector de objetos de la clase User. */
let users = [
    new User("Guadalupe", "guada@gmail.com", "guada1234"),
    new User("Delfina", "delfina@gmail.com", "delfina0605"),
    new User("Agustin", "a", "a"),
    new User("Victoria", "vjimenez@gmail.com", "victoria0123"),
    new User("Candela", "clangan@gmail.com", "candeprocrack0010"),
];