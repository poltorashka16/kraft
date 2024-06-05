function calculate() {
  let rows = document.querySelectorAll("#productTable6 tbody tr");
  let totalLength = 0;
  let totalWidth = 0;
  let totalQuantity = 0;
  let totalPerimeter = 0;
  let totalArea = 0;

  rows.forEach(row => {
    let length = parseFloat(row.querySelector(".length").value) || 0;
    let width = parseFloat(row.querySelector(".width").value) || 0;
    let quantity = parseFloat(row.querySelector(".quantity").value) || 0;

    if (length > 0 && width > 0 && quantity > 0) {
      // Calculate the perimeter in millimeters, then convert to meters
      let perimeter = 2 * (length + width) * quantity / 1000;
      // Calculate the area in square meters
      let area = (length * width * quantity) / 1000000;

      // Update the row with the calculated perimeter and area
      row.querySelector(".perimeter").innerText = perimeter.toFixed(2);
      row.querySelector(".area").innerText = area.toFixed(2);

      // Add the current row's perimeter and area to the totals
      totalPerimeter += perimeter;
      totalArea += area;

      totalLength += length;
      totalWidth += width;
      totalQuantity += quantity;
    }
    document.querySelector(".total-length").innerText = (totalLength / 1000).toFixed(2); // Делим на 1000 для перевода из мм в м
    document.querySelector(".total-width").innerText = (totalWidth / 1000).toFixed(2); // Делим на 1000 для перевода из мм в м
    document.querySelector(".total-quantity").innerText = totalQuantity;
  
  });

  // Update the total perimeter and area in the footer
  document.querySelector(".total-perimeter").innerText = totalPerimeter.toFixed(2);
  document.querySelector(".total-area").innerText = totalArea.toFixed(2);
}

function calculateWeight() {
  let totalArea = parseFloat(document.querySelector(".total-area").innerText) || 0;
  let rows = document.querySelectorAll("#weightCalculationTable tbody tr");
  
  rows.forEach(row => {
      let thickness = parseFloat(row.querySelector(".thickness").value) || 0;

      // Рассчитываем вес по формуле: площадь * 1.45 * Толщина HPL
      let weight = totalArea * 1.45 * thickness;

      // Округляем вес до трех знаков после запятой
      weight = Math.round(weight * 1000) / 1000;

      // Выводим результат во второй столбец
      row.querySelector(".total-weight").innerText = weight;
  });
}

function calculatePrice7(row) {
  const quantity = parseFloat(document.getElementById(`kitchenCountertopsTable`).rows[row + 1].cells[2].getElementsByTagName('input')[0].value) || 0;
  const cost = parseFloat(document.getElementById(`kitchenCountertopsTable`).rows[row + 1].cells[3].innerText.replace(/,/g, '')) || 0;
  const price = quantity * cost;
  document.getElementById(`kitchenCountertopsTable`).rows[row + 1].cells[4].innerText = formatNumber(price);
  updateTotalCost7();
}

function updateTotalCost7() {
  const rows = document.getElementById('kitchenCountertopsTable').rows;
  let totalCost7 = 0;

  for (let i = 1; i < rows.length - 1; i++) {
      const quantity = parseFloat(rows[i].cells[2].getElementsByTagName('input')[0].value) || 0;
      const cost = parseFloat(rows[i].cells[3].innerText.replace(/,/g, '')) || 0;
      const price = quantity * cost;
      rows[i].cells[4].innerText = formatNumber(price);
      totalCost7 += price;
  }

  document.getElementById('totalCost7').innerText = 'Итого траснпортные услуги и упаковка РОЗНИЦА: ' + formatNumber(totalCost7);
  return totalCost7;
}

function formatNumber(number) {
  return parseFloat(number).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 10 }).replace(/,/g, '');
}


