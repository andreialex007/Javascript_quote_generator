$(function () {
    function application() {
        var self = {};
        self.spaceToCostMapping = {
            "e.g. 2.000 sqft": "39",
            "2.000 - 6.000 sqft": "79",
            "6.000 - 12.000 sqft": "139",
            "12.000 - 24.000 sqft": "249",
            "24.000+ sqft": "249"
        };

        self.doorPrice = 99;

        self.init = function () {
            var optionText = "";
            for (var key in self.spaceToCostMapping) {
                var value = self.spaceToCostMapping[key];
                optionText += "<option value='" + value + "' >" + key + "</option>";
            }
            $(".square-total").html(optionText);

            $(".download-btn").click(function () {
                var priceOfSquare = $(".square-total").val();
                var priceOfDoors = ($(".doors-amount option:selected").index() + 1) * self.doorPrice;
                var totalPrice = parseInt(priceOfSquare) + parseInt(priceOfDoors);
                var emailValue = $(".user-email").val();
                var priceTExt = "Price of doors: " + priceOfDoors + "$ \r\n" +
                    "Price of square: " + priceOfSquare + "$ \r\n" +
                    "Total: " + totalPrice + "$ \r\n" +
                    "Your email: " + emailValue;

                if (!emailValue) {
                    alert("Please enter email");
                    return;
                }

                self.downloadFile("quote_from_KISI.txt", priceTExt);
            });
        }

        self.downloadFile = function (filename, text) {
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            pom.setAttribute('download', filename);
            pom.click();
        }


        self.init();
        return self;
    }

    window.app = new application();
});