class @Inventory extends BaseElement
  
  constructor: (game) ->
    super
    @zIndex = 97
    
    @useItem = null
    @onItem  = null
    
    @game.addChild(@)
    
    style = {
        font: "20px Arial",
        fill: "white",
        stroke: "black"
        strokeThickness: 7
      }
    @textHolder = new Text("", style)
    @addChild(@textHolder)
    @place()
    
  reset: ->
    @useItem = null
    @onItem = null
    @update()
    
  use: (element) ->
    @useItem = element
    @update()
    
  on: (element) ->
    return unless @useItem
    return if (@useItem and element) and @useItem.id is element.id
    @onItem = element
    @update()
    
  isHolding: (id) ->
    @useItem and @useItem.id is id
    
  place: ->
    @setX(10)
    @setY(Game.HEIGHT - @textHolder.height - 10)
    
  update: ->
    @onItem = null if (@useItem and @onItem) and @useItem.id is @onItem.id
    text = ""
    if @useItem
      text += "Use "+@useItem.title
      text += " with "+@onItem.title if @onItem
    @textHolder.setText(text)
    @textHolder.visible = text isnt ""
    @