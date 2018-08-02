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
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import NavigationBar from '../../common/NavigationBar';
import ArrayUtils from '../../util/ArrayUtils'

export default class SortKeyOage extends Component{
    constructor(props){
        super(props);
        this.dataArray = [];
        this.sortResultArray = [];
        this.originalCheckedArray = [];
        this.state = {
            checkedArray: []
        }
    }
    componentDidMount(){
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
    }
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.getCheckedItems(result);
            })
    }
    getCheckedItems(result){
        this.dataArray = result;
        let checkedArray = [];
        for(let i = 0,len=result.length;i<len;i++){
            let data = result[i];
            if(data.cheked) checkedArray.push(data);
            this.setState({
                checkedArray:checkedArray
            })
            this.originalCheckedArray = ArrayUtils.clone(checkedArray);
        }
    }
    render(){
        return <View>
            <NavigationBar
                    title="我的"
                    style={{backgroundColor:'#6496ED'}}
                />
            <SortableListView
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={(e) => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                        this.forceUpdate();
                    }}
                    renderRow={row => <SortCell data={row} {...this.props}/>}
            />
        </View>
    }
}