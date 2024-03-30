const getCarsData = async () => {
    const response = await fetch("/api/cars");
    const result = await response.json();
    return result;
};

const getCarsDataFilteredByName = async (name) => {
    const response = await fetch(`/api/cars?name=${name}`);
    const result = await response.json();
    return result;
};

const getCarsDataFilteredBySize = async (size) => {
    const response = await fetch(`/api/cars?size=${size}`);
    const result = await response.json();
    return result;
};

const createCar = async () => {
    const response = await fetch("/api/cars", {
        method: "POST",
    });
    const result = await response.json();
    return result;
};

const render = (carData) => {
    const updatedAt = new Date(carData.updatedAt);
    const formattedDate = `${updatedAt.getDate()} ${updatedAt.toLocaleString("en-US", {
        month: "short",
    })} ${updatedAt.getFullYear()}, ${updatedAt.getHours().toString().padStart(2, "0")}.${updatedAt
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

    return `
                <div class="bg-white border border-gray-200 rounded-lg shadow">
                    <div class="h-56">
                        <img
                            class="w-full h-full object-cover rounded-t-xl"
                            src="${carData.image ? carData.image : "./images/car.png"}"
                            alt="Image Car"
                        />
                    </div>
                    <div class="flex flex-col gap-4 p-5">
                        <div class="flex flex-col">
                            <p class="text-slate-500">${carData.name} / ${carData.Type.name}</p>
                            <h5 class="font-bold text-lg">Rp ${carData.rentPerDay
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} / hari</h5>
                        </div>
                        <div class="flex items-center gap-2">
                            <img src="./images/fi_clock.png" alt="Clock" class="w-auto h-6" />
                            <span class="text-slate-500">Updated at ${formattedDate}</span>
                        </div>
                        <div class="flex gap-4">
                            <button
                                type="button"
                                id="delete-button"
                                class="bg-white border-2 border-red-600 text-red-600 font-medium rounded-lg text-sm px-5 py-2.5 w-full hover:bg-red-600 hover:text-white transition-all"
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                id="edit-button"
                                class="text-white bg-[#5CB85F] font-medium rounded-lg text-sm px-5 py-2.5 w-full hover:bg-[#4e9d50] transition-all"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
`;
};

const renderCarNotFound = (name) => {
    return `<div class="border text-lg rounded-lg p-4" role="alert">
    <span class="font-bold">Maaf</span>, mobil ${name} tidak tersedia!
  </div>`;
};

export default {
    getCarsData,
    getCarsDataFilteredByName,
    getCarsDataFilteredBySize,
    createCar,
    render,
    renderCarNotFound,
};
