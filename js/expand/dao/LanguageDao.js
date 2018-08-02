'use strict';

import {
    AsyncStorage,
} from 'react-native';
import keysData from '../../../res/data/keys.json'

//标识，pop模块和trending模块都要用
export var FLAG_LANGUAGE = {flag_language: 'language_dao_language', flag_key: 'language_dao_key'}
export default class DataRepository{
    constructor(flag){
        this.flag = flag;
    }
    fetch(){
        // console.log(this.flag,123)
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(error){
                    reject(error);
                    return;
                }
                if (!result){
                    // var data=this.flag===FLAG_LANGUAGE.flag_language? null:keysData;
                    var data = this.flag===FLAG_LANGUAGE.flag_key?keysData:null;

                    this.save(data);
                    resolve(data);
                }else {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                }

            })
        })
    }
    save(objectData){
        var stringData=JSON.stringify(objectData);
        AsyncStorage.setItem(this.flag,stringData,(error,result)=>{

        });
    }
}