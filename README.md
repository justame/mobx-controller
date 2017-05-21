# mobx-controller

React HOC for based on Mobx-React Injector to Inject Controller.

## Installation
`npm install mobx-controller --save`


```javascript
import {controller} from 'mobx-controller';
```


## API documentation
```javascript
// ---- ES6 syntax ----
class MyCtrl{
  user: {
    name: 'Jack'
  }
}
const TodoView  = controller('myCtrl', MyCtrl)(class TodoView extends React.Component {
    render() {
        return <div>{this.props.myCtrl.user.name}</div>
    }
})

// ---- ESNext syntax with decorators ----
@controller('myCtrl', MyCtrl)
class TodoView extends React.Component {
    render() {
        return <div>{this.props.myCtrl.user.name}</div>
    }
}

```
