class @Wardrobe extends BaseElement
      
  constructor: ->
    super
    @state = 'closed'
      
  mouseClick: ->
    super
    if @state is 'closed'
      @state = 'opened'
      @game.textManager.setText("What's that shinny thing !?")
      @game.soundManager.playSound('apartment-wardrobe')
      
    