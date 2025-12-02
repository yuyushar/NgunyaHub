const menuData = [
  {
    id: 1,
    name: "Nasi Goreng Kambing Jumbo",
    desc: "Nasi Goreng Kambing, ukuran 2-3 orang + telor, Baso Sapi, Sosis.",
    price: 40000,
    originalPrice: 50000,
    likes: 7,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&q=80",
    category: "food",
    qty: 0,
  },
  {
    id: 2,
    name: "Sate Ayam Madura",
    desc: "10 tusuk sate ayam bumbu kacang + Lontong.",
    price: 35000,
    originalPrice: null,
    likes: 12,
    image:
      "https://images.unsplash.com/photo-1645696301019-35adcc18fc21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2F0ZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "food",
    qty: 0,
  },
  {
    id: 3,
    name: "Waltuh Water",
    desc: "Air mineral pegunungan.",
    price: 1000000,
    originalPrice: null,
    likes: 99,
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=400&q=80",
    category: "drink",
    qty: 0,
  },
  {
    id: 4,
    name: "Es Teh Manis",
    desc: "Teh asli gula batu.",
    price: 5000,
    originalPrice: null,
    likes: 45,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80",
    category: "drink",
    qty: 0,
  },
];

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID").format(number);
}

function renderMenu(items) {
  $("#foodListOrder").empty();
  $("#drinkListOrder").empty();

  items.forEach((item) => {
    let promoHtml = "";
    if (item.originalPrice) {
      promoHtml = `<small class="text-decoration-line-through text-muted me-2">${formatRupiah(item.originalPrice)}</small> 
        <span class="promoBadgeOrder">Promo</span>`;
    }

    const cardHtml = `
            <div class="menuCardOrder d-flex gap-4 align-items-center">
                <div class="flex-grow-1">
                    <h5 class="menuTitleOrder fw-bold mb-2">${item.name}</h5>
                    <div class="likeBadgeOrder mb-2"><i class="fas fa-heart"></i> ${
                      item.likes
                    } suka</div>
                    <p class="menuDescOrder mb-3 text-truncate" style="white-space: normal; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${
                      item.desc
                    }</p>
                    <div class="priceWrapperOrder fw-bold">
                        ${promoHtml}
                        <div class="fs-4 mt-1">${formatRupiah(item.price)}</div>
                    </div>
                </div>
                <div class="d-flex flex-column align-items-center gap-3" style="width: 120px;">
                    <img src="${item.image}" class="menuImgOrder">
                    <div class="d-flex align-items-center justify-content-between w-100 px-1">
                        <button class="qtyBtnOrder" onclick="changeQty(${
                          item.id
                        }, -1)">-</button>
                        <span class="fw-bold fs-5" id="qty-${item.id}">${item.qty}</span>
                        <button class="qtyBtnOrder active" onclick="changeQty(${
                          item.id
                        }, 1)">+</button>
                    </div>
                </div>
            </div>
        `;

    if (item.category === "food") {
      $("#foodListOrder").append(cardHtml);
    } else {
      $("#drinkListOrder").append(cardHtml);
    }
  });
}

window.changeQty = function (id, change) {
  const item = menuData.find((i) => i.id === id);
  if (item) {
    if (item.qty + change >= 0) {
      item.qty += change;
      $(`#qty-${id}`).text(item.qty);
      calculateTotal();
    }
  }
};

function calculateTotal() {
  let total = 0;
  menuData.forEach((item) => {
    total += item.price * item.qty;
  });
  $("#grandTotalOrder").text(formatRupiah(total));
}

$(document).ready(function () {
  renderMenu(menuData);

  $(".categoryHeaderOrder").click(function () {
    const target = $(this).data("target");
    $(target).slideToggle();
    $(this).toggleClass("collapsed");
  });


  $("#toggleSearchBtn").click(function (e) {
    e.preventDefault();
    const wrapper = $("#searchWrapper");
    const input = $("#headerSearchInput");

    if (wrapper.hasClass("search-wrapper-visible")) {
      wrapper.removeClass("search-wrapper-visible");
      input.val(""); 
      renderMenu(menuData); 
    } else {
      wrapper.addClass("search-wrapper-visible");
      input.focus();
    }
  });

  $("#headerSearchInput").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    const filtered = menuData.filter(
      (item) =>
        item.name.toLowerCase().indexOf(value) > -1 ||
        item.desc.toLowerCase().indexOf(value) > -1
    );
    renderMenu(filtered);

    $(".categoryHeaderOrder").removeClass("collapsed");
    $(".menuListOrder").slideDown();
  });
});
