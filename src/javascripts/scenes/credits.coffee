class @SceneCredits extends Scene
  
  constructor: ->
    super
    @scroller = new BaseElement()  
  
    
    titleStyle = {
      font: "70px Arial",
      fill: "white"
    }
    
    nameStyle = {
      font: "20px Arial",
      fill: "white",
      align:"right"
    }

    roleStyle = {
      font: "20px Arial",
      fill: "white",
    }
    

    @scroller.addChild(new Text("Credits", titleStyle).setX(300))
    
    @addChild(@scroller)
