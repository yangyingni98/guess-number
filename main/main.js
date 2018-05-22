// Write your cade below:
var readline = require('readline');
function main() {
   input2(judge_callback);
};

function input(){
    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', () => {
      let chunk = process.stdin.read();
      if(typeof chunk === 'string'){
        chunk = chunk.slice(0,-2);
        process.stdout.write(`stringLength:${chunk.length}\n`);
      }
      if(chunk === ''){
        process.stdin.emit('end');
        return
      }
      if (chunk !== null) {
        process.stdout.write(`用户输入: ${chunk}`);
        return ;
      }
    });
    
    process.stdin.on('end', () => {
      process.stdout.write('end');
    });
}
//es6 封装的readline
function input2(callback){
    var  rl = readline.createInterface({
        input:process.stdin,
        output:process.stdout
    });
    rl.question("输入一个四位大小的数字？",function(answer){
        console.log("数字是："+answer);
        callback(answer);
        // 不加close，则不会结束
        rl.close();
        return answer;
    });
    rl.on("close", function(){
        // 结束程序
         process.exit(0);
     });
}

function judge_callback(guess){
    let use_num = usernum_toarr(guess);
    let a_size = 0;
    let b_size = 0;
    let random_num = create_random_num();
    for(let i =0 ; i< 4 ;i++){
        if(use_num[i] == random_num[i]){
            a_size ++;
        }else{
            for(let j =0; j<4;j++){
                if(use_num[i] == random_num[j]){
                    b_size ++;
                    break;
                }
            }
        }
    }
    console.log(`${a_size}A${b_size}B`);
    
}
function usernum_toarr(user_guess_num){
    let u_arr = [4];
    u_arr[0] = parseInt(user_guess_num / 1000);
    u_arr[1] = parseInt((user_guess_num % 1000) /100);
    u_arr[2] = parseInt((user_guess_num % 100) /10);
    u_arr[3] = user_guess_num % 10;
    return u_arr;
}

function create_random_num(){
    let arr = [];
    for(let i = 0 ; i < 4; i++){
        arr.push(parseInt(Math.random()*10));
    }
    console.log("产生的随机数"+arr);
    return arr;
}
main();

module.exports = {
    main
}

