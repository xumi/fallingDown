class @Phone extends BaseElement
      
  mouseClick: ->

    if @game.inventory.isHandFree()
      if @scene.findElement('knife').grabbed
        @game.textManager.setText("I have to clean this mess myself now...")
        return
      else
        @call911()
        return
    super
    
  call911: ->
    @game.sceneManager.change('transition911')