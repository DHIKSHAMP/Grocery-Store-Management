var productModal = $("#productModal");
    $(function () {

        //JSON data by API call
        $.get(productListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, product) {
                    table += '<tr data-id="'+ product.product_id +'" data-name="'+ product.name +'" data-unit="'+ product.uom_id +'" data-price="'+ product.price_per_unit +'">' +
                        '<td>'+ product.name +'</td>'+
                        '<td>'+ product.uom_name +'</td>'+
                        '<td>'+ product.price_per_unit +'</td>'+
                        '<td>' +
                            '<span class="btn btn-xs btn-primary edit-product">Edit</span> ' +
                            '<span class="btn btn-xs btn-danger delete-product">Delete</span>' +
                        '</td>'+
                    '</tr>';        
                });
                $("table").find('tbody').empty().html(table);
            }
        });
    });
var uomModal = $("#uomModal");
    // Save Product
    $("#saveProduct").on("click", function () {
        var data = $("#productForm").serializeArray();
        var requestPayload = {
            product_id: null,
            product_name: null,
            uom_id: null,
            price_per_unit: null
        };

        for (var i = 0; i < data.length; ++i) {
            var element = data[i];
            switch (element.name) {
                case 'id':
                    requestPayload.product_id = element.value;
                    break;
                case 'name':
                    requestPayload.product_name = element.value;
                    break;
                case 'uoms':
                    requestPayload.uom_id = element.value;
                    break;
                case 'price':
                    requestPayload.price_per_unit = element.value;
                    break;
            }
        }

        let apiUrl = (parseInt(requestPayload.product_id) > 0)? productEditApiUrl: productAddApiUrl;


        callApi("POST", apiUrl, {
            'data': JSON.stringify(requestPayload)
        });
    });


    $(document).on("click", ".delete-product", function (){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete "+ tr.data('name') +" item?");
        if (isDelete) {
            callApi("POST", productDeleteApiUrl, data);
        }
    });

    $(document).on("click", ".edit-product", function () {
        const tr = $(this).closest("tr");
        $("#id").val(tr.data("id"));          // hidden field
        $("#name").val(tr.data("name"));
        $("#uoms").val(tr.data("unit"));
        $("#price").val(tr.data("price"));
        $("#productModal").modal("show");
    });


    productModal.on('hide.bs.modal', function(){
        $("#id").val('0');
        $("#name, #unit, #price").val('');
        productModal.find('.modal-title').text('Add New Product');
    });

    productModal.on('show.bs.modal', function(){
        //JSON data by API call
        $.get(uomListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, uom) {
                    options += '<option value="'+ uom.uom_id +'">'+ uom.uom_name +'</option>';
                });
                $("#uoms").empty().html(options);
            }
        });
    });

    //Save Unit of Measure
    $("#saveUOM").on("click", function () {
        var uomId = $("#uom_id").val();
        var uomName = $("#uom_name").val().trim();

        if (!uomName) {
            alert("Please enter UOM name.");
            return;
        }

        var requestPayload = {
            uom_id: uomId,
            uom_name: uomName
        };

        var apiUrl = (uomId && uomId !== '0') ? uomEditApiUrl : uomSaveApiUrl;

        callApi("POST", apiUrl, {
            data: JSON.stringify(requestPayload)
        });

        // Optional: close modal and refresh UOM list after save
        $("#uomModal").modal("hide");
    });


    uomModal.on('hide.bs.modal', function(){
        $("#uom_id").val('0');
        $("#uom_name").val('');
        uomModal.find('.modal-title').text('Add New Unit of Measure');
    });

    uomModal.on('show.bs.modal', function(){
        //JSON data by API call
        $.get(uomListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, uom) {
                    options += '<option value="'+ uom.uom_id +'">'+ uom.uom_name +'</option>';
                });
                $("#uoms").empty().html(options);
            }
        });
    });