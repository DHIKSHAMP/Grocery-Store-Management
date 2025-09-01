var productPrices = {};

$(function () {
    //Json data by api call for order table
    $.get(productListApiUrl, function (response) {
        productPrices = {}
        if(response) {
            var options = '<option value="">--Select--</option>';
            $.each(response, function(index, product) {
                options += '<option value="'+ product.product_id +'">'+ product.name +'</option>';
                productPrices[product.product_id] = product.price_per_unit;
            });
            $(".product-box").find("select").empty().html(options);
        }
    });
});

$("#addMoreButton").click(function () {
    var row = $(".product-box").html();
    $(".product-box-extra").append(row);
    $(".product-box-extra .remove-row").last().removeClass('hideit');
    $(".product-box-extra .product-price").last().text('0.0');
    $(".product-box-extra .product-qty").last().val('1');
    $(".product-box-extra .product-total").last().text('0.0');
});

$(document).on("change", ".cart-product", function (){
    var product_id = $(this).val();
    var price = productPrices[product_id];

    $(this).closest('.row').find('#product_price').val(price);
    calculateValue();
});

$(document).on("change", ".product-qty", function (e){
    calculateValue();
});
// Recalculate when quantity or price changes
$(document).on('input', '.product-qty, #product_price', function () {
    calculateValue();
});

// Recalculate grand total when item total is manually changed
$(document).on('input', '#item_total', function () {
    let total = 0;
    $(".product-item").each(function () {
        let itemTotal = parseFloat($(this).find('#item_total').val());
        if (!isNaN(itemTotal)) {
            total += itemTotal;
        }
    });
    $("#product_grand_total").val(total.toFixed(2));
});

// Handle remove row
$(document).on("click", ".remove-row", function () {
    $(this).closest(".row").remove();  // remove the row
    calculateValue();                  // recalc total (from common.js)
});

$("#saveOrder").on("click", function() {
    var formData = $("form").serializeArray();
    var requestPayload = {
        customer_name: null,
        total: null,
        order_details: []
    };

    let errors = [];

    var orderDetails = [];
    let lastElement = null;

    for (var i = 0; i < formData.length; ++i) {
        var element = formData[i];

        switch (element.name) {
            case 'customerName':
                requestPayload.customer_name = element.value.trim();
                if (!requestPayload.customer_name) {
                    errors.push("Customer name is required.");
                    $("#customerName").addClass("error");
                }
                else{
                    $("#customerName").removeClass("error");
                }
                break;

            case 'product_grand_total':
                requestPayload.grand_total = element.value;
                break;

            case 'product':
                if (!element.value) {
                    errors.push("A product must be selected.");
                    $(element).addClass("error");
                }
                else {
                    $(element).removeClass("error");
                }
                requestPayload.order_details.push({
                    product_id: element.value,
                    quantity: null,
                    total_price: null
                });
                break;

            case 'qty':
                lastElement = requestPayload.order_details[requestPayload.order_details.length - 1];
                if (!element.value || parseInt(element.value) <= 0) {
                    errors.push("Quantity must be greater than 0.");
                    $(element).addClass("error");
                }
                else {
                    $(element).removeClass("error");
                }
                lastElement.quantity = element.value;
                break;

            case 'item_total':
                lastElement = requestPayload.order_details[requestPayload.order_details.length - 1];
                lastElement.total_price = element.value;
                break;
        }
    }

    if (requestPayload.order_details.length === 0) {
        errors.push("At least one product must be added to the order.");
    }

    if (errors.length > 0) {
        alert("Please fix the following errors:\n- " + errors.join("\n- "));
        return; // Do not proceed
    }

    // Proceed to submit via API
    callApi("POST", orderSaveApiUrl, {
        'data': JSON.stringify(requestPayload)
    });
});
