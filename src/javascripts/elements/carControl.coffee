class @CarControl extends SceneElement
      
  mouseClick: ->
    super
    @scene.doEmergencyAction()