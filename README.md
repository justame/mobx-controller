# mobx-controller

React HOC (Higher-Order Component) based on [Mobx-React](https://github.com/mobxjs/mobx-react) **Injector** to Inject a controller.

A controller instance will be created each time the component will be mounted and will be destroyed when the component will unmount

### Why do I need a controller? 
* Separation of concerns
* When the State of the component in the controller it's easier to write tests ( no more async setState)


## Installation
`npm install mobx-controller --save`


```javascript
import {controller} from 'mobx-controller';
```


## API documentation
### controller(controllerName:string, controller: Class)
### controller(controllerName:string, controller: Class, mapper: Function)

Function/Decorator that injects the controller instance as a prop to your React component. 


*Example: Injects controller as **prop***
```javascript
import {controller} from "mobx-controller";
import {observer} from "mobx-react";

// ---- ES6 syntax ----
class MyCtrl{
  constructor(allStores){  // the constructor get all the stores
    this.allStores = allStores; 
  }
  user: {
    name: 'Jack'
  }

  $onDesroy(){
    console.log('component will unmount');
  }
}
const TodoView  = controller('myCtrl', MyCtrl)(observer(class TodoView extends React.Component {
    render() {
        return <div>{this.props.myCtrl.user.name}</div>
    }
}))

// ---- ESNext syntax with decorators ----
@controller('myCtrl', MyCtrl)
@observer
class TodoView extends React.Component {
    render() {
        return <div>{this.props.myCtrl.user.name}</div>
    }
}

```
*Example: Using a custom **mapper***
```javascript

function mapper(controller, ownProps){
  return {
    user: controller.user
  }
}

// ---- ES6 syntax ----
class MyCtrl{
  constructor(allStores){  // the constructor get all the stores
    this.allStores = allStores; 
  }
  user: {
    name: 'Jack'
  }
  
  $onDesroy(){
    console.log('component will unmount');
  }
}


const TodoView  = controller('myCtrl', MyCtrl, mapper)(observer(class TodoView extends React.Component {
    render() {
        return <div>{this.props.user.name}</div>
    }
}))

// ---- ESNext syntax with decorators ----
@controller('myCtrl', MyCtrl, mapper)
@observer
class TodoView extends React.Component {
    render() {
        return <div>{this.props.Ctrl.user.name}</div>
    }
}
```
**you can look at the demo for a full working example**




