$(document).ready(function () {
    $('#test_get_key').click(() => {
        // alert('test');
        $.post('http://70.12.225.126:3000/confirm_key',  //석준
        // $.post('http://70.12.225.194:3000/confirm_key', //우리
            {
                id: $('#reg_id').val()
            },
            function (data, status) {
                $("#reg_key").val(data.msg);
                alert(data.msg);
                
            });
    });



    $('#findpw_btn').click(function () {
        //panel acttion ---------
        var panelTwo = $('.form-panel.two')[0].scrollHeight;
        $('.form-toggle').addClass('visible');
        $('.form-panel.one').addClass('hidden');
        $('.form-panel.two').addClass('active');
        $('.form').animate({
            'height': panelTwo
        }, 200);
        //------------------------

        const reg_id = $('#reg_id').val();
        const reg_key = $('#reg_key').val(); //key 확인.. 기능 필요

        $('#reg_id_copy').attr('value', reg_id);

        $('#changepw_btn').click(function () {
            const new_reg_pw = $('#new_reg_pw').val();
            const confirm_new_reg_pw = $('#confirm_new_reg_pw').val();

            const findpw_params = {
                reg_id,
                new_reg_pw,
                confirm_new_reg_pw
            };
            console.log(findpw_params);

            $.post('/find_infomation_form', findpw_params, function (data, status) {

                //panel acttion ---------
                $('.form-toggle').removeClass('visible');
                $('.form-panel.one').removeClass('hidden');
                $('.form-panel.two').removeClass('active');
                $('.form').animate({
                    'height': panelTwo
                }, 200);
                //------------------------

                swal(data.msg);

            });
        });
    });


    // const new_reg_pw = $('#new_reg_pw').val();
    // const repeat_reg_pw = $('#repeat_reg_pw').val();
});
