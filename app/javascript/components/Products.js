import React from 'react'
import { Card, Text } from '@shopify/polaris';
import { useEffect, useState } from 'react';

export default function Products(props) {
    const { token, shop_origin } = props;
    const [products, setProducts] = useState([]);
    const [b, setB] = useState(false);


    useEffect(() => {
        async function displayProducts() {
            var fetchProducts = function () {
                var headers = new Headers({ "Content-Type": "text/javascript", "Authorization": "Bearer " + token });
                return fetch("/products", { headers })
                    .then(response => response.json())
                    .then(data => {
                        var items = data.products;

                        if (items === undefined || items.length == 0) {
                            return
                        } else {                            
                          setProducts(items);
                        }
                    });
            }();
        };
        displayProducts();
    }, [])

    useEffect(() => {
        setB(true);
    }, [products]);

    const handleAddProduct = async () => {
        var headers = new Headers({ "Content-Type": "text/javascript", "Authorization": "Bearer " + token });
        return fetch("/create/product", { headers })
            .then(response => response.json())
            .then(data => {
                var items = data.products;
                console.log(items)
            });
    }

    return (
      <>
       {
        b && products.length > 0 ?
          <>
            {
             products.map((product) => {
                return (
                   <Card>
                   <Text as="h2" variant="bodyMd">
                    {product.title}
                   </Text>
                   <a target="_top" href={`https://${shop_origin.shop_origin}/admin/products/${product.id}`}>Click to Admin page</a> &nbsp;
                   <a target="_top" href={`https://ongraph-store121.myshopify.com/products/${product.handle}`}>Click to user page</a>
                  </Card>
                 )
                })
               }
             </>
            :
            <>
          </>
         }
        <button onClick={handleAddProduct}>Click me to create product</button>
     </>
    )
}
