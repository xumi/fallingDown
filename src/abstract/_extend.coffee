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
  addX: (dx) -> @setPosition({"x":@position.x+dx, "y":@position.y})
  addY: (dy) -> @setPosition({"x":@position.x, "y":@position.y+dy})

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

  
class @Text extends PIXI.Text
  constructor: -> PIXI.Text.apply(@,arguments) # super doesn't work with PIXI
  PIXIOverrideMixin.extending(Text)