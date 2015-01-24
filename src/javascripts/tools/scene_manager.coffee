class @SceneManager
  
  constructor: (game) ->
    @game = game    
    @scene = null
    @transitioningTo = null
    @load()
    
  load: ->
    _this = @
    @source = false
    @sourceLoader = new PIXI.JsonLoader('/src/json/game.json')
    @sourceLoader.on('loaded', (event) -> _this.onRead(event.content.json))
    @sourceLoader.load()
    
  onRead: (json) ->
    _this = @
    @source = json
    @game.scenesReady()
    @change('default')
    # @change('car') # DEBUG
  
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
          @scene = @transitioningTo
          @game.sortLayouts()
          @scene.alpha = 0
          @scene.show()
      else
        @scene = false
        @transitioningTo.alpha += step
        if @transitioningTo.alpha >= 1
          @scene = @transitioningTo
          @game.sortLayouts()
          @scene.setInteractive(true)
          @scene.sortLayouts()
          @scene.alpha = 1
          @transitioningTo = false
    
  change: (sceneID) ->
    @scene.leaving() if @scene
    @game.soundManager.stopMusic()
    sceneSource = @source[sceneID]
    return console.error('Invalid Scene id ', sceneID) if not sceneSource
    if sceneSource.object
      className = 'Scene'+sceneSource.object
      if window[className]
        scene = new window[className](@game, sceneSource)
      else
        console.error('Scene Class ', sceneSource.object, 'is not defined!')
    else
      scene = new Scene(@game, sceneSource)
    @game.addChild(scene)
    @transitioningTo = scene
    @transitioningTo.alpha = 0
    @transitioningTo.start()
    