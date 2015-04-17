-----To return the products names and their category names----
 select products.product_name, categories.category_name from products inner join categories on products.category_id = categories.category_id;


