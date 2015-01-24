class @CarControl extends BaseElement
      
  mouseClick: ->
    super
    @scene.doEmergencyAction()