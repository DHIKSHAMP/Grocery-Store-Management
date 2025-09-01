$(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');

    if (orderId) {
        $.get(`/getOrderDetails/${orderId}`, function (response) {
            if (response) {
                $('#orderInfo').html(`<b>Order ID:</b> ${response.order_id} &nbsp;&nbsp;&nbsp; <b>Customer Name:</b> ${response.customer_name}`);

                let table = '';
                $.each(response.details, function(index, item) {
                    table += '<tr>' +
                        `<td>${item.product_id}</td>` +
                        `<td>${item.product_name}</td>` +
                        `<td>${item.quantity}</td>` +
                        `<td>${item.total_price.toFixed(2)} Rs</td>` +
                    '</tr>';
                });
                $("table").find('tbody').empty().html(table);
            }
        });
    }
});
