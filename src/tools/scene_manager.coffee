class @SceneManager
  
  constructor: (game) ->
    @game = game    
    @scene = null
    @transitioningTo = null
    @load()
    
  load: ->
    _this = @
    @source = false
    @sourceLoader = new PIXI.JsonLoader('/src/game.json')
    @sourceLoader.on('loaded', (event) -> _this.onRead(event.content.json))
    @sourceLoader.load()
    
  onRead: (json) ->
    _this = @
    @source = json
    @game.scenesReady()
    @change('default')
  
  tick: ->
    @scene.tick() if @scene
    if @transitioningTo
      @scene.setInteractive(false) if @scene
      step = .01
      if @scene and @scene.alpha > 0
        @scene.alpha -= step
        if @scene.alpha < 0
          @scene.alpha = 0 
          @scene.hide()
          
          @transitioningTo.alpha = 0
          @transitioningTo.show()
          # @transitioningTo.setInteractive(true)
          
      else 
        @transitioningTo.alpha += step
        if @transitioningTo.alpha >= 1
          @scene = @transitioningTo
          @scene.setInteractive(true)
          @scene.alpha = 1
          @transitioningTo = false
    # else
    #   @scene.alpha = 1 if @scene
    
  change: (sceneID) ->
    scene = new Scene(@game, @source[sceneID])
    @game.stage.addChild(scene)
    # @scene.alpha = 1
    @transitioningTo = scene
    @transitioningTo.alpha = 0
    @transitioningTo.start()
    