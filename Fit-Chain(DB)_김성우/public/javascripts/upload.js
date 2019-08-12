function readURL(input) {
  if (input.files && input.files[0]) {
    if (input.files[0].type == 'image/jpeg' || input.files[0].type == 'image/png') {

      if (input.files[0].size < 4*1024*1024) {
        var reader = new FileReader();
        console.log(input.files[0]);
        reader.onload = function (e) {
          $('.image-upload-wrap').hide();

          $('.file-upload-image').attr('src', e.target.result);
          $('.file-upload-content').show();

          $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

      } else {

        alert("4MB를 초과하였습니다.");
        return false;
      }

    } else {
      alert("JPG, PNG형식의 파일을 업로드해주세요");
      return;
    }

  } else {
    removeUpload();
  }
}

function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
  $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
  $('.image-upload-wrap').removeClass('image-dropping');
});


// var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
//   }
//   filename: function (req, file, cb) {
//     cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
//   }
// })
// var upload = multer({ storage: storage })


// $(document).ready(function () {

//   $('#upload_btn').click(function () {






//     $.post('/upload',{imgFile:$('#imgFile').val()},(data,status)=>{alert(data);});
//     // var form = $('#upload_form')[0];
//     // var formData = new FormData(form);
//     // formData.append("fileObj", $("#imgFile")[0].files[0]);

//     // console.log(formData);



//     // $.ajax({
//     //   url: $('#upload_form').attr('action'),
//     //   type: 'POST',
//     //   data: $('#upload_form').serialize(),
//     //   success: function (data) {
//     //     console.log('form submitted.' + data);
//     //   }
//     // });
//     // return false;
//   });
// });