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
import NavigationBar from '../../common/NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from './SortKeyPage'

export default class MyPage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={StyleSheet.container}>
                <NavigationBar
                    title="我的"
                    style={{backgroundColor:'#6496ED'}}
                />
                <Text style={styles.tips}
                    onPress={()=>{
                        this.props.navigator.push({
                            component:CustomKeyPage,
                            params:[...this.props]
                        })
                    }}
                >自定义标签</Text>
                <Text style={styles.tips}
                    onPress={()=>{
                        this.props.navigator.push({
                            component:SortKeyPage,
                            params:[...this.props]
                        })
                    }}
                >排序标签</Text>
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