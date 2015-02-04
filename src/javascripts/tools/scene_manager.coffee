class @SceneManager
  
  constructor: (game) ->
    @game = game    
    @scene = null
    @transitioningTo = null
    @load()
    
    @transitionStep = 0.01
    @transitionWay  = false
    @transitionMask = new BaseElement().withSprite('abstract/mask.png')
    @transitionMask.setWidth(Game.WIDTH)
    @transitionMask.setHeight(Game.HEIGHT)
    @transitionMask.zIndex = 100
    @transitionMask.alpha = 0
    @game.addChild(@transitionMask)
    
    
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
    @change(@source['default'])
    # @change('apartment') # DEBUG
    # @change('car') # DEBUG
    # @change('transitionCarOut') # DEBUG
    # @change('credits') # DEBUG
  
  tick: ->
    @scene.tick() if @scene
    return unless @transitioningTo
    if @transitionWay == "appear"
      if @transitionMask.alpha < 1
        @transitionMask.alpha += @transitionStep
        if @transitionMask.alpha >= 1
          @transitionMask.alpha = 1
          @disableScene(@scene)
          @scene = @transitioningTo
          @scene.show().alpha = 1
          @transitionWay = "disappear"
          @game.removeStartScreen()
    else if @transitionWay == "disappear"
      @transitionMask.alpha -= @transitionStep
      if @transitionMask.alpha <= 0
        @transitionMask.alpha = 0
        @enableScene(@scene)
        @transitioningTo = false
        @transitionWay = false
        
          
          
  disableScene: (scene) ->
    return unless scene
    scene.hide().setInteractive(false)
    scene.setX(Game.WIDTH).setY(Game.HEIGHT)
    @scene = false
    @game.sortLayouts()
    
  enableScene: (scene) ->
    @scene = scene
    @scene.show()
    @scene.setInteractive(true)
    
  change: (sceneID) ->
    @game.inventory.reset()
    @scene.setInteractive(false) if @scene
    @scene.leaving() if @scene
    @game.soundManager.stopMusic()
    @game.inventory.reset()
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
    @transitionWay = "appear"
    