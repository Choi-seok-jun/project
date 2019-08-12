$(document).ready(function () {
    $('.login-info-box').fadeOut();
    $('.login-show').addClass('show-log-panel');

    $('.login-reg-panel input[type="radio"]').on('change', function () {
        if ($('#log-login-show').is(':checked')) {
            $('.register-info-box').fadeOut();
            $('.login-info-box').fadeIn();

            $('.white-panel').addClass('right-log');
            $('.register-show').addClass('show-log-panel');
            $('.login-show').removeClass('show-log-panel');

        }
        else if ($('#log-reg-show').is(':checked')) {

            $('.register-info-box').fadeIn();
            $('.login-info-box').fadeOut();

            $('.white-panel').removeClass('right-log');

            $('.login-show').addClass('show-log-panel');
            $('.register-show').removeClass('show-log-panel');
        }
    });


    //login 버튼 클릭 시

    $("#login_btn").click(function () {

        const login_id = $("#login_id").val();
        const login_pw = $("#login_pw").val();

        const login_params = {
            login_id,
            login_pw,
        };

        if (login_id.length === 0) {
            alert("ID를 입력해주세요.");
            $("#login_id").focus();
            return false;
        }
        if (login_pw.length === 0) {
            alert("PassWord를 입력해주세요.");
            $("#login_pw").focus();
            return false;
        }

        $.post("/login", login_params, function (data, status) {
            // jQuery의 post 메소드에서 stringify를 내장하고 있기 떄문에 argument로 JavaScript 객체를 사용한다.
            // alert(data +  " : " + status);
            const parsedData = JSON.parse(data);
            if (parsedData.login_status == 0) {
                alert(parsedData.msg);
                $('#login_id').val('');
                $('#login_pw').val('');
            } else {
                alert(parsedData.msg);
                window.open('/main', '_self', '');
            }

        });

    });



    // 회원가입 버튼 클릭 시
    function chkPwd(str) { // pw 복잡도 검증
        var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
        if (!reg_pwd.test(str)) {
            return false;
        }
        return true;
    }

    $("#reg_btn").click(function () {
        // var a = $('.g-recaptcha').val();
        // alert(typeof (a));

        var response = grecaptcha.getResponse();

       

        const reg_id = $('#reg_id').val();
        const reg_pw = $('#reg_pw').val();
        const reg_name = $('#reg_name').val();
        const reg_key = $('#reg_key').val();

        const reg_params = {
            reg_id,
            reg_pw,
            reg_name,
            reg_key
        };

        if (reg_id.length === 0) {
            alert("ID를 입력해주세요.");
            $("#reg_id").focus();
            return false;
        }
        if (reg_pw.length === 0) {
            alert("PassWord를 입력해주세요.");
            $("#reg_pw").focus();
            return false;
        }

        if (!chkPwd($.trim($('#reg_pw').val()))) {

            alert('비밀번호를 확인하세요.(영문,숫자를 혼합하여 6~20자 이내)');

            $('#reg_pw').val('');
            $('#reg_pw').focus();
            return false;

        }
        if (reg_name.length === 0) {
            alert("Name를 입력해주세요.");
            $("#reg_name").focus();
            return false;
        }

        if (reg_key.length === 0) {
            alert("KEY를 입력해주세요.");
            $("#reg_key").focus();
            return false;
        }
        if (response.length == 0) {
            alert('reCaptcha not verified');
            console.log(response);
            //reCaptcha not verified
        } else {
            alert('reCaptch verified');
            console.log(response);
            //reCaptch verified
            $.post("/register", reg_params, function (data, status) {
                // jQuery의 post 메소드에서 stringify를 내장하고 있기 떄문에 argument로 JavaScript 객체를 사용한다.
                // alert(data +  " : " + status);
                const parsedData = JSON.parse(data).msg;
                alert(parsedData);
                location.reload(true);
    
            });
        }

    });


    // 키 생성 클릭시
    $('#create_key').click(() => {
        $.post('http://70.12.225.126:3000/create_key', //석준
            {
                reg_id: $('#reg_id').val(),
                reg_pw: $('#reg_pw').val(),
                reg_name: $('#reg_name').val(),
            },
            (data, status) => {
                window.open(data.msg, "_blank", "width=850,height=910");
            });
    });



});
