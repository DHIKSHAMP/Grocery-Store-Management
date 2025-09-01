
def get_uoms(connection):
    cursor = connection.cursor()
    query = ("select * from uom")
    cursor.execute(query)
    response = []
    for (uom_id, uom_name) in cursor:
        response.append({
            'uom_id': uom_id,
            'uom_name': uom_name
        })
    return response

def insert_uom(connection, uom):
    cursor = connection.cursor()
    query = "INSERT INTO uom (uom_name) VALUES (%s)"
    data = (uom['uom_name'], )
    try:
        cursor.execute(query, data)
        connection.commit()
        return cursor.lastrowid  # ✅ Return the newly inserted ID
    except Exception as e:
        connection.rollback()
        raise e
    finally:
        cursor.close()

if __name__ == '__main__':
    from sql_connection import get_sql_connection

    connection = get_sql_connection()
    # print(get_all_products(connection))
    print(get_uoms(connection))