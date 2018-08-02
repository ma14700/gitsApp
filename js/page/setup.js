import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import WelcomePage from './WelcomePage';
function setup(){
    class Root extends Component{
        renderScene(route,navigator){
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
        }
        render(){
            // 初始化路由组件，挂载welcome组件
            return <Navigator
                initialRoute={{component:WelcomePage}}
                renderScene={(route,navigator)=>this.renderScene(route,navigator)}
            />
        }
    }
    return <Root/>
}

module.exports = setup;