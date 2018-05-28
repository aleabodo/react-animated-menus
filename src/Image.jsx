import React, { Component } from 'react';

import './Image.css';


class Image extends Component {
  constructor(props) {
    super(props);

    /*
    * Expected props:
    *   - img: require(imgUrl)
    *   - headlineA: String
    *   - headlineB: String
    */
    this.currentImageIs_A = true;
  }

  componentDidMount() {
    this.fadeIn("a");
  }

  componentDidUpdate() {
    const fadeInLetter = this.currentImageIs_A ? "b" : "a";
    const fadeOutLetter = this.currentImageIs_A ? "a" : "b";
    this.fadeIn(fadeInLetter, this.props.img);
    this.fadeOut(fadeOutLetter);
    this.currentImageIs_A = !this.currentImageIs_A;
  }


  fadeIn(letter) {
    /*
    * Fade in
    */
    //Image
    const elements = document.getElementById(letter).getElementsByClassName("Image_element");
    for (var i = 0; i < elements.length; i++) {
      const element = elements[i];
      //Change picture
      const imgUrl = this.props.img;
      element.style.backgroundImage = "url(" + imgUrl + ")";
      //Animation
      this.timeout_fadeIn(element,i);
    };
  }

  fadeOut(letter) {
    /*
    * Fade out
    */
    //Image
    const elements = document.getElementById(letter).getElementsByClassName("Image_element");
    for (var i = 0; i < elements.length; i++) {
      const element = elements[i];
      //Animation
      this.timeout_fadeOut(element,i);
    };
  }

  timeout_fadeIn(element,i) {
    setTimeout(function() {
      element.classList.remove("Image_element-fade-out");
      element.classList.add("Image_element-fade-in");
    }, i*100);
  }

  timeout_fadeOut(element,i) {
    setTimeout(function() {
      element.classList.remove("Image_element-fade-in");
      element.classList.add("Image_element-fade-out");
    }, i*100);
  }


  render() {
    if(this.props.img !== null) {
      //displayed
      return (
        <div>
          <div className="Image" id="a">
            <h1 className="Image_headline Image_headline-1 Image_headline-black Image_headline-bright">
              {this.props.headlineA}
            </h1>
            <h2 className="Image_headline Image_headline-2 Image_headline-black Image_headline-bright">
              {this.props.headlineB}
            </h2>
            <div className="Image_element-1 Image_element"></div>
            <div className="Image_element-2 Image_element"></div>
            <div className="Image_element-3 Image_element"></div>
            <div className="Image_element-4 Image_element"></div>
            <div className="Image_element-5 Image_element"></div>
            <div className="Image_element-6 Image_element"></div>
            <div className="Image_element-7 Image_element"></div>

            <div className="Image_element-8 Image_element"></div>

            <div className="Image_element-9 Image_element"></div>
            <div className="Image_element-10 Image_element"></div>
            <div className="Image_element-11 Image_element"></div>
            <div className="Image_element-12 Image_element"></div>
            <div className="Image_element-13 Image_element"></div>
            <div className="Image_element-14 Image_element"></div>
          </div>
          <div className="Image" id="b">
            <div className="Image_element-1 Image_element"></div>
            <div className="Image_element-2 Image_element"></div>
            <div className="Image_element-3 Image_element"></div>
            <div className="Image_element-4 Image_element"></div>
            <div className="Image_element-5 Image_element"></div>
            <div className="Image_element-6 Image_element"></div>
            <div className="Image_element-7 Image_element"></div>

            <div className="Image_element-8 Image_element"></div>

            <div className="Image_element-9 Image_element"></div>
            <div className="Image_element-10 Image_element"></div>
            <div className="Image_element-11 Image_element"></div>
            <div className="Image_element-12 Image_element"></div>
            <div className="Image_element-13 Image_element"></div>
            <div className="Image_element-14 Image_element"></div>
          </div>
        </div>
      );
    } else {
      //not displayed
      return (
        null
      );
    }
  }
}

export default Image;
