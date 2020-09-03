SCHEMA:
Transaction
- id
- amount
- type
- description
- createdDate
- modifiedDate

Stock
- id
- item_id
- quantity
- unit_id

Item
- id
- name

Unit
- id
- name
- description


API:
Global
- add
- edit
- delete
- find
- findAll

Transaction
- summary (type, amount): current, monthly, annual

Stock
- summary (name, quantity)