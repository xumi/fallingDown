class @SceneBackground extends BaseElement

  constructor: (game, backgroundPath) ->
    super
    @withSprite(backgroundPath)
    @setInteractive(true)

  mouseClick: ->
    @game.inventory.reset()