function calculatePrice(row) {
  const quantity = parseFloat(document.getElementById(`productTable`).rows[row + 1].cells[2].getElementsByTagName('input')[0].value) || 0;
  const cost = parseFloat(document.getElementById(`productTable`).rows[row + 1].cells[3].innerText.replace(/,/g, '')) || 0;
  const price = quantity * cost;
  document.getElementById(`productTable`).rows[row + 1].cells[4].innerText = formatNumber(price);
  updateTotalCost();
}

function updateTotalCost() {
  const rows = document.getElementById('productTable').rows;
  let totalCost = 0;

  for (let i = 1; i < rows.length - 1; i++) {
      const quantity = parseFloat(rows[i].cells[2].getElementsByTagName('input')[0].value) || 0;
      const cost = parseFloat(rows[i].cells[3].innerText.replace(/,/g, '')) || 0;
      const price = quantity * cost;
      rows[i].cells[4].innerText = formatNumber(price);
      totalCost += price;
  }

  document.getElementById('totalCost').innerText = 'Итог обработка РОЗНИЦА: ' + formatNumber(totalCost);
  return totalCost;
}

function calculatePrice2(row) {
  const quantity = parseFloat(document.getElementById(`productTable2`).rows[row + 1].cells[2].getElementsByTagName('input')[0].value) || 0;
  const cost = parseFloat(document.getElementById(`productTable2`).rows[row + 1].cells[3].innerText.replace(/,/g, '')) || 0;
  const price = quantity * cost;
  document.getElementById(`productTable2`).rows[row + 1].cells[4].innerText = formatNumber(price);
  updateTotalCost2();
}

function updateTotalCost2() {
  const rows = document.getElementById('productTable2').rows;
  let totalCost2 = 0;

  for (let i = 1; i < rows.length - 1; i++) {
      const quantity = parseFloat(rows[i].cells[2].getElementsByTagName('input')[0].value) || 0;
      const cost = parseFloat(rows[i].cells[3].innerText.replace(/,/g, '')) || 0;
      const price = quantity * cost;
      rows[i].cells[4].innerText = formatNumber(price);
      totalCost2 += price;
  }

  document.getElementById('totalCost2').innerText = 'Итого траснпортные услуги и упаковка РОЗНИЦА: ' + formatNumber(totalCost2);
  return totalCost2;
}

function formatNumber(number) {
  return parseFloat(number).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 10 }).replace(/,/g, '');
}


function updateOverallTotal() {
  const totalCost = updateTotalCost();
  const totalCost2 = updateTotalCost2();
  const totalCost7 = updateTotalCost7();

  const overallTotal = totalCost + totalCost2 + totalCost7;
  document.getElementById('overallTotal').innerText = 'Общая стоимость: ' + overallTotal.toLocaleString();

  openModal();
}
var modal = document.getElementById("myModal");
var modalData = document.getElementById("modalData");

// Получаем ссылку на кнопку, которая закрывает модальное окно
var closeButton = document.getElementsByClassName("close")[0];

// Функция для открытия модального окна и передачи данных
function openModal(data) {
  // Вставляем данные в контейнер
  modalData.innerHTML = data;
  // Отображаем модальное окно
  modal.style.display = "block";
}


function closeModal() {
  modal.style.display = "none";
}

// Закрытие модального окна при клике на кнопку закрытия
closeButton.onclick = function() {
  closeModal();
};

// Закрытие модального окна при клике вне модального окна
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
};

function openModal(overallTotal) {
  // Вставляем данные в контейнер
  modalData.innerHTML = 'Общая стоимость: ' + overallTotal.toLocaleString();
  // Отображаем модальное окно
  modal.style.display = "block";
}

function calculateTotal() {
  var button = document.getElementById('calculateButton');
  button.style.backgroundColor = '#ffd700';
  button.style.color = '#000';

  var data = "Общая стоимость: $100"; // Замените на данные, полученные в результате расчета
  
  // Открываем модальное окно и передаем в него данные
  openModal(data);
}

document.getElementById('calculateButton').addEventListener('click', updateOverallTotal);



