from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from sql_connection import get_sql_connection
import mysql.connector
import json

import products_dao
import orders_dao
import uom_dao

app = Flask(__name__) # Enable CORS for all routes

connection = get_sql_connection()

@app.route('/getUOM', methods=['GET'])
def get_uom():
    response = uom_dao.get_uoms(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getProducts', methods=['GET'])
def get_products():
    response = products_dao.get_all_products(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertProduct', methods=['POST'])
def insert_product():
    request_payload = json.loads(request.form['data'])
    print("Received payload:", request_payload)
    product_id = products_dao.insert_new_product(connection, request_payload)
    print("Received payload:", request_payload)
    response = jsonify({
        'product_id': product_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/addUOM', methods=['POST'])
def add_uom():
    request_payload = json.loads(request.form['data'])
    uom_id = uom_dao.insert_uom(connection, request_payload)
    response = jsonify({
        'uom_id': uom_id,
        'uom_name': request_payload['uom_name']
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getAllOrders', methods=['GET'])
def get_all_orders():
    response = orders_dao.get_all_orders(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertOrder', methods=['POST'])
def insert_order():
    request_payload = json.loads(request.form['data'])
    order_id = orders_dao.insert_order(connection, request_payload)
    response = jsonify({
        'order_id': order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteOrder', methods=['POST'])
def delete_order():
    try:
        # works if frontend sends { order_id: orderId }
        order_id = request.form.get('order_id')

        success = orders_dao.delete_order(connection, order_id)

        response = jsonify({
            'success': success,
            'message': f'Order {order_id} deleted successfully' if success else f'Order {order_id} not found'
        })
    except Exception as e:
        response = jsonify({
            'success': False,
            'message': f'Delete failed: {str(e)}'
        })

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/deleteProduct', methods=['POST'])
def delete_product():
    return_id = products_dao.delete_product(connection, request.form['product_id'])
    response = jsonify({
        'product_id': return_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/editProduct', methods=['POST'])
def edit_product():
    request_payload = json.loads(request.form['data'])
    product_id = products_dao.edit_product(connection, request_payload)
    response = jsonify({
        'product_id': product_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Grocery Store Management System")
    app.run(port=5000)

