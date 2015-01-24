class @Phone extends BaseElement
      
  mouseClick: ->
    super
    # test = @scene.findElement('test')
    # test.toggle()
    @game.camera.blink(2)
  
  # mouseOver: ->
  #   console.log('over')
  #
  # mouseOut: ->
  #   console.log('out')