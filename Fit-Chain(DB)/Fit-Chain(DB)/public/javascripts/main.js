$(document).ready(function () {
    $('button').click(function () {

        // alert(this.id);
        var coin;
        var coin_num = prompt("몇 코인을 지급하시겠습니까?", coin);
        var coin_integer = parseInt(coin_num);

        if(coin_integer){

            var coin_pay = {
                coin_integer: coin_integer,
                photo_num: this.id
            };
    
            $.post("/main#main_photo", coin_pay, function (data, status) {
                // alert(coin_integer+" 코인 지급하였습니다.");
                const parsedData = JSON.parse(data).msg;
                alert(parsedData);
                // location.reload(false);
            })
            
        }else{
            alert("숫자를 입력하시오!!");
        }


    });


});