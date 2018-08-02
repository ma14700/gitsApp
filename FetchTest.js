/**
 * Created by penn on 2016/12/19.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    ListView,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import NavigationBar from './NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast'
import HttpUtils from './HttpUtils'
// import NavigationBar from './js/common/NavigationBar'
export default class FetchTest extends Component {
    constructor(props){
        super(props);
        this.state={
            result:''
        }
    }
    onLoad(url){
        // fetch(url)
        // .then(response=>response.json())
        // .then(result=>{
        //     this.setState({
        //         result: JSON.stringify(result)
        //     })
        // })
        // .catch(error=>{
        //     this.setState({
        //         result: JSON.stringify(result)
        //     })
        // })
        HttpUtils.get(url)
            .then(result=>{
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error=> {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
        
    }
    onSubmit(url,data){
        // fetch(url,{
        //     method:'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     //探究header与Json
        //     body: JSON.stringify(data)
        // }).then(response=>response.json())
        // .then(result=>{
        //     this.setState({
        //         result: JSON.stringify(result)
        //     })
        // })
        HttpUtils.post(url,data)
            .then(result=>{
                this.setState({
                    result: JSON.stringify(result)
                })
            })
    }
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="Fetch使用"
                />
                <Text
                    onPress={
                        ()=>this.onLoad('http://rap.taobao.org/mockjsdata/11793/test')
                    }
                >获取数据</Text>
                <Text
                    onPress={
                        ()=>this.onSubmit('http://rap.taobao.org/mockjsdata/11793/submit',{userName:'小明',password:'123456'})
                    }
                >发送数据</Text>
                <Text>返回结果:{this.state.result}</Text>
            </View>
        )
    }
}
   
const styles = StyleSheet.create({
    text: {
        fontSize: 20
    }
})