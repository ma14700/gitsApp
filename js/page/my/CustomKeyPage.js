import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    AsyncStorage,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import ViewUtils from '../../util/ViewUtils'
import CheckBox from 'react-native-check-box'
import ArrayUtils from '../../util/ArrayUtils'
//如果引入export var 需要再次声明
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
export default class CustomKeyPage extends Component{
    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changeValues = [];
        this.state = {
            dataArray:[]
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        console.log(13);
        this.languageDao.fetch()
            .then(result=>{
                console.log(result);
                this.setState({
                    dataArray:result
                })
            })
            .catch(error=>{
                console.log(error)
            })
    }
    onBack(){
        if (this.changeValues.length > 0) {
            Alert.alert(
                'Confirm Exit',
                'Do you want to save your changes before exitting?',
                [
                    {
                        text: 'No', onPress: () => {
                        this.props.navigator.pop();
                    }
                    }, {
                    text: 'Yes', onPress: () => {
                        this.onSave();
                    }
                }
                ]
            )
        } else {
            this.props.navigator.pop();
        }
    }
    onSave(){
        if(this.changeValues.length == 0){
            this.props.navigator.pop();
            return;
        }
        this.languageDao.save(this.state.dataArray);
        this.props.navigator.pop();
    }
    onClick(data){
        data.checked = !data.checked;
        ArrayUtils.updateArray(this.changeValues,data);
    }
    renderView(){
        if(!this.state.dataArray || this.state.dataArray.length === 0) return null;
        let len = this.state.dataArray.length;
        let views = [];
        for(let i = 0,l=len-2;i<l;i+=2){
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        views.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
                <View style={styles.line}></View>
            </View>
        )
        return views
    }
    renderCheckBox(data){
        let leftText = data.name;
        return(
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>this.onClick(data)}
                leftText={leftText}
                isChecked={data.checked}
                checkedImage={<Image source={require('../../page/my/img/ic_check_box.png')}
                                     style={{tintColor: '#2196F3'}}/>}
                unCheckedImage={<Image source={require('../../page/my/img/ic_check_box_outline_blank.png')}
                                       style={{tintColor: '#2196F3'}}/>}
            />
        )
    }
    render(){
        let rightButton = <TouchableOpacity>
            <View style={{margin:10}}>
                <Text 
                    style={styles.title}
                    onPress={()=>this.onSave()}
                >保存</Text>
            </View>
        </TouchableOpacity>
        return (
            <View style={StyleSheet.container}>
                <NavigationBar
                    title="自定义标签"
                    style={{backgroundColor:'#6496ED'}}
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    rightButton={rightButton}
                />
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
                
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
    },
    title:{
        fontSize:20,
        color:'white'
    },
    line:{
        flex: 1,
        height: 1,
        backgroundColor: 'darkgray',
    },
    item:{
        flexDirection:'row',
        alignItems:'center'
    }
})