import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    AsyncStorage,
    TextInput
} from 'react-native';
import NavigationBar from './NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast'
const KEY = 'text'
export default class AsyncStorageTest extends Component{
    constructor(props){
        super(props);
    }
    onSave(){
        AsyncStorage.setItem('text',this.text,(error)=>{
            if (!error) {
                this.toast.show('保存成功', DURATION.LENGTH_LONG);
            } else {
                this.toast.show('保存失败', DURATION.LENGTH_LONG);
            }
        })
    }
    onFetch() {
        AsyncStorage.getItem('text', (error, result)=> {
            if (error) {
                this.toast.show('取出失败', DURATION.LENGTH_LONG);
            } else {
                if (result) {
                    this.toast.show('取出的结果为:' + result, DURATION.LENGTH_LONG);
                } else {
                    this.toast.show('没有找到对应的内容', DURATION.LENGTH_LONG);
                }
            }
        });
    }
    onRemove(){
        AsyncStorage.removeItem('text',(error)=>{
            if (!error) {
                this.toast.show('移除成功', DURATION.LENGTH_LONG);
            } else {
                this.toast.show('移除失败', DURATION.LENGTH_LONG);
            }
        });
    }
    render(){
        return (
            <View style={StyleSheet.container}>
                <NavigationBar
                    title="AsyncStorage的使用"
                />
                <TextInput style={{borderWidth:1,height:40}} onChangeText={(text)=> {
                               this.text = text;
                           }} />
                <View style={{flexDirection:'row',height:40,margin:6}}>
                    <Text style={styles.tips}
                        onPress={()=>this.onSave()}
                    >保存</Text>
                    <Text style={styles.tips}
                        onPress={()=>this.onRemove()}
                    >移除</Text>
                    <Text style={styles.tips}
                        onPress={()=>this.onFetch()}
                    >取出</Text>
                </View>
                <Toast ref={toast=> {
                    this.toast = toast
                }}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tips:{
        fontSize:20,
        margin:5
    }
})