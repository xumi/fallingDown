class @Door extends SceneElement
  
  constructor: ->
    super
    @knockSoundVisual = new KnockSound(@game)
    @addChild(@knockSoundVisual)
    
      
  mouseClick: ->  
    
    if @scene.findElement('keys').visible
      @game.sceneManager.change('transitionApartmentOut')
      @game.soundManager.playSound('apartment-walking')
      return
      
    if @game.inventory.isHandFree()
      if @knockSoundVisual.knocking
        @open()
        return
      if @scene.findElement('georgette').dead
        if @scene.onFire
          @game.textManager.setText("I cannot leave by foot, they will find me. Better take his car.")
        else
          @game.textManager.setText("I need to fix this mess.")
      else
        @game.textManager.setText("I cannot leave him leave like that.")
    
    
    
    
    super
    
  open: ->
    @game.inventory.reset()
    @knockSoundVisual.stop()
    @scene.findElement('georgette').enter()
    
    
  tick: ->
    @knockSoundVisual.tick() if @knockSoundVisual.knocking
    
  knock: ->
    @neighborVisited = true
    @knockSoundVisual.start()