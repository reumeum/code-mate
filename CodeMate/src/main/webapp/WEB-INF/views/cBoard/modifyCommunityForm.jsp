<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>글쓰기</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/share.css" type="text/css">
	
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
    
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/cje.boardDetail.css" type="text/css">
    
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap" rel="stylesheet">
    
    <script type="text/javascript">
window.onload = function(){
    const myForm = document.getElementById('modify_form');
    myForm.onsubmit = function(){
        const title = document.getElementById('cb_title');
        const content = document.getElementById('cb_content');

        if(title.value.trim()==''){
                alert('제목을 입력하세요.');
                title.value='';
                title.focus();
                return false;
        };
        
        if(content.value.trim()==''){
            alert('내용을 입력하세요.');
            content.value='';
            content.focus();
            return false;
        };

    };
};
</script>
    
</head>
<body>
		<div class="page-container">
			<div class="header"> 
				<jsp:include page="/WEB-INF/views/common/header.jsp"/>
			</div>	
	        <div class="container_write">
		        <form action="${pageContext.request.contextPath}/cboard/cboardModify.do" id="modify_form" method="post" enctype="multipart/form-data">
		        	<input type="hidden" name="cb_num" value="${board.cb_num}">
		        	<div class="form-group">
						<input type="radio" name="cb_type" value="0" id="cb_type0" <c:if test="${board.cb_type==0}">checked</c:if>>
						<img src="${pageContext.request.contextPath}/images/cje/freeBoardIcon.png" width="15"> 자유 게시판
						<input type="radio" name="cb_type" value="1" id="cb_type1" <c:if test="${board.cb_type==1}">checked</c:if>> 
						<img src="${pageContext.request.contextPath}/images/cje/codingBoardIcon.png" width="15"> 개발 게시판
					</div>
		            <div class="form-group">
		                <label for="cb_title">제목</label>
		                <input type="text" name="cb_title" id="cb_title" maxlength="50" class="form-control" value="${board.cb_title}">
		            </div>
		            <div class="form-group">
		                <label for="cb_content">내용</label>
		                <textarea rows="20" cols="100" name="cb_content" id="cb_content" class="form-control">${board.cb_content}</textarea>
		            </div>
		            <div class="form-group">
		                <label for="cb_file">이미지</label>
		                <input type="file" name="cb_file" id="cb_file" accept="image/gif,image/png,image/jpeg" class="form-control">
		            </div>
		            <div class="form-actions">	
		                <input type="submit" value="수정" class="btn btn-primary">
		                <input type="button" value="목록" class="btn btn-secondary" onclick="location.href='community.do'">
		            </div>
		        </form>
	    	</div>
	       
   	 </div>
</body>
</html>
