export default class ArrayUtils{
    /**
     * 更新数组，若item已存在则从数组中移除
     */
    static updateArray(array,item){
        for(var i = 0,len=array.length;i<len;i++){
            var temp = array[i];
            if(temp===item){
                array.splice(i,1);
                return;
            }
        }
        array.push(item);
    }
    /**
     * 克隆一个数组
     * @param  from 
     * return Array
     */
    static clone(from){
        if(!from) return [];
        let newArray = [];
        for(let i = 0,len = from.length;i<len;i++){
            newArray[i] = from[i];
        }
        return newArray;
    }
}