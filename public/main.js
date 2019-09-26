function updateTheme(themeName) {
    if (themeName == undefined) {
        themeName = Cookies.get("theme");
    }
    switch (themeName) {
        case "dark":
            Cookies.set("theme", "dark", { expires: 365 });
            document.documentElement.style.setProperty('--text1', '#db8bbe');
            document.documentElement.style.setProperty('--text2', '#cdc7ce');
            document.documentElement.style.setProperty('--background', '#000b38');
            document.documentElement.style.setProperty('--starWidth', '15px');
            break;
        default:
        case "light":
            Cookies.set("theme", "light", { expires: 365 });
            document.documentElement.style.setProperty('--text1', '#1e1a40');
            document.documentElement.style.setProperty('--text2', '#2b2f4c');
            document.documentElement.style.setProperty('--background', '#e2edf5');
            document.documentElement.style.setProperty('--starWidth', '0px');
            break;
    }
}

function cycleTheme() {
    themeName = Cookies.get("theme");
    if (themeName == "light") {
        updateTheme("dark");
    } else {
        updateTheme("light");
    }
}

function sparkle() {
    var mySparkle = {};
    mySparkle.stars = [];
    mySparkle.createStar = function () {
        console.log("createStar")
        if (!mySparkle.elem) {
            mySparkle.elem = $("body");
        }
        var star = $("<div class='star elementToFadeInAndOut'></div>");
        star.on("webkitAnimationIteration animationiteration", function (e) {
            var randTop = Math.abs(Math.floor(Math.random() * 100) - 4);
            var randLeft = Math.abs(Math.floor(Math.random() * 100) - 4);
            $(this).css("top", randTop + "%");
            $(this).css("left", randLeft + "%");
        })
        var randTop = Math.floor(Math.random() * 100);
        var randLeft = Math.floor(Math.random() * 100);
        star.css("top", randTop + "%");
        star.css("left", randLeft + "%");
        mySparkle.elem.append(star);
        mySparkle.stars.push(star);

    };
    mySparkle.createStars = function (n) {
        var interval = setInterval(mySparkle.createStar, 900);
        var stopSparkle = function () {
            clearInterval(interval);
        };
        setTimeout(stopSparkle, 40000);
    }
    mySparkle.showPos = function () {
        for (var i = 0; i < mySparkle.stars.length; i++) {
            console.log(
                mySparkle.stars[i],
                mySparkle.stars[i].css("top"),
                mySparkle.stars[i].css("left")
            );
        }
    }
    mySparkle.init = function (elem, n) {
        mySparkle.elem = elem;
        mySparkle.createStars(n);
    }

    mySparkle.init($("body"), 1); // creates 150 stars, and the whole page ( elem = body )
    // mySparkle.init($(".photo"), 150); // creates 150 stars, and the div(s) with the "photo" class ( elem = $( ".photo ) )
}

window.onload = function () {
    sparkle();
    var themeChanger = document.querySelector("#theme-changer")
    themeChanger.addEventListener('click', function (e) {
        cycleTheme()
    });
}

updateTheme()