class @Door extends BaseElement
      
  mouseClick: ->
    super
    return if @goingOut
    @goingOut = true
    @game.sceneManager.change('transitionApartmentOut')