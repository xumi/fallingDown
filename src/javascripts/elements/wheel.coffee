class @Wheel extends SceneElement
      
  constructor: ->
    super
    @zIndex = 2
    @withSprite('elements/car-wheel.png')
    @pivot.x = @getWidth() / 2
    @pivot.y = @getHeight() / 2
    @i = 0
    
    decal = (Math.PI / 120)
    amount = 14
    @positions = []
    @insertPositions(amount, Math.PI*2 - decal)
    @insertPositions(amount, Math.PI*2)
    @insertPositions(amount, Math.PI*2 - decal / 2)
    @insertPositions(amount, Math.PI*2)
    @insertPositions(amount, Math.PI*2)
    @insertPositions(amount, Math.PI*2 + decal / 2)
    @insertPositions(amount, Math.PI*2)
    @insertPositions(amount, Math.PI*2)
    @insertPositions(amount, Math.PI*2 + decal)
    @insertPositions(amount, Math.PI*2)

  insertPositions: (amount, value) ->
    @positions.push(value) for x in [0...amount]
      
    
  tick: ->
    @i++
    position = (@i % @positions.length)
    angle = @positions[position]
    @rotation = angle