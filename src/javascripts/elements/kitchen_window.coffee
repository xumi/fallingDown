class @KitchenWindow extends SceneElement
      
  mouseClick: ->
    super
    @game.textManager.setText([
      "The night is dark.",
      "And full of terror.",
      "I read it somewhere."
    ])
