new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns:[]
    },
    methods:{
        startGame:function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        //攻击
        attack:function () {
            var damage =this.calculateDamge(3,10);
            this.monsterHealth -= damage;

            this.turns.unshift({
                isPlayer:true,
                text:'Player hits Monster for'+damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },

        specialAttack:function () {
            var damage = this.calculateDamge(10,20)
            this.monsterHealth -= damage;
            if(this.checkWin()){
                return;
            }
            this.turns.unshift({
                isPlayer:true,
                text:'Player hits Monster hard for'+damage
            });
            this.monsterAttacks();
        },

        heal:function () {
            if(this.playerHealth<=90){
                this.playerHealth +=10;
            }else{
                this.playerHealth=100;
            }
            this.turns.unshift({
                isPlayer:true,
                text:'Player heals for'+10
            });
            this.monsterAttacks();


        },
        giveUp:function () {
            this.gameIsRunning=false;
        },

        monsterAttacks:function(){
            var damage = this.calculateDamge(5,12);
            this.playerHealth -= damage
            this.turns.unshift({
                isPlayer:false,
                text:'Monster hits Player for'+damage
            });
            this.checkWin()
        },



        //伤害
        calculateDamge:function (min,max) {
            return Math.max(Math.floor(Math.random()*max)+1,min);
        },

        //检查是否胜利
        checkWin:function () {
            if(this.monsterHealth<=0){
                if(confirm('You won! New Game?')){
                    this.startGame()
                }else{
                    this.gameIsRunning=false;
                }
                return true;
            }else if(this.playerHealth<=0){
                if(confirm('You lost! New Game?')){
                    this.startGame()
                }else{
                    this.gameIsRunning=false;
                }
                return true;
            }
            return false;
        }
    },
});