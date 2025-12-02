$(document).ready(function () {

  feather.replace();


  $(".tag").click(function () {
    let filter = $(this).text().toLowerCase();
    if ($(this).hasClass("reset-tag")) return;
    $(".card").hide().filter(function () {
      let tags = $(this).data("tags");
      return tags.includes(filter);
    }).fadeIn(200);
  });


  $(".reset-tag").click(function(){
    $(".card").fadeIn(200);
    $("#searchInput").val("");
  });

  $("#searchBtn").click(function () {
    let keyword = $("#searchInput").val().toLowerCase();
    $(".card").hide().filter(function () {
      return $(this).find("h3").text().toLowerCase().includes(keyword);
    }).fadeIn(200);
  });

  $("#searchInput").on("keyup", function(e){
    if(e.key === "Enter"){
      $("#searchBtn").click();
    }
  });

  $(document).on("click", ".favorite-btn svg", function(){
    $(this).toggleClass("favorited");
  });

  $(document).on("click", "#themeToggle", function(){
    $("body").toggleClass("dark-mode");
  });

  $(document).on("click", "#bellIcon", function(){
    alert("Notifikasi!");
  });
  $(document).on("click", "#userIcon", function(){
    alert("Profile!");

  });
  $(document).on("click", "#bagIcon", function(){
    alert("Keranjang!");

  });
});
