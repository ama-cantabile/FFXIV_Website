ready(function () {

    console.log("Client script loaded.");

    function ajaxGET(url, callback) {

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    document.querySelectorAll(".clear").forEach(function (currentElement, currentIndex, listObj) {
        currentElement.addEventListener("click", function (e) {
            document.getElementById("hamburger-menu-container").innerHTML = "";
            console.log("clicked");
            for (let i = 0; i < this.parentNode.childNodes.length; i++) {
                if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
                    if (this.parentNode.childNodes[i].getAttribute("class") == "ajax-stuff") {
                        this.parentNode.childNodes[i].innerHTML = "";
                        break;
                    }
                }
            }
        });
    });

    document.querySelector("#hamburger-icon").addEventListener("click", function (e) {
        ajaxGET("/hamburgerMenu?format=html", function (data) {
            document.getElementById("hamburger-menu-container").innerHTML = data;
        });
    });

    ajaxGET("/characterData", function (data) {
        let parsedData = JSON.parse(data);
        let cardTemplate = "";

        for (var i = 0; i < parsedData.length; i++) {
            cardTemplate += '<div class="card"><img id="profile-image" src=' + parsedData[i].url 
            + '><div class="container"><p id="profile-name">' 
            + parsedData[i].name + '</p>'
            + '<p> Level: ' + parsedData[i].level + '</p>'
            + '<p> Title: ' + parsedData[i].title + '</p>'
            + '<p> Class/Job: ' + parsedData[i].job + '</p>'
            + '<p> Playtime: ' + parsedData[i].playtime + '</p>'
            + '</div></div>';

        }   
        document.getElementById("card-container").innerHTML = cardTemplate;

    });

    let txtMouseHover1 = document.getElementById("sub-text1");
    let txtMouseHover2 = document.getElementById("sub-text2");
    let txtMouseHover3 = document.getElementById("sub-text3");
    let logoImage = document.getElementById("logo");

    txtMouseHover1.addEventListener("mouseenter", function (event){
        document.getElementById("main-image-container").style.backgroundImage = "url('img/FFXIVMainImage.jpg')";
    })

    txtMouseHover2.addEventListener("mouseenter", function (event){
        document.getElementById("main-image-container").style.backgroundImage = "url('img/FFXIVMainImage2.jpg')";
    })

    txtMouseHover3.addEventListener("mouseenter", function (event){
        document.getElementById("main-image-container").style.backgroundImage = "url('img/FFXIVMainImage3.jpg')";
    })

    logoImage.addEventListener("click", function (event) {
        document.getElementById("main-image-container").style.backgroundImage = "url('img/MainImage.jpg')";
    })

});

// process the callback function
function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}
