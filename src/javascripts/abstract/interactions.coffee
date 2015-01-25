class @InteractionsManager
  
  
  constructor: (game) ->
    @game = game
    
  useOn: (itemClicked) ->
    return if @game.inventory.isHandFree()
    
    # if @game.inventory.isHolding("umbrella")
    #   @game.textManager.setText("Nothing to do here.")
    #
    # if @game.inventory.isHolding("painting")
    #   @game.textManager.setText("Nothing to do here.")

    if @game.inventory.isHolding("lighter")
      return @game.textManager.setText("It won't burn.")

    if @game.inventory.isHolding("knife")
      return @game.textManager.setText("Can't cut it.")
    
    
    @game.textManager.setText("Nothing to do here.")
    