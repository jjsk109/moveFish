class App {
    constructor(){
        this.canvas = document.getElementById("canvas");
        
        this.ctx = this.canvas.getContext('2d');
     
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        
        this.img = new Image();   // Create new img element
        this.img.src = './fish.png'; // Set source path

        addEventListener('resize',this.resizeHendle.bind(this),false);
        requestAnimationFrame(this.animation.bind(this));
        this.pointWidth = 10;
        this.pointHeight = 50;
        this.speed = 10;
        this.heightMinMax = 50;
        this.heightDerect = 1;

    }
    resizeHendle(){
        
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        
    }
    animation(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.remove
        this.ctx.beginPath();
        this.ctx.fillStyle = 'green';
        //this.ctx.fillRect(this.pointWidth, this.pointHeight, 150, 100);
       
        this.ctx.drawImage( this.img, this.pointWidth, this.pointHeight);

        this.iData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < this.iData.data.length -4; i+=4){
            
             // 빨간 색상을 반전
                this.iData.data[i] = 50;
                // 녹색 색상을 반전
                this.iData.data[i+1] = 50;
                // 파란 색상을 반전
                this.iData.data[i+2] = 50;
                
               
                
        }

        this.ctx.putImageData(this.iData,0, 0);
        this.imgArray = [];
        for(var i = 0; i< canvas.height; i+=5){
            for(var j = 0; j< canvas.width; j+=5){
                var getData = this.ctx.getImageData( j, i, 1, 1);
                if(getData.data.includes(50)){
                    // console.log('x',j);
                    // console.log('y',i);
                    // console.log(getData.data);
                    this.imgArray.push({
                        x:j,
                        y:i
                    });
                } 
            }
        }
        //console.log(this.imgArray);
        this.iData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
       // console.log(this.iData.data.indexOf(50));
       this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i<this.imgArray.length;i++){
            var rand1 = Math.floor(Math.random()*10);
            var rand2 = Math.floor(Math.random()*10);
            var rand3 = Math.floor(Math.random()*10);
            this.ctx.beginPath();

            this.ctx.arc(this.imgArray[i].x + rand1, this.imgArray[i].y + rand2, rand3 ,0, 2*Math.PI);
            this.ctx.stroke();
            this.ctx.fillStyle = 'blue'; 
            this.ctx.fill();
          
        }
       
          
        this.ctx.closePath();
      

        this.pointWidth = this.pointWidth > this.canvas.width ? -200 : this.pointWidth+this.speed ;
        
        if(100 == this.pointHeight ){
          
            this.heightDerect = this.heightDerect * -1;
        }else if(0 == this.pointHeight){
           
            this.heightDerect = this.heightDerect * -1;
        }

        this.pointHeight = this.pointHeight + this.heightDerect;
        

        requestAnimationFrame(this.animation.bind(this));
    }
}

window.onload = () => {
    new App();
}