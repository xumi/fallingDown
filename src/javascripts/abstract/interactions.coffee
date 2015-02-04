class @InteractionsManager
  
  
  constructor: (game) ->
    @game = game
    
  useOn: (itemClicked) ->
    return if @game.inventory.isHandFree()

    if @game.inventory.isHolding("lighter")
      @game.inventory.reset()
      return @game.textManager.setText("It won't burn.")

    if @game.inventory.isHolding("knife")
      @game.inventory.reset()
      return @game.textManager.setText("Can't cut it.")
      
    
    @game.inventory.reset()
    if @game.sceneManager.scene.onFire
      @game.textManager.setText("No time for that, it's getting hot in here!")
    else
      @game.textManager.setText("Nothing to do here.")
      
    