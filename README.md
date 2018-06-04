# Introduction

> This module extends **React Js**

React component that mounts three dot button that morphs into a menu by clicking on it.
Never ever worry about a fancy dropdown menu. This component does it for you!

# Installation

`npm install --save react-animated-menus`

# Usage

`import Menu from 'react-animated-menus'`

Component usage:

```jsx
const food = {
  a: {
    value: "Button1",
    action: () => {
      alert("test1")
    }
  },
  b: {
    value: "Button2",
    action: () => {
      alert("test2")
    }
  },
  c: {
    value: "Button3",
    action: () => {
      alert("test3")
    }
  }
}

<Menu width={"20px"} color="rgb(123, 192, 222)" food={food} />

//Replace 'width' optionally width 'height' but don't use both at the same time.
T//o keep the ratio between height and width one has to be given and the other one is calculated by the component.

//One example with height:

<Menu height={"50px"}" food={food} />

//'color' is optional. The defaul value is 'rgb(255, 255, 255)' if it's not defined.
```

# Contact

**Github:** https://github.com/aleabodo

**Wesite:** https://alexbell.ninja

**Email:** mail@alexbell.de
