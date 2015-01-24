class @GameStates
  
  constructor: (game) ->
    @game = game
    @states = {}
    
  incState: (id) ->
    @states[id] = if @states[id] then @states[id] + 1 else 1
    @game.stateChanged()
  
  setState: (id, value) ->
    changed = @states[id] is not value
    @states[id] = value
    @game.stateChanged() if changed
    