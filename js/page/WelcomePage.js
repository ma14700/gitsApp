import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import HomePage from './HomePage'
export default class Welcome extends Component{
    //挂载之后页面跳入Homepage页面
    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.props.navigator.resetTo({
                component:HomePage
            })
        },2000)
    }
    componentWillMount(){
        this.timer && clearTimeout(this.timer)
    }
    render(){
        return <View style={styles.container}>
            <NavigationBar
                title={'欢迎'}
            />
            <View style={styles.containers}>
                <Text style={styles.welcome}>欢迎</Text>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    containers:{
        alignItems:'center',
        justifyContent:'center',
        height:500
    },
    welcome:{
        color:'red',
        
        fontSize:30
    }
})