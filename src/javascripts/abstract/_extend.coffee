class PIXIOverrideMixin
  
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
  addX: (dx)  -> @setPosition({"x":@position.x+dx, "y":@position.y})
  addY: (dy)  -> @setPosition({"x":@position.x, "y":@position.y+dy})
  
  setSize: (s) ->
    @width = s.width
    @height = s.height
    @

  getSize: (s) ->
    {
      "width": @getWidth(),
      "height": @getHeight()
    }  

  getHeight:      -> @height
  getWidth:       -> @width
  setWidth:  (w)  -> @setSize({"width":w, "height":@getHeight()})
  setHeight: (h)  -> @setSize({"width": @getWidth(), "height":h})

  @extending: (t) -> (t.prototype[n] = m) for n, m of this.prototype


class @ObjectContainer extends PIXI.DisplayObjectContainer
  constructor: -> PIXI.DisplayObjectContainer.apply(@,arguments) # super doesn't work with PIXI
  PIXIOverrideMixin.extending(ObjectContainer)

class @TilingSprite extends PIXI.TilingSprite
  constructor: -> PIXI.TilingSprite.apply(@,arguments) # super doesn't work with PIXI
  PIXIOverrideMixin.extending(TilingSprite)

class @Sprite extends PIXI.Sprite
  constructor: -> PIXI.Sprite.apply(@,arguments) # super doesn't work with PIXI
  PIXIOverrideMixin.extending(Sprite)

class @Rectangle extends PIXI.Rectangle
  constructor: -> PIXI.Rectangle.apply(@,arguments) # super doesn't work with PIXI
  PIXIOverrideMixin.extending(Rectangle)
  getX:       -> return @x
  getY:       -> return @y  
  setPosition: (p) ->
    @x = p.x
    @y = p.y
    @
  
  
  

class @Text extends PIXI.Text
  constructor: -> PIXI.Text.apply(@,arguments) # super doesn't work with PIXI
  PIXIOverrideMixin.extending(Text)