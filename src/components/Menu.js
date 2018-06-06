import React, { Component } from 'react';
import anime from 'animejs'

/*
* css
*/
import '../styles/Menu.css'


class App extends Component {
  constructor(props) {
    super(props);

    /*
    * Expected props:
    *   - width: Int in percentage
    *   - OR height: Int in percentage
    *   - color: String
    *   - food = {
    *       a: {
    *         value: "Button1",
    *         action: () => {
    *           alert("test1")
    *         }
    *       },
    *       b: {
    *         value: "Button2",
    *         action: () => {
    *           alert("test2")
    *         }
    *       },
    *       c: {
    *         value: "Button3",
    *         action: () => {
    *           alert("test3")
    *         }
    *       }
    *     }
    */

    this.state = {
      id: this.getId(),
      open: false
    }
  }


  componentDidMount() {
    //Event listener for click
    document.addEventListener("click", (event) => {
      const id = this.state.id;
      const open = this.state.open;

    	if(event.target.closest('#'+id) && !open) {
        this.setState({
          open: true
        });
      }

      if(!event.target.closest('#'+id) && open) {
        this.setState({
          open: false
        });
      }
    });
  }


  componentDidUpdate() {
    const id = this.state.id;

    //Targets that will be triggered
    var targetDots = document.querySelectorAll('#'+id+' .Menu_dot');
    var targetButton = document.querySelectorAll('#'+id+' .Menu_button');
    var targetMenu = document.querySelector('#'+id+'.Menu');



    if(this.state.open) {
      var animation = anime.timeline();

      //Display buttons
      targetButton.forEach((element) => {
        element.style.display = "block";
      });

      //Remove hover effect
      targetMenu.classList.remove("Menu_closed");

      animation
        .add({
          targets: targetDots,
          translateX: ["-44.5%","0%"],
          translateY: function(targetElements, i, l) {
            if(i===0) return ["-44%","0%"];
            if(i===1) return ["-44%","79%"];
            if(i===2) return ["-44%","157%"];
          },
          scaleX: [0.1,1],
          scaleY: [0.14,1],
          borderRadius: {
            value: 0,
            easing: "easeOutCubic",
            duration: 1000
          },
          duration: 2000,
          backgroundColor: "rgb(255, 255, 255)"
        })
        .add({
          targets: targetButton,
          scaleX: [2.5,1],
          opacity: 1,
          duration: function(targetElements, i, l) {
            return 400 + (i * 200);
          },
          easing: 'easeOutCubic',
          offset: '-=1700'
        });
    } else {
      animation = anime.timeline();
      const color = this.getColor();

      //Remove hover effect
      targetMenu.classList.add("Menu_closed");

      animation
        .add({
          targets: targetButton,
          scaleX: [1,2.5],
          duration: function(targetElements, i, l) {
            return 400 + (i * 200);
          },
          opacity: 0,
          easing: 'easeInOutCubic'
        })
        .add({
          targets: targetDots,
          translateX: ["0%","-44.5%"],
          translateY: function(targetElements, i, l) {
            if(i===0) return ["0%","-44%"];
            if(i===1) return ["79%","-44%"];
            if(i===2) return ["157%","-44%"];
          },
          scaleX: [1,0.1],
          scaleY: [1,0.14],
          borderRadius: "100%",
          duration: 1000,
          backgroundColor: this.getColor(),
          easing: "easeInOutCubic",
          offset: '-=500'
        });

        //Remove menu after animation finished
        animation.complete = function() {
          targetButton.forEach((element) => {
            element.style.display = "none";
          });
        };
    }
  }


  getId() {
    var random = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 5; i++)
      random += possible.charAt(Math.floor(Math.random() * possible.length));

    while(true) {
      if(!document.getElementById(random)) {
        return random;
      }
    }
  }


  getDimensions() {
    //Input values
    const inputWidth = this.props.width;
    const inputHeight = this.props.height;

    if(!(inputWidth ||inputHeight)) {
      console.log("Please define a height OR width!");
    }
    //Units and values seperated
    if(inputWidth !== undefined) {
      //Width
      const unitWidth = inputWidth.replace(/[\d]+/g,"");
      const valueWidth = parseFloat(inputWidth);
      //Height
      const unitHeight = unitWidth;
      const valueHeight = valueWidth * 2.5;

      return {
        width: String(valueWidth) + unitWidth,
        height: String(valueHeight) + unitHeight
      }
    }

    //Height
    const unitHeight = inputHeight.replace(/[\d]+/g,"");
    const valueHeight = parseFloat(inputHeight);
    //Width
    const unitWidth = unitHeight;
    const valueWidth = valueHeight / 2.5;

    return {
      width: String(valueWidth) + unitWidth,
      height: String(valueHeight) + unitHeight
    }
  }


  getColor() {
    return this.props.color ? this.props.color : "rgb(255, 255, 255)";
  }


  render() {
    const style = {
      width: this.getDimensions().width,
      height: this.getDimensions().height
    };

    const styleDot = {
      backgroundColor: this.getColor()
    };

    const styleFont = {fontSize: style.width};

    return (
      <div style={style} id={this.state.id} className="Menu Menu_closed">
          <div className="Menu_dotBox">
            <div style={styleDot} className="Menu_dot Menu_dotA">
              <div className="Menu_button" style={styleFont} onClick={this.props.food.a.action}>
                {this.props.food.a.value}
              </div>
            </div>
          </div>
          <div className="Menu_dotBox">
            <div style={styleDot} className="Menu_dot Menu_dotB">
              <div className="Menu_button" style={styleFont} onClick={this.props.food.b.action}>
                {this.props.food.b.value}
              </div>
            </div>
          </div>
          <div className="Menu_dotBox">
            <div style={styleDot} className="Menu_dot Menu_dotC">
              <div className="Menu_button" style={styleFont} onClick={this.props.food.c.action}>
                {this.props.food.c.value}
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
