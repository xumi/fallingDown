class @Game
  
  @WIDTH  = 1280;
  @HEIGHT = 720;
  
  constructor: (container) ->
    # DOM ccontainer
    @container = container
    # Create an new instance of a stage
    @stage = new PIXI.Stage(0x000000, true);
    # Create a renderer instance
    @renderer = new PIXI.CanvasRenderer(Game.WIDTH, Game.HEIGHT);
    # The scene manager
    @sceneManager = new SceneManager(@)
    # The current scene
    @scene = null
    # Amount of running ticks until now
    @life = 0
    
  start: ->
    @container.appendChild(@renderer.view)
    # Create the assets manager
    @assets = new GameAssets(@)
    
  tick: -> 
    @scene.tick() if @scene
    @life++
    
  setScene: (scene) ->
    @scene = scene
    @stage.addChild(@scene)
    scene.start()
    
  setScale: (s) ->
    @level.setScale(s)
    @renderer.resize(Game.WIDTH*s, Game.HEIGHT*s)
  
  assetsReady: ->
    @level = new Scene(@)
    @stage.addChild(@level)
    @setScale(1)
    _this = @
    requestAnimFrame( -> _this.animate() )
    
  animate: ->
    _this = @
    @tick()
    requestAnimFrame( -> _this.animate() )
    @renderer.render(@stage)