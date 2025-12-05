const ORDER_HISTORY_KEY = "ngunyahub_order_history";

let historyData = [];
let currentDetailIndex = null;

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID").format(number);
}

function loadHistory() {
  let storedData = null;
  try {
    storedData = sessionStorage.getItem(ORDER_HISTORY_KEY);
  } catch (e) {
    console.error("Gagal akses storage");
  }

  if (storedData) {
    historyData = JSON.parse(storedData);
    if (!Array.isArray(historyData)) historyData = [];
    renderHistoryList(historyData);
  } else {
    renderEmptyState();
  }
}

function renderHistoryList(orders) {
  const container = document.getElementById("order-history-container");
  container.innerHTML = "";

  if (orders.length === 0) {
    renderEmptyState();
    return;
  }

  orders.forEach((order, index) => {
    const previewItems = order.items.slice(0, 2);
    const remainingCount = order.items.length - 2;

    let itemsHtml = "";
    previewItems.forEach((item) => {
      itemsHtml += `
                <div class="item-row">
                    <span>${item.name}</span>
                    <span class="fw-bold">x${item.qty}</span>
                </div>
            `;
    });

    if (remainingCount > 0) {
      itemsHtml += `<span class="more-items">+ ${remainingCount} menu lainnya...</span>`;
    }

    let statusClass = "status-pending";
    if (order.status === "Dalam Perjalanan") statusClass = "status-process";

    const cardHtml = `
            <div class="order-card" onclick="openDetail(${index})">
                <div class="card-header-custom">
                    <span class="order-id">#${order.orderId.substr(-8)}</span>
                    <span class="resto-name">${order.restoName}</span>
                </div>
                <div class="card-body-custom">
                    ${itemsHtml}
                    <div class="d-flex justify-content-between align-items-end mt-2">
                        <small class="text-muted">${new Date(
                          order.date
                        ).toLocaleDateString()}</small>
                        <div class="status-text ${statusClass}">${
      order.status
    }</div>
                    </div>
                </div>
            </div>
        `;
    container.innerHTML += cardHtml;
  });
}

function renderEmptyState() {
  const container = document.getElementById("order-history-container");
  container.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-shopping-basket empty-icon"></i>
            <h5>Belum ada pesanan</h5>
            <p>Yuk pesan makanan favoritmu sekarang!</p>
            <a href="beranda.html" class="btn btn-outline-warning rounded-pill mt-2">Mulai Pesan</a>
        </div>
    `;
}

window.openDetail = function (index) {
  currentDetailIndex = index;
  const order = historyData[index];

  document.getElementById("detail-order-id").innerText = `ID: ${order.orderId}`;
  document.getElementById("detail-status-badge").innerText = order.status;

  const restoNameEl = document.getElementById("detail-resto-name");
  if (restoNameEl) {
    restoNameEl.innerText = order.restoName;
  }

  const listWrapper = document.getElementById("detail-items-wrapper");
  listWrapper.innerHTML = "";

  order.items.forEach((item, itemIndex) => {
    const itemHtml = `
            <div class="detail-item">
                <div class="item-info">
                    <h6>${item.name}</h6>
                    <div class="item-price">Rp ${formatRupiah(item.price)}</div>
                </div>
                <div class="qty-control">
                    <button class="btn-qty minus" onclick="updateDetailQty(${index}, ${itemIndex}, -1)">-</button>
                    <div class="qty-display">${item.qty}</div>
                    <button class="btn-qty plus" onclick="updateDetailQty(${index}, ${itemIndex}, 1)">+</button>
                </div>
            </div>
        `;
    listWrapper.innerHTML += itemHtml;
  });

  updateGrandTotal(order.total);

  document.getElementById("view-list").classList.add("d-none");
  document.getElementById("view-detail").classList.remove("d-none");
  window.scrollTo(0, 0);
};

window.updateDetailQty = function (orderIndex, itemIndex, change) {
  const order = historyData[orderIndex];
  const item = order.items[itemIndex];

  if (item.qty + change >= 1) {
    item.qty += change;
  } else if (item.qty + change === 0) {
    if (confirm("Hapus item ini dari pesanan?")) {
      order.items.splice(itemIndex, 1);
      if (order.items.length === 0) {
        historyData.splice(orderIndex, 1);
        sessionStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(historyData));
        document.getElementById("btn-back-to-list").click();
        return;
      }
    } else {
      return;
    }
  }

  let newTotal = 0;
  order.items.forEach((i) => {
    newTotal += i.price * i.qty;
  });
  order.total = newTotal;

  sessionStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(historyData));

  openDetail(orderIndex);
};

function updateGrandTotal(amount) {
  document.getElementById("grand-total-display").innerText =
    formatRupiah(amount);
}

document
  .getElementById("btn-back-to-list")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("view-detail").classList.add("d-none");
    document.getElementById("view-list").classList.remove("d-none");
    renderHistoryList(historyData);
  });

window.selectPayment = function (btn) {
  document
    .querySelectorAll(".btn-payment")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
};

window.confirmOrder = function () {
  alert("Pesanan dikonfirmasi! Restoran akan segera memproses.");
  if (currentDetailIndex !== null) {
    historyData[currentDetailIndex].status = "Diproses";
    sessionStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(historyData));
  }
  document.getElementById("btn-back-to-list").click();
};

document.addEventListener("DOMContentLoaded", loadHistory);
