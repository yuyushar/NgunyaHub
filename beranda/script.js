$(document).ready(function () {

  // Tag filter
  $(".tag").click(function () {
    let filter = $(this).text().toLowerCase();
    $(".card").hide().filter(function () {
      let tags = $(this).data("tags");
      return tags.includes(filter);
    }).fadeIn(200);
  });
  $(".reset-tag").click(function(){
    $(".card").fadeIn(200)
    $("#searchInput").val("")
  })

  // Search
  $("#searchBtn").click(function () {
    let keyword = $("#searchInput").val().toLowerCase();
    $(".card").hide().filter(function () {
      return $(this).find("h3").text().toLowerCase().includes(keyword);
    }).fadeIn(200);
  });

});