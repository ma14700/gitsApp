import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    TextInput,
    ListView,
    RefreshControl
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';
// 封装fetch使用DataRepository方法
import DataRepository from '../expand/dao/DataRepository';
// 选项卡ScrollableTabView，可以滑动
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
// 主体内部内容
import RepositoryCell from '../common/RepositoryCell'
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export default class Welcome extends Component{
    constructor(props){
        super(props);
        this.dataRepository = new DataRepository();
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state={
            result:'',
            languages:[]
        }
        this.loadLanguage();
    }
    componentDidMount(){
        // this.loadData();
    }
    loadLanguage(){
        this.languageDao.fetch()
            .then(result=>{
                console.log(result);
                this.setState({
                    languages: result,
                });
            })
            .catch(error=>{
                console.log(error)
            })
    }
    onLoad(){
        let url  = this.genUrl(this.text);
        this.dataRepository.fetchNetRepository(url)
            .then(result=>{
                this.setState({
                    result:JSON.stringify(result)
                })
            })
            .catch(error=>{{
                this.setState({
                    result:JSON.stringify(error)
                })
            }})
    }
    genUrl(key){
        return URL+key+QUERY_STR;
    }
    render(){
        let content = this.state.languages.length > 0 ?
        <ScrollableTabView
            tabBarBackgroundColor="#2196F3"
            tabBarInactiveTextColor='mintcream'
            tabBarActiveTextColor='white'
            tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
            renderTabBar={()=><ScrollableTabBar/>}
        >
            {this.state.languages.map((result,i,arr)=>{
                let lan = arr[i];
                return lan.checked?<PopularTab key={i} tabLabel={lan.name}>{lan.name}</PopularTab>:null
            })}
        </ScrollableTabView>:null;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='最热'
                    style={{backgroundColor:'#6495ED'}}
                />
                {content}
            </View>
        )
    }
}  
//组件化思想，去使用组件复用页面中间快
class PopularTab extends Component{
    constructor(props){
        super(props);
        this.dataRepository = new DataRepository();
        this.state={
            result:'',
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2}),
            isLoading:false
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        this.setState({
            isLoading: true
        })
        let url  = URL+this.props.tabLabel+QUERY_STR;
        this.dataRepository.fetchNetRepository(url)
            .then(result=>{
                console.log(result)
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result.items),
                    isLoading:false
                })
            })
            .catch(error=>{{
                this.setState({
                    result:JSON.stringify(error),
                    isLoading:false
                })
            }})
    }
/**
 * @method
 * @param 
 * @returns {Type} 运营商名称
 * @desc 根据目标对象获取运营商
 */
    renderRow(data){
        return <RepositoryCell data={data}/>
    }
    render(){
        return <View>
            {/* listView组件渲染主体部分，使用DataSource去获取，renderRow去渲染组件部分 */}
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data)}
                refreshControl={
                    <RefreshControl
                        title='Loading...'
                        titleColor='#2196F3'
                        colors={['#2196F3']}
                        refreshing={this.state.isLoading}
                        onRefresh={()=>this.loadData()}
                        tintColor='#2196F3'
                    />
                }
            />
            <Text style={{height:600}}>{this.state.result}</Text>
        </View>
    }
} 
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 20
    }
})