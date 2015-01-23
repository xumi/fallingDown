class @SceneManager
  
  constructor: (game) ->
    @game = game    
    _this = @
    @source = false
    @sourceLoader = new PIXI.JsonLoader('/src/game.json')
    @sourceLoader.on('loaded', (event) -> _this.onRead(event.content.json))
    @sourceLoader.load()
    
  onRead: (json) ->
    _this = @
    @source = json
    @game.setScene(new Scene(@game, @source.default))