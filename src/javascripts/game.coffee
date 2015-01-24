class @Game
  
  @WIDTH   = 1280;
  @HEIGHT  = 720;
  
  @DEV_ENV = true
  @MUTE    = false
  
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
    # The main text
    @textManager = null
    # Basic inventory
    @inventory = new Inventory(@)
    # Amount of running ticks until now
    @life = 0
    
  start: ->
    @container.appendChild(@renderer.view)
    # Create the assets manager
    @assets = new GameAssets(@)
    # Let's play some songs!
    @soundManager = new GameSounds(@)
    
  tick: -> 
    @life++
    # return unless @life % 10 is 0 # Slow mo
    @sceneManager.tick() if @sceneManager
    @camera.tick() if @camera
    
  addChild: (child) ->
    @stage.addChild(child)  
    @sortLayouts()
  
  sortLayouts: ->
    @stage.children.sort((a,b) ->
      return -1 if (a.zIndex < b.zIndex)
      return 1 if (a.zIndex > b.zIndex)
      0
    )
    @
  
  setScene: (scene) ->
    @sceneManager.change(scene)
    
    
  setScale: (s) ->
    @scene.setScale(s)
    @renderer.resize(Game.WIDTH*s, Game.HEIGHT*s)
  
  assetsReady: ->
    @ssets
    @sceneManager = new SceneManager(@)
    @textManager = new TextManager(@)
    
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