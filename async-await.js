//方法说明如下：
//
//output：简单的输出方法，但返回了一Promise。
//run: 使用await来等待两次对output的执行
//runDiff：调用output时即创建promise。两个promise会同步执行
//runAll：多任务同步执行和按步骤执行的实现方法。也就是forEach和for方法体中使用await的区别
//premosFn: promise.all的使用。
//reject: promise的reject会触发await的异常
class AsyncTest{
    //simple example
    async run(){
        //按照顺序等待后输出
        let one = await this.output("one", 1000);
        console.log('output:' + one);
        let two = await this.output("two", 3000);
        console.log(two);
        console.log('run.....');
    }
    //await and Promise.all difference
    async runDiff(){ 
        let one = this.output('diff one', 2000);
        let two = this.output('diff two', 2000);
        console.log(  await two + await one );  //在2秒之后，两个都输出了，而不是各自都等待两秒
        console.log('runDiff.....');
    }

    //Promise.all realize
    runAll(){
        let nowTime = new Date();
        console.log('b:' + nowTime.toTimeString());
        let array = ["a", "b", "c"];
        let that = this;
        array.forEach(async function(item){
            console.log( await that.output(item, 2000) );//2秒后同时输出
        });
        let fn = async ()=>{
            for(let item of array){
                let v = await this.output(item, 2000);
                console.log(v ); //分步骤两秒执行
            }
        }
        fn.call(this);
    }

    premosFn(){
        let nowTime = new Date();
        console.log('b:' + nowTime.toTimeString());
        let array = ["a", "b", "c"];
        let that = this;
        //promise.all
        let preFn = async function(){
            let promises = array.map(function(item){
                return that.output(item,2000); //同时开启多个定时器
            });
            let r = await Promise.all(promises);
            console.log(r.join(','));
        }
        preFn();
    }

    reject(){
        let rejectFn = function(){
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    reject();
                },2000);
            });
        }
        let asyncReject = async function(){
            try{
                await rejectFn();
            }catch( e) {
                console.log('reject.....');
            }
        }
        asyncReject();
    }

    output(log, time){
        return new Promise(resolve=>{
            setTimeout(()=>{
                var nowTime = new Date();
                resolve( nowTime.toTimeString() + ":" + log + "\r\n");
            }, time);
        });
    }
}