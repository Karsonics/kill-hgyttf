import * as prompt from "prompt";

let itemsInCart: Array<string> = [
    "apple","bomb","mango"
]

let priceByItem: Record<string, number> = {
    "apple": 1,
    "bomb": 30.1
};

class Product {
    private name: string;
    private price: number;

    constructor(name: string) {
        this.name = name;
        this.price = 100;

    }

    print(){
        console.log(`name: ${this.name} price: ${this.price}`);

    }


}
let apple = new Product("apple");
let bomb = new Product("bomb")
apple.print();
bomb.print();

const main = async () => {

    while (true) {
        prompt.start()
        let name: any = await prompt.get(["name","last_name", "age"])
        console.log("name: " + name.name)
        console.log("last_name: " + name.last_name)
        console.log("age: " + name.age)

        console.log("Hello World!");
        let result: any = await prompt.get(["continue"]);
        if (result.continue != "y"){
            break;
        }
        if("777" == 777){
            console.log("works first")
        }
        if("777" === 777){
            console.log("works last")
        }

    }



}
main()


