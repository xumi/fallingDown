class @ObjectContainer extends PIXI.DisplayObjectContainer
  
  constructor: ->
    PIXI.DisplayObjectContainer.apply(@,arguments) # super doesn't work with PIXI

  setScale: (r) ->
    @scale.x = r
    @scale.y = r
    @    
    
  getPosition: (p) ->
    {
      x: @getX(),
      y: @getY()
    }

  setPosition: (p) ->
    @position.x = p.x
    @position.y = p.y
    @
    
  getX:       -> return @position.x
  getY:       -> return @position.y  
  setX: (x)   -> @setPosition({"x":x, "y":@getY()})
  setY: (y)   -> @setPosition({"x": @getX(), "y":y})



class @TilingSprite extends PIXI.TilingSprite
  
  constructor: ->
    PIXI.TilingSprite.apply(@,arguments) # super doesn't work with PIXI

  setScale: (r) ->
    @scale.x = r
    @scale.y = r
    @    
    
  getPosition: (p) ->
    {
      x: @getX(),
      y: @getY()
    }

  setPosition: (p) ->
    @position.x = p.x
    @position.y = p.y
    @
    
  getX:       -> return @position.x
  getY:       -> return @position.y  
  setX: (x)   -> @setPosition({"x":x, "y":@getY()})
  setY: (y)   -> @setPosition({"x": @getX(), "y":y})



class @Sprite extends PIXI.Sprite
  
  constructor: ->
    PIXI.Sprite.apply(@,arguments) # super doesn't work with PIXI

  setScale: (r) ->
    @scale.x = r
    @scale.y = r
    @    
    
  getPosition: (p) ->
    {
      x: @getX(),
      y: @getY()
    }

  setPosition: (p) ->
    @position.x = p.x
    @position.y = p.y
    @
    
  getX:       -> return @position.x
  getY:       -> return @position.y  
  setX: (x)   -> @setPosition({"x":x, "y":@getY()})
  setY: (y)   -> @setPosition({"x": @getX(), "y":y})