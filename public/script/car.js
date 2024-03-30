const getCarsData = async () => {
    const response = await fetch("/api/cars");
    const result = await response.json();
    return result;
};

const getCarsDataFiltered = async (name, size) => {
    const response = await fetch(`/api/cars?name=${name}&size=${size}`);
    const result = await response.json();
    return result;
};

// const render = (carData) => {
//     return `
//     <div
//     class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
//     >
//     <div class="h-56">
//       <img
//         class="w-full h-full object-cover rounded-t-xl"
//         src=${carData.image}
//         alt="Image Car"
//       />
//   </div>
// <div class="flex flex-col gap-4 p-5">
//     <p class="font-medium">${carData.manufacture} / ${carData.type}</p>
//     <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//         Rp ${carData.rentPerDay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} / hari
//     </h5>
//     <p class="font-normal text-gray-700 dark:text-gray-400">
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//     </p>
//     <div class="flex flex-col gap-3 text-slate-500">
//         <div class="flex gap-3">
//             <img src="./images/fi_users.png" alt="Icon user" class="w-6" />
//             <span>${carData.capacity} orang</span>
//         </div>
//         <div class="flex gap-3">
//             <img src="./images/fi_settings.png" alt="Icon user" class="w-6" />
//             <span>${carData.transmission}</span>
//         </div>
//         <div class="flex gap-3">
//             <img src="./images/fi_calendar.png" alt="Icon user" class="w-6" />
//             <span>Tahun ${carData.year}</span>
//         </div>
//     </div>
//     <a
//         href="#"
//         class="flex items-center justify-center p-3 font-medium text-center text-white bg-green-primary rounded-lg hover:bg-green-hover transition-all focus:ring-4 focus:outline-none focus:ring-blue-300"
//     >
//         Pilih Mobil
//     </a>
// </div>
// </div>
// `;
// };

export default { getCarsData, getCarsDataFiltered };
