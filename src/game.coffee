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
    @sceneManager = null
    # The states holder
    @states = new GameStates()
    # The camera (hero)
    @camera = null
    # Amount of running ticks until now
    @life = 0
    
  start: ->
    @container.appendChild(@renderer.view)
    # Create the assets manager
    @assets = new GameAssets(@)
    
  tick: -> 
    @life++
    # return unless @life % 10 is 0 # Slow mo
    @sceneManager.tick() if @sceneManager
    @camera.tick() if @camera
    
    
  setScene: (scene) ->
    @sceneManager.change(scene)
    
    
  setScale: (s) ->
    @scene.setScale(s)
    @renderer.resize(Game.WIDTH*s, Game.HEIGHT*s)
  
  assetsReady: ->
    @sceneManager = new SceneManager(@)
    
  scenesReady: ->
    _this = @
    @camera = new Camera(@)
    requestAnimFrame( -> _this.animate() )
  
  stateChanged: ->
    @sceneManager.scene.stateChanged()
    
  animate: ->
    _this = @
    @tick()
    requestAnimFrame( -> _this.animate() )
    @renderer.render(@stage)