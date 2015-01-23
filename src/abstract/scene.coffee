class @Scene extends GameElement
  
  
  constructor: (game, source) ->
    super
    @source           = source
    @backgrounds      = []
    @backgroundSpeed  = 1
    @elements         = []
    
  
  
  start: ->
    @loadBackgrounds()
    @loadElements()
    
    
  loadBackgrounds: ->
    bgs = if (@source.background instanceof Array) then @source.background else [@source.background]
    for bg in bgs
      @backgrounds.push(new Sprite(GameAssets.getImage(bg), Game.WIDTH, Game.HEIGHT))
    @backgroundSpeed = parseInt(@source.backgroundSpeed) if @source.backgroundSpeed
    @addChild(@backgrounds[0])
  
  loadElements: ->
    for e in @source.elements
      
      if e.object 
        if window[e.object]
          element = new window[e.object]
        else
          console.error('Class ', e.object, 'is not defined!')
      else # This is a generic object
        element = new GameElement()

      element.withSprite(e.sprite)
      element.setScene(@)
      element.setInteractive(true)
      element.setID(e.id)
      element.setPosition(e.position)
      @elements.push(element)
      @addChild(element)
      
    
  findElement: (id) ->
    found = null
    for element in @elements
      found = element if element.id is id
      break if found
    found
        
  tick: ->
    element.tick() for element in @elements

    # if @backgroundSpeed > 1 and @game.life % @backgroundSpeed is 0
      #console.log('change background')
    
      
      