Feature: KFC Order placing end to end tests

Scenario Outline: Customer places a <orderType> order
  Given the user is in KFC website and starts to order
  When the user selects order type as "<orderType>" order and searches for location "<location>" with state as "NSW" and country as "Australia" 
  And the user selects the store for ordering near to "<location>"
  And the user verifies the order summary for "<orderType>"
  And the user selects category "Sides & Desserts"
  And the user adds item "4 Dipping Sauces" to the cart
  And the user proceeds to checkout and order summary should be displayed
  Then the user should be able to see the order summary with correct item and price details

  Examples:
    | orderType | location |
    | Pick up   | Dee Why  |
    | Pick up   | Parramatta |
    # | Delivery  | Dee Why  |
    