Feature: KFC Order placing end to end tests

Scenario Outline: Customer places a <orderType> order
  Given the user is in KFC website and starts to order
  When the user selects order type as "<orderType>" order and searches for location "<location>" with state as "NSW" and country as "Australia"
  And the user selects the store for ordering near to "<location>"
  And the user verifies the order summary for "<orderType>"
  And the user selects category "<category>" and adds item "<item>" with quantity "<quantity>" to the cart
  And the user verifies the item "<item>" with quantity "<quantity>" in My Cart section
  And the user proceeds to checkout and order summary should be displayed
  And the user adds payment method
  Then the user should be able to see the order summary with correct item and price details

Examples:
  | orderType | location | category         | item              | quantity |
  | Pick up   | Dee Why  | SIDES & DESSERTS | 4 Dipping Sauces  | 1        |