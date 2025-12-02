$(document).ready(function () {
    const $themeToggle = $("#themeToggle");
    const LIGHT_ICON = "moon";
    const DARK_ICON = "sun";
    function applyTheme(theme) {
        if (theme === 'dark') {
            $("body").addClass("dark-mode");
            $themeToggle.attr("data-feather", DARK_ICON); 
        } else {
            $("body").removeClass("dark-mode");
            $themeToggle.attr("data-feather", LIGHT_ICON); 
        }
        feather.replace(); 
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    $themeToggle.click(function () {
        const isDark = $("body").hasClass("dark-mode");
        const newTheme = isDark ? 'light' : 'dark';
        
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    $(".icons i[data-feather='bell']").click(function() {
        alert("Notifikasi: Belum ada notifikasi baru.");
    });
    
    $(".icons i[data-feather='user']").click(function() {
        alert("Menu Profil: Arahkan ke /profile");
    });

    $(".icons i[data-feather='shopping-bag']").click(function() {
        alert("Keranjang: Menuju halaman checkout.");
    });

    $(".tag").click(function () {
        const $this = $(this);
        let filter = $this.text().toLowerCase().trim();


        $(".tag").removeClass("active-tag");
        $this.addClass("active-tag");
        

        if ($this.hasClass("reset-tag")) {
            $(".card").show();
            $("#searchInput").val("");
            return;
        }


        $(".card").hide().filter(function () 
            let tags = $(this).data("tags");
            return tags.includes(filter);
        }).show(); 
    });


    $(".reset-tag").click(function(){
        $(".tag").removeClass("active-tag");
        $(this).addClass("active-tag"); 
        $(".card").show();
        $("#searchInput").val("");
    });
    

    $("#searchBtn").click(function () {
        let keyword = $("#searchInput").val().toLowerCase().trim();
        $(".card").hide().filter(function () {

            return $(this).find("h3").text().toLowerCase().includes(keyword);
        }).show();

        $(".tag").removeClass("active-tag");
    });

    $("#searchInput").on("keyup", function(e){
        if(e.key === "Enter"){
            $("#searchBtn").click();
        }
    });

});
