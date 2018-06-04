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
    var targetElement = document.querySelectorAll('#'+id+' .Menu_element');
    var targetElements = document.querySelector('#'+id+' .Menu_elements');
    var targetMenu = document.querySelector('#'+id+'.Menu');



    if(this.state.open) {
      var animation = anime.timeline();

      //Display elements
      targetElements.style.display = "block";

      //Remove hover effect
      targetMenu.classList.remove("Menu_closed");

      animation
        .add({
          targets: targetDots,
          scaleX: 9,
          scaleY: 10,
          borderRadius: 0,
          duration: 1300,
          translateY: "40%",
          backgroundColor: "rgb(255, 255, 255)",
          easing: 'easeOutExpo'
        })
        .add({
          targets: targetElement,
          scaleX: [2,1],
          opacity: 1,
          duration: function(targetElements, i, l) {
            return 500 + (i * 200);
          },
          easing: 'easeInOutQuart',
          offset: '-=1100'
        });
    } else {
      animation = anime.timeline();
      const color = this.getColor();

      //Remove hover effect
      targetMenu.classList.add("Menu_closed");

      animation
        .add({
          targets: targetElement,
          scaleX: [1,2],
          opacity: 0,
          duration: function(targetElements, i, l) {
            return 500 + (i * 200);
          },
          easing: 'easeInOutQuart'
        })
        .add({
          targets: targetDots,
          scaleX: 1,
          scaleY: 1,
          borderRadius: "100%",
          duration: 1300,
          translateY: 0,
          backgroundColor: color,
          easing: 'easeOutExpo',
          offset: '-=500'
        });

        //Remove menu after animation finished
        animation.complete = function() {
          targetElements.style.display = "none";
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

    return (
      <div style={style} id={this.state.id} className="Menu Menu_closed">
        <div className="Menu_dots">
          <div className="Menu_dotBox">
            <div style={styleDot} className="Menu_dot">

            </div>
          </div>
          <div className="Menu_dotBox">
            <div style={styleDot} className="Menu_dot">

            </div>
          </div>
          <div className="Menu_dotBox">
            <div style={styleDot} className="Menu_dot">

            </div>
          </div>
        </div>

        <div className="Menu_elements">
          <div className="Menu_button Menu_element" onClick={this.props.food.a.action}>
            {this.props.food.a.value}
          </div>
          <div className="Menu_button Menu_element" onClick={this.props.food.b.action}>
            {this.props.food.b.value}
          </div>
          <div className="Menu_button Menu_element" onClick={this.props.food.c.action}>
            {this.props.food.c.value}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
