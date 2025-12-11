$(document).ready(function () {
  feather.replace();

  var $grid = $("#restoGrid");
  var $cards = $grid.children(".card");
  const HOME_LIKE_KEY = "ngunyahub_home_likes";

  $cards.each(function (index) {
    $(this).attr("data-original-index", index);
  });

  let savedLikes = JSON.parse(sessionStorage.getItem(HOME_LIKE_KEY)) || [];

  if (savedLikes.length > 0) {
    $(".card").each(function () {
      let href = $(this).attr("href");
      let restoId = href.split("=")[1];

      if (savedLikes.includes(restoId)) {
        $(this).find(".like-btn").addClass("liked");
        $(this)
          .find(".like-count")
          .text(function (i, txt) {
            return parseInt(txt) + 1;
          });
      }
    });
    feather.replace();
  }

  function checkResult() {
    let visibleCard = $(".card:visible").length;
    visibleCard === 0 ? $(".no-result").fadeIn(200) : $(".no-result").hide();
  }

  $(".tag")
    .not(".filter-special")
    .click(function () {
      let filter = $(this).text().toLowerCase();
      $("#searchInput").val("");

      $(".filter-special").removeClass("active");

      sortCards(false);

      if ($(this).hasClass("reset-tag") || filter === "all") {
        $(".card").fadeIn(200);
        $(".no-result").hide();
        return;
      }
      $(".card")
        .hide()
        .filter(function () {
          let tags = $(this).data("tags");
          return tags && tags.includes(filter);
        })
        .fadeIn(200);
      setTimeout(checkResult, 210);
    });

  $("#btnNearest").click(function () {
    $("#btnLiked").removeClass("active");

    $(this).toggleClass("active");
    $("#searchInput").val("");

    sortCards($(this).hasClass("active"));

    $(".card").fadeIn(200);
    checkResult();
  });

  $("#btnLiked").click(function () {
    $("#btnNearest").removeClass("active");
    sortCards(false);

    $(this).toggleClass("active");
    $("#searchInput").val("");

    if ($(this).hasClass("active")) {
      $(".card")
        .hide()
        .filter(function () {
          return $(this).find(".like-btn").hasClass("liked");
        })
        .fadeIn(200);
    } else {
      $(".card").fadeIn(200);
    }
    setTimeout(checkResult, 210);
  });

  function sortCards(isNearest) {
    var $currentCards = $grid.children(".card");

    $currentCards.sort(function (a, b) {
      if (isNearest) {
        return $(a).data("time") - $(b).data("time");
      } else {
        return $(a).data("original-index") - $(b).data("original-index");
      }
    });

    $currentCards.detach().appendTo($grid);
    checkResult();
  }

  $("#searchInput").on("keyup", function () {
    let keyword = $(this).val().toLowerCase();
    $(".filter-special").removeClass("active");
    sortCards(false);

    $(".card").filter(function () {
      return $(this).toggle(
        $(this).find("h3").text().toLowerCase().indexOf(keyword) > -1
      );
    });
    checkResult();
  });

  $("#searchBtn").click(function () {
    $("#searchInput").trigger("keyup");
  });

  $(document).on("click", "#mobileSearchBtn", function (e) {
    e.preventDefault();
    $("#searchContainer").addClass("active");
    $("#searchInput").focus();
  });
  $(document).on("click", "#closeSearchBtn", function (e) {
    e.preventDefault();
    let $search = $("#searchContainer");
    $search.addClass("closing");
    $("#searchInput").val("");
    $(".card").fadeIn(200);
    $(".no-result").hide();
    setTimeout(function () {
      $search.removeClass("active closing");
    }, 300);
  });

  $(document).on("click", ".like-btn", function (e) {
    e.preventDefault();
    e.stopPropagation();

    let btn = $(this);
    let countSpan = btn.find(".like-count");
    let currentCount = parseInt(countSpan.text());

    let cardParams = btn.closest(".card").attr("href");
    let restoId = cardParams.split("=")[1];

    let currentSavedLikes =
      JSON.parse(sessionStorage.getItem(HOME_LIKE_KEY)) || [];

    if (btn.hasClass("liked")) {
      btn.removeClass("liked");
      countSpan.text(currentCount - 1);

      currentSavedLikes = currentSavedLikes.filter((id) => id !== restoId);

      if ($("#btnLiked").hasClass("active")) {
        btn.closest(".card").fadeOut(200, checkResult);
      }
    } else {
      btn.addClass("liked");
      countSpan.text(currentCount + 1);

      if (!currentSavedLikes.includes(restoId)) {
        currentSavedLikes.push(restoId);
      }
    }

    sessionStorage.setItem(HOME_LIKE_KEY, JSON.stringify(currentSavedLikes));
  });
});
