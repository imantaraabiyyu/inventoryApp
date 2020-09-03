insert into item(id,created_date,modified_date,name,description) values(1,'2020-03-04 06:08:28','2020-03-04 06:08:28','Kopi Bubuk','Kopi nya tidur.');
insert into item(id,created_date,modified_date,name,description) values(2,'2020-03-04 06:08:28','2020-03-04 06:08:28','Kopi Tubruk','Kopi nya ditubruk.');
insert into unit(id,created_date,modified_date,name,description) values(1,'2020-03-04 06:08:28','2020-03-04 06:08:28','Pack',"Packet of product with 140 grams weight.");
insert into transaction(id,created_date,modified_date,type,amount) values(1,'2020-03-04 06:08:28','2020-03-04 06:08:28','Buying',30);
insert into stock(id,created_date,modified_date,qty,transaction_id,item_id,unit_id) values (1, '2020-03-04 06:08:28', NULL, 800, 1, 1,1)
