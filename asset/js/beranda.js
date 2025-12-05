$(document).ready(function () {
  
  // Init Icons
  feather.replace();

  // No result check
  function checkResult() {
    let visibleCard = $(".card:visible").length;
    (visibleCard === 0) ? $(".no-result").fadeIn(200) : $(".no-result").hide();
  }

    // Tag filter
  $(".tag").click(function () {
    let filter = $(this).text().toLowerCase();
    $("#searchInput").val("");
    if ($(this).hasClass("reset-tag") || filter === "all") {
        $(".card").fadeIn(200); $(".no-result").hide(); return;
    }
    $(".card").hide().filter(function () {
      let tags = $(this).data("tags");
      return tags && tags.includes(filter);
    }).fadeIn(200);
    setTimeout(checkResult, 210);
  });

  // Search
  $("#searchInput").on("keyup", function () {
    let keyword = $(this).val().toLowerCase();
    $(".card").filter(function () {
      return $(this).toggle($(this).find("h3").text().toLowerCase().indexOf(keyword) > -1)
    });
    checkResult();
  });

  $("#searchBtn").click(function () { $("#searchInput").trigger("keyup"); });

  $(document).on('click', '#mobileSearchBtn', function(e) {
    e.preventDefault(); $("#searchContainer").addClass("active"); $("#searchInput").focus();
  });
  $(document).on('click', '#closeSearchBtn', function(e) {
    e.preventDefault();
    let $search = $("#searchContainer");
    $search.addClass("closing"); $("#searchInput").val(""); $(".card").fadeIn(200); $(".no-result").hide();
    setTimeout(function(){ $search.removeClass("active closing"); }, 300);
  });

  // Like
  $(document).on('click', '.like-btn', function(e) {
    e.preventDefault(); e.stopPropagation();
    let countSpan = $(this).find('.like-count');
    let currentCount = parseInt(countSpan.text());
    if ($(this).hasClass('liked')) {
      $(this).removeClass('liked'); countSpan.text(currentCount - 1);
    } else {
      $(this).addClass('liked'); countSpan.text(currentCount + 1);
    }
  });
});