window.addEventListener("load", () => {
    let service = new CarService("Car serivce");
    const forms = document.querySelector("#form");
    const remove = document.querySelector("#form_remove");

    remove.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(remove);
        console.log(formData.get("model"));
        service.removeCar(formData.get("model"));

    })

    forms.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(forms);

        const car = new Car(formData.get("year"), formData.get("brand"), formData.get("model"), formData.get("km"));
        console.log(car);
        service.addCar(car);
    })


})


class Car {
    static staticId = -1;

    constructor(year, brand, model, km) {
        this.year = year;
        this.brand = brand;
        this.model = model;
        this.km = km;
        this.id = Car.staticId + 1;
        Car.staticId++;
    }
}

class CarService {
    constructor(name) {
        this.carArray = [];
        this.name = name;
    }

    addCar(year, brand, model, km) {
        const car = new Car(year, brand, model, km);
        this.addCar(car);
    }

    addCar(car) {
        this.carArray.push(car);
        this.showCars()
    }

    removeCar(model) {
        let index_catch;
        this.carArray.forEach((car, index) => {
            if (car.model == model) {
                index_catch = index;
            }
        })
        this.carArray.slice(index_catch);
        this.showCars();
    }

    showCars() {
        this.clearCars();
        this.carArray.forEach((car, index) => {
            this.createCard(car);
        })
    }

    clearCars() {
        const place = document.querySelector("#cars");
        place.innerHTML = null;
    }

    createCard(car) {
        const card_div = document.createElement("div");
        card_div.className = "card";
        card_div.style = "width: 10rem;";
        const card_body = document.createElement("div");
        const car_model = document.createElement("h5");
        car_model.className = "card-title";
        car_model.innerHTML = car.model;
        const car_brand = document.createElement("h6");
        car_brand.className = "card-subtittle";
        car_brand.innerHTML = car.brand;
        const km = document.createElement("p");
        km.className = "card-text";
        km.innerHTML = car.km
        const year = document.createElement("p");
        year.className = "card-text";
        year.innerHTML = car.year;

        const place = document.querySelector("#cars");

        card_div.appendChild(card_body);
        card_div.appendChild(car_model);
        card_div.appendChild(car_brand);
        card_div.appendChild(km);
        card_div.appendChild(year);

        place.appendChild(card_div);
    }
}

function showForm() {
    const form = document.querySelector("#forms");
    form.style.display = "block";
}

function hideForm(object) {
    const form = document.querySelector("#" + object);
    form.style.display = "none";
}

function showRemove() {
    const form = document.querySelector("#remove");
    form.style.display = "block";
}

