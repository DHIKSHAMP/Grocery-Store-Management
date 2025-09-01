$(function () {
    // Load order table
    $.get(orderListApiUrl, function (response) {
        if(response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function(index, order) {
                totalCost += parseFloat(order.total);
                table += '<tr>' +
                '<td>'+ order.datetime +'</td>'+
                '<td>'+ order.order_id +'</td>'+
                '<td>'+ order.customer_name +'</td>'+
                '<td>'+ order.total.toFixed(2) +' Rs</td>'+
                '<td>' +
                    '<span class="btn btn-xs btn-danger delete-order" data-order-id="'+ order.order_id +'">Delete</span>' +
                '</td>' +
            '</tr>';

            });
            table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>'+ totalCost.toFixed(2) +' Rs</b></td></tr>';
            $("table").find('tbody').empty().html(table);
        }
    });

    // View button
    $(document).on('click', '.view-order', function() {
        var orderId = $(this).data('order-id');
        window.location.href = 'http://127.0.0.1:5000/order-details?order_id=' + orderId;
    });

    $(document).on("click", ".delete-order", function () {
        var tr = $(this).closest('tr');
        var orderId = $(this).data('order-id');

        var isDelete = confirm("Are you sure to delete order " + orderId + "?");
        if (isDelete) {
            $.post(orderDeleteApiUrl, { order_id: orderId }, function (response) {
                if (response.success) {
                    alert(response.message);
                    tr.remove(); // remove row from UI
                } else {
                    alert("Delete failed: " + response.message);
                }
            });
        }
    });
});
