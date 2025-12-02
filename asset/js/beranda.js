$(document).ready(function () {

  // Tag filter
  $(".tag").click(function () {
    let filter = $(this).text().toLowerCase();
    if ($(this).hasClass("reset-tag")) return; // Skip reset

    $(".card").hide().filter(function () {
      let tags = $(this).data("tags");
      return tags.includes(filter);
    }).fadeIn(200);
  });

  $(".reset-tag").click(function(){
    $(".card").fadeIn(200);
    $("#searchInput").val("");
  });

  // Search
  $("#searchBtn").click(function () {
    let keyword = $("#searchInput").val().toLowerCase();
    $(".card").hide().filter(function () {
      return $(this).find("h3").text().toLowerCase().includes(keyword);
    }).fadeIn(200);
  });

  // Search on Enter key
  $("#searchInput").on("keyup", function(e){
    if(e.key === "Enter"){
      $("#searchBtn").click();
    }
  });

});
