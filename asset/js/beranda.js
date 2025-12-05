// Feather icons
feather.replace();

$(document).ready(function () {

  function checkResult() {
    let visibleCard = $(".card:visible").length;

    if (visibleCard === 0) {
      $(".no-result").fadeIn(200);
    } else {
      $(".no-result").hide();
    }
  }

  // Tag filter
  $(".tag").click(function () {
    let filter = $(this).text().toLowerCase();

    $("#searchInput").val("");

    if ($(this).hasClass("reset-tag") || filter === "all") {
      $(".card").fadeIn(200);
      $(".no-result").hide();
      return;
    }

    $(".card").hide().filter(function () {
      let tags = $(this).data("tags");
      return tags.includes(filter);
    }).fadeIn(200);

    setTimeout(checkResult, 210);
  });

  // Search tombol
  $("#searchBtn").click(function () {
    let keyword = $("#searchInput").val().toLowerCase();

    $(".card").hide().filter(function () {
      return $(this).find("h3").text().toLowerCase().includes(keyword);
    }).fadeIn(200);

    checkResult();
  });

  // Search enter
  $("#searchInput").on("keypress", function (e) {
    if (e.which === 13) $("#searchBtn").click();
  });

  // Live search
  $("#searchInput").on("keyup", function () {
    let keyword = $(this).val().toLowerCase();

    $(".card").filter(function () {
      $(this).toggle($(this).find("h3").text().toLowerCase().indexOf(keyword) > -1)
    });

    checkResult();
  });

  // Mobile search open
  $("#mobileSearchBtn").click(function () {
    $("#searchContainer").addClass("active");
    $("#searchInput").focus();
  });

  // Mobile search close
  $("#closeSearchBtn").click(function () {
    let s = $("#searchContainer");
    s.addClass("closing");

    $("#searchInput").val("");
    $(".card").fadeIn(200);

    setTimeout(function () {
      s.removeClass("active closing");
    }, 300);
  });

  // Like button
  $(document).on("click", ".like-btn", function () {
    let countSpan = $(this).find(".like-count");
    let current = parseInt(countSpan.text());

    if ($(this).hasClass("liked")) {
      $(this).removeClass("liked");
      countSpan.text(current - 1);
    } else {
      $(this).addClass("liked");
      countSpan.text(current + 1);
    }
  });

});
