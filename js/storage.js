function kset(key, value){
    console.log("key"+key+"value"+value);
    window.localStorage.setItem(key, value);
}
 
function kget(key){
    console.log(key);
    return window.localStorage.getItem(key);
}
 
function kremove(key){
    window.localStorage.removeItem(key);
}
 
function kclear(){
    window.localStorage.clear();
}
 
//测试更新方法
function kupdate(key,value){
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, value);
}