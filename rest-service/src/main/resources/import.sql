insert into user(id,username,password,activated) values(1,'admin','{bcrypt}$2y$12$S/r1ipUCkdXbiIV6B1XUQukRDLSVyWJDOEBCI7XpQyGCurYbcf8TK',1);
insert into user(id,username,password,activated) values(2,'user','{bcrypt}$2y$12$S/r1ipUCkdXbiIV6B1XUQukRDLSVyWJDOEBCI7XpQyGCurYbcf8TK',0);

insert into role(id,name) values(1,'ADMIN');
insert into role(id,name) values(2,'USER');

insert into user_role(user_id,role_id) values(1,1);
insert into user_role(user_id,role_id) values(1,2);
insert into user_role(user_id,role_id) values(2,2);

insert into item(id,created_date,modified_date,name,description) values(1,'2020-03-04 06:08:28','2020-03-04 06:08:28','arabika kilimanjaro coffee bean','Grown in the fertile volcanic soil of Mount Kilimanjaro, this renowned and highly desirable bean has hints of bittersweet dark chocolate. A deep and luxurious coffee you will want to savour.');
insert into item(id,created_date,modified_date,name,description) values(2,'2020-03-04 06:08:28','2020-03-04 06:08:28','arabika gayo coffe bean','This Acehnese coffee has a thinner texture or not too thick with balanced acidity. Suitable for you who are not fond of sour coffee.');
insert into item(id,created_date,modified_date,name,description) values(3,'2020-03-04 06:08:28','2020-03-04 06:08:28','arabika kintamani coffe bean','The taste is unique because of the dominance of fresh citrus acid and the fragrance of flowers, with moderate acidity and thickness.');
insert into item(id,created_date,modified_date,name,description) values(4,'2020-03-04 06:08:28','2020-03-04 06:08:28','ground kilimanjaro coffe','ground from selected kilimanjaro coffe beans');
insert into unit(id,created_date,modified_date,name,description) values(1,'2020-03-04 06:08:28','2020-03-04 06:08:28','kg',"kilogram unit for whole coffe bean.");
insert into unit(id,created_date,modified_date,name,description) values(2,'2020-03-04 06:08:28','2020-03-04 06:08:28','g',"gram unit for whole coffe bean.");
insert into unit(id,created_date,modified_date,name,description) values(3,'2020-03-04 06:08:28','2020-03-04 06:08:28','Pack',"packet of ground coffe with 250 grams weight.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(1,'2020-03-04 06:08:28','2020-03-04 06:08:28',0,7500000,"purchasing 50 kg of arabika kilimanjaro coffe bean.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(2,'2020-03-04 06:08:28','2020-03-04 06:08:28',0,6000000,"purchasing 40 kg of arabika gayo coffe bean.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(3,'2020-03-04 06:08:28','2020-03-04 06:08:28',0,500000,"purchasing 30 kg of arabika kintamani coffe bean.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(4,'2020-03-04 06:08:28','2020-03-04 06:08:28',1,9000000,"purchasing 100 pack of ground kilimanjaro coffe.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(5,'2020-05-04 06:08:28','2020-05-04 06:08:28',1,7500000,"purchasing 50 kg of arabika kilimanjaro coffe bean.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(6,'2020-05-04 06:08:28','2020-05-04 06:08:28',1,6000000,"purchasing 40 kg of arabika gayo coffe bean.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(7,'2020-05-04 06:08:28','2020-05-04 06:08:28',1,500000,"purchasing 30 kg of arabika kintamani coffe bean.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(8,'2020-05-04 06:08:28','2020-05-04 06:08:28',0,9000000,"purchasing 100 pack of ground kilimanjaro coffe.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(9,'2020-05-04 06:08:28','2020-05-04 06:08:28',0,7500000,"purchasing 50 kg of arabika kilimanjaro coffe bean.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(10,'2020-06-04 06:08:28','2020-06-04 06:08:28',2,6000000,"purchasing 40 kg of arabika gayo coffe bean.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(11,'2020-06-04 06:08:28','2020-06-04 06:08:28',2,500000,"purchasing 30 kg of arabika kintamani coffe bean.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(12,'2020-06-04 06:08:28','2020-06-04 06:08:28',2,9000000,"purchasing 100 pack of ground kilimanjaro coffe.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(13,'2020-06-04 06:08:28','2020-06-04 06:08:28',2,7500000,"purchasing 50 kg of arabika kilimanjaro coffe bean.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(14,'2020-06-04 06:08:28','2020-06-04 06:08:28',1,6000000,"purchasing 40 kg of arabika gayo coffe bean.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(15,'2020-07-04 06:08:28','2020-07-04 06:08:28',1,500000,"purchasing 30 kg of arabika kintamani coffe bean.");
insert into transaction(id,created_date,modified_date,type,amount,description) values(16,'2020-07-04 06:08:28','2020-07-04 06:08:28',1,9000000,"purchasing 100 pack of ground kilimanjaro coffe.");1


insert into stock(id,created_date,modified_date,qty,item_id,unit_id) values (1, '2020-03-04 06:08:28', NULL, 50, 1,1)
insert into stock(id,created_date,modified_date,qty,item_id,unit_id) values (2, '2020-03-04 06:08:28', NULL, 40, 2,1)
insert into stock(id,created_date,modified_date,qty,item_id,unit_id) values (3, '2020-03-04 06:08:28', NULL, 30, 3,1)
insert into stock(id,created_date,modified_date,qty,item_id,unit_id) values (4, '2020-03-04 06:08:28', NULL, 100, 4,3)
insert into stock(id,created_date,modified_date,qty,item_id,unit_id) values (5, '2020-03-04 06:08:28', NULL, 50, 1,1)
insert into stock(id,created_date,modified_date,qty,item_id,unit_id) values (6, '2020-03-04 06:08:28', NULL, 40, 2,1)
insert into stock(id,created_date,modified_date,qty,item_id,unit_id) values (7, '2020-03-04 06:08:28', NULL, 30, 3,1)
insert into stock(id,created_date,modified_date,qty,item_id,unit_id) values (8, '2020-03-04 06:08:28', NULL, 100, 4,3)
insert into stock(id,created_date,modified_date,qty,item_id,unit_id) values (9, '2020-03-04 06:08:28', NULL, 50, 1,1)
insert into stock(id,created_date,modified_date,qty,item_id,unit_id) values (10, '2020-03-04 06:08:28', NULL, 40, 2,1)
insert into stock(id,created_date,modified_date,qty,item_id,unit_id) values (11, '2020-03-04 06:08:28', NULL, 30, 3,1)
insert into stock(id,created_date,modified_date,qty,item_id,unit_id) values (12, '2020-03-04 06:08:28', NULL, 100, 4,3)
