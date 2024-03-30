import cars from "./car.js";

const carsCardContainer = document.getElementById("cars-card-container");
const filterItems = document.querySelectorAll(".filter-item");
const carNameInput = document.getElementById("car-name-input");
const searchButton = document.getElementById("search-button");

// Filter by size
filterItems.forEach((item) => {
    item.addEventListener("click", function () {
        const selectedSize = this.textContent.trim();
        filterCars(selectedSize);
    });
});

async function filterCars(selectedSize) {
    let filteredCars = [];

    if (selectedSize == "All") {
        let fetchCars = await cars.getCarsData();
        filteredCars = fetchCars;
    } else {
        filteredCars = await cars.getCarsDataFilteredBySize(selectedSize);
    }

    carsCardContainer.innerHTML = "";

    if (filteredCars.data.length > 0) {
        filteredCars.data.forEach((car) => {
            const node = document.createElement("div");
            node.innerHTML = cars.render(car);
            carsCardContainer.appendChild(node);
        });
    } else {
        const node = document.createElement("div");
        node.innerHTML = cars.renderCarNotFound(selectedSize);
        carsCardContainer.appendChild(node);
    }
}

// Get all cars
async function getAllCarsData() {
    let fetchCars = await cars.getCarsData();

    carsCardContainer.innerHTML = "";

    fetchCars.data.forEach((car) => {
        const node = document.createElement("div");
        node.innerHTML = cars.render(car);
        carsCardContainer.appendChild(node);
    });
    console.log("🚀 ~ fetchCars.data.forEach ~ fetchCars:", fetchCars);
}

// Search car by name
searchButton.addEventListener("click", async () => {
    const name = carNameInput.value;

    carsCardContainer.innerHTML = "";

    let fetchFilteredCars = await cars.getCarsDataFilteredByName(name);
    console.log("🚀 ~ searchButton.addEventListener ~ fetchFilteredCars:", fetchFilteredCars);

    if (fetchFilteredCars.data === null) {
        const node = document.createElement("div");
        node.innerHTML = cars.renderCarNotFound(name);
        carsCardContainer.appendChild(node);
    } else {
        fetchFilteredCars.data.forEach((car) => {
            const node = document.createElement("div");
            node.innerHTML = cars.render(car);
            carsCardContainer.appendChild(node);
        });
    }
});

// Create car
// async function createCarData() {
//     const name = document.getElementById("name");
//     const plate = document.getElementById("plate");
//     const model = document.getElementById("model");
//     const image = document.getElementById("image");
//     const price = document.getElementById("price");
//     const year = document.getElementById("year");
//     const available = document.getElementById("available");
//     const manufacture = document.getElementById("manufacture");
//     const type = document.getElementById("type");
//     const size = document.getElementById("size");
//     const transmission = document.getElementById("transmission");

//     const createCar = await cars.createCar(
//         name,
//         plate,
//         model,
//         image,
//         price,
//         year,
//         available,
//         manufacture,
//         type,
//         size,
//         transmission
//     );
// }

getAllCarsData();
