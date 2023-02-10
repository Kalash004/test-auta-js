window.addEventListener("load", () => {
    let service = new CarService("Car serivce");
    hideRemove();
    hideForm();
    service.loadCars();
    const forms = document.querySelector("#form");
    const remove = document.querySelector("#form_remove");

    remove.addEventListener("submit", (e) => {
        e.preventDefault();
        let submitter = e.submitter;
        if (submitter.id != "remover") {
            const formData = new FormData(remove);
            service.removeCar(formData.get("model"));
        }


    })

    forms.addEventListener("submit", (e) => {
        e.preventDefault();
        let submitter = e.submitter;
        if (submitter.id != "hidder") {
            const formData = new FormData(forms);
            const car = new Car(formData.get("year"), formData.get("brand"), formData.get("model"), formData.get("km"));
            console.log(car);
            service.addCar(car);
        }
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
    saveCars() {
        window.localStorage.setItem("cars", JSON.stringify(this.carArray));
    }

    loadCars() {    
        let tempcarArray = JSON.parse(window.localStorage.getItem("cars"));
        if (tempcarArray != null) {
            this.carArray = tempcarArray;
            this.showCars();
        }
    }

    removeCache() {
        window.localStorage.clear();
    }

    addCar(year, brand, model, km) {
        const car = new Car(year, brand, model, km);
        this.addCar(car);
    }

    addCar(car) {
        this.carArray.push(car);
        this.saveCars();
        this.showCars()
    }

    removeCar(model) {
        let index_catch;
        this.carArray.forEach((car, index) => {
            if (car.model == model) {
                index_catch = index;
            }
        })
        this.removeCar2(index_catch);
        this.showCars();
        this.saveCars();
    }
    
    removeCar2(index) {
        delete this.carArray[index];
    }

    showCars() {
        this.clearCars();
        this.carArray.forEach((car, index) => {
            if (car != null) {
                this.createCard(car);
            } else {
                this.removeCar2(index);
            }
        });
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
    let form = document.querySelector("#forms");
    hideRemove();
    form.style.display = "block";
}

function hideForm() {
    let form = document.querySelector("#forms");
    form.style.display = "none";
}

function hideRemove() {
    let form = document.querySelector("#remove");
    form.style.display = "none";
}

function showRemove() {
    let form = document.querySelector("#remove");
    hideForm();
    form.style.display = "block";
}

