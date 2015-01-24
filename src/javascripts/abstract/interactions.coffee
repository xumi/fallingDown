class @InteractionsManager
  
  
  constructor: (game) ->
    @game = game
    
  useOn: (itemClicked) ->
    return if @game.inventory.isHandFree()
    
    if @game.inventory.isHolding("umbrella")
      @game.textManager.setText("Nothing to do here.")
    
    