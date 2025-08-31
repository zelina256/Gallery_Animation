$(document).ready(function () {
    const loader = $(".loader")
    $(window).on("load", function () {
        setTimeout(function () {
            loader.fadeOut("slow");
        }, 2000); // 2000 milliseconds = 2 seconds
    })

})

