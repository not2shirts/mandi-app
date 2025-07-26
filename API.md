# Apna Mandi API Contract This document outlines the API endpoints for the Apna Mandi B2B platform, covering both Vendor and Supplier interfaces. --- ## Authentication (Common: Vendor & Supplier) ### `POST /api/auth/register` Registers a vendor or supplier. **Request:**
```json

{  
"role": "vendor" | "supplier",  
"name": "string",  
"phone": "string",  
"password": "string",  
"address": "string"  
}
```

**Response:**
```json
{  
"status": "success",  
"userId": "string",  
"token": "string"  
}

```

### `POST /api/auth/login` Logs in a vendor or supplier. **Request:**
```josn
{  
"phone": "string",  
"password": "string"  
}
```

**Response:**
```json
{  
"status": "success",  
"role": "vendor" | "supplier",  
"userId": "string",  
"token": "string"  
}

```

l ## Vendor Endpoints ### `GET /api/products` Fetch product catalog. **Query Params:**   - `category` (optional) - `supplierId` (optional) - `search` (optional)  **Response:**

```json
[
{  
"productId": "string",  
"name": "string",  
"category": "string",  
"pricePerKg": 45.00,  
"unit": "kg",  
"supplierName": "string",  
"availableQty": 100,  
"qualityGrade": "A/B/C"  
}  
]
```



- ### `POST /api/group-orders/join` Join a group buying order. **Request:**
```json
{  
"productId": "string",  
"quantity": 10  
}
```

`**Response:**`

```json
{  
"groupOrderId": "string",  
"totalAggregatedQty": 120,  
"groupPricePerKg": 42.00  
}
```

- ### `POST /api/orders` Place an individual order. **Request:**

```json
{  
"productId": "string",  
"quantity": 5,  
"orderType": "individual",  
"deliveryOption": "pickup" | "delivery"  
}

```


**Response:**
```json

{  
"orderId": "string",  
"status": "pending"  
}

```


- ### `GET /api/orders` View current & past orders. **Response:**
```json
[  
{  
"orderId": "string",  
"productName": "string",  
"quantity": 10,  
"pricePerKg": 42.00,  
"orderType": "group" | "individual",  
"status": "pending" | "confirmed" | "delivered",  
"estimatedDelivery": "2024-06-24T10:00:00Z"  
}  
]
```


 - ### `GET /api/orders/:orderId` Order tracking and details. **Response:**
```json
{  
"orderId": "string",  
"orderType": "group",  
"trackingStatus": "out_for_delivery",  
"deliveryRoute": [  
"aggregation hub", "drop point A"  
],  
"expectedAt": "2024-06-24T11:00:00Z"  
}
```

- ### `GET /api/vendor/profile` Fetch vendor profile. **Response:**
```json

{  
"vendorId": "string",  
"name": "string",  
"phone": "string",  
"address": "string",  
"paymentMethods": [ "UPI", "Card" ],  
"totalSpent": 15500.50  
}

```

- ### `PUT /api/vendor/profile` Update vendor info. **Request:** (Partial fields allowed, same as above)   **Response:**


```json
{ "status": "updated" }
```


- ## Supplier Endpoints ### `GET /api/supplier/products` Show/manage supplier’s product catalog. **Response:**
```json
[  
{  
"productId": "string",  
"name": "string",  
"category": "string",  
"currentPrice": 42.00,  
"unit": "kg",  
"availableQty": 220,  
"qualityGrade": "A"  
}  
]
```


- ### `POST /api/supplier/products` Add a new product listing. **Request:**
```json
{  
"name": "string",  
"category": "string",  
"pricePerKg": 40.00,  
"availableQty": 150,  
"qualityGrade": "A"  
}
```


**Response:**
```json
 "productId": "string", "status": "created" }
```
{


- ### `PUT /api/supplier/products/:productId` Update product price/qty/availability. **Request:**
```json
{  
"pricePerKg": 44.00,  
"availableQty": 200  
}
```

**Response:**  
```json
{ "status": "updated" }
```

- ### `GET /api/supplier/orders` View all supplier orders (group & individual). **Response:**
```json
[  
{  
"orderId": "string",  
"product": "Onion",  
"totalQty": 20,  
"orderType": "group" | "individual",  
"orderedBy": [ "vendor1", "vendor2" ],  
"expectedPickup": "2024-06-24T11:00:00Z",  
"status": "pending" | "confirmed" | "dispatched"  
}  
]

```

--- ### `GET /api/supplier/orders/:orderId` Detailed info for a specific order. --- ### `POST /api/supplier/route-plan` Submit/generate a delivery route. **Request:**

```json
{  
"orders": [  
{ "orderId": "string", "dropPoint": "Location A" }  
]  
}
```

**Response:**

```json
{ "routeId": "string", "optimized": true }
```

--- ### `GET /api/supplier/complaints` View vendor complaints and queries. **Response:**
```json
[  
{  
"complaintId": "string",  
"vendorId": "string",  
"message": "string",  
"status": "open" | "resolved"  
}  
]
```

- ### `POST /api/supplier/complaints/:complaintId/respond` Respond to vendor complaint. **Request:**
```json
{ "response": "Your delivery is on the way." }
```

**Response:** 
```josn
{ "status": "sent" }
```

- ### General Notes - All endpoints (except register/login) require an auth token (`Authorization: Bearer ...`) in headers. - Common error response:

```json
{  
"status": "error",  
"message": "Description of what went wrong"  
}
```

