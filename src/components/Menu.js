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

    this.open = false;
    this.id = this.getId();
  }


  componentDidMount() {
    //Event listener for click
    document.addEventListener("click", (event) => {
      const id = this.id;
      const open = this.open;

    	if(event.target.closest('#'+id) && !open) {
        this.open = true;
        this.animate();
      }

      if(!event.target.closest('#'+id) && open) {
        this.open = false;
        this.animate();
      }
    });
  }


  animate() {
    const id = this.id;

    //Targets that will be triggered
    var targetDots = document.querySelectorAll('#'+id+' .ram-Menu_dot');
    var targetButton = document.querySelectorAll('#'+id+' .ram-Menu_button');
    var targetMenu = document.querySelector('#'+id+'.ram-Menu');



    if(this.open) {
      var animation = anime.timeline();

      //Styles
      targetButton.forEach((element) => {
        element.style.display = "block";
      });

      targetMenu.style.zIndex = 2000;

      //Remove hover effect
      targetMenu.classList.remove("ram-Menu_closed");

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
            duration: 900
          },
          duration: 400,
          easing: "easeInOutCubic",
          backgroundColor: "rgb(255, 255, 255)"
        })
        .add({
          targets: targetButton,
          scaleX: [2.5,1],
          opacity: 1,
          duration: function(targetElements, i, l) {
            return 400 + (i * 200);
          },
          easing: 'easeInOutCubic',
          offset: '-=700'
        });
    } else {
      animation = anime.timeline();
      const color = this.getColor();

      //Remove hover effect
      targetMenu.classList.add("ram-Menu_closed");

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
          duration: 700,
          backgroundColor: this.getColor(),
          easing: "easeInOutCubic",
          offset: '-=500'
        });

        //Remove menu after animation finished
        animation.complete = function() {
          targetButton.forEach((element) => {
            element.style.display = "none";
            element.style.zIndex = 1;
          });

          targetMenu.style.zIndex = 1;

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

    if(!(inputWidth || inputHeight) || !isNaN(inputWidth) || isNaN(inputHeight)) {
      console.log("Please define a height OR width correctly! Only define one of both. It has to be an integer!");
      return {
        width: 0,
        height: 0
      }
    } else {
      //Units and values seperated
      if(inputWidth !== undefined) {
        //Width
        const valueWidth = parseInt(inputWidth);
        //Height
        const valueHeight = valueWidth * 2.5;

        return {
          width: String(valueWidth) + 'px',
          height: String(valueHeight) + 'px'
        }
      }

      //Height
      const valueHeight = parseInt(inputHeight);
      //Width
      const valueWidth = valueHeight / 2.5;

      return {
        width: String(valueWidth) + 'px',
        height: String(valueHeight) + 'px'
      }
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
      <div style={style} id={this.id} className="ram-Menu ram-Menu_closed">
          <div className="ram-Menu_dotBox">
            <div style={styleDot} className="ram-Menu_dot ram-Menu_dotA">
              <div className="ram-Menu_button" style={styleFont} onClick={this.props.food.a.action}>
                {this.props.food.a.value}
              </div>
            </div>
          </div>
          <div className="ram-Menu_dotBox">
            <div style={styleDot} className="ram-Menu_dot ram-Menu_dotB">
              <div className="ram-Menu_button" style={styleFont} onClick={this.props.food.b.action}>
                {this.props.food.b.value}
              </div>
            </div>
          </div>
          <div className="ram-Menu_dotBox">
            <div style={styleDot} className="ram-Menu_dot ram-Menu_dotC">
              <div className="ram-Menu_button" style={styleFont} onClick={this.props.food.c.action}>
                {this.props.food.c.value}
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
