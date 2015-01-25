class @GameAssets
  
  @ASSETS = false
  
  @ROOT = '/assets/'
  
  constructor: (game) ->
    @game = game    
    _this = @
    
    @sourceLoader = new PIXI.JsonLoader('/src/json/assets.json')
    @sourceLoader.on('loaded', (event) -> _this.onRead(event.content.json))
    
    @startBackground = new PIXI.JsonLoader('/src/json/assets.json')
    @startBackground.on('loaded', (event) -> _this.sourceLoader.load())
    
    @startBackground.load()
    
    
  onRead: (json) ->
    _this = @
    GameAssets.ASSETS = json
    @loader = new PIXI.AssetLoader(@buildAssets())
    @loader.onComplete = -> _this.game.assetsReady()
    @loader.load()
    
    
  buildAssets: ->
    assets = []
    for path in GameAssets.ASSETS['images']
      image_path = GameAssets.toPath('images', path)
      assets.push(image_path)
    assets
  
  @getImage: (name) ->
    PIXI.Texture.fromImage( GameAssets.toPath('images', name) )

  @getFrame: (name) ->
    PIXI.Texture.fromFrame( GameAssets.toPath('images', name) )
  
  @toPath: (type, path) ->
    GameAssets.ROOT+type+'/'+path