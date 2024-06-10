<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/cyy.css" type="text/css">
<script src="${pageContext.request.contextPath}/js/jquery-3.7.1.min.js"></script>
<div class="page-main">
	<div id="mini-card1">
		<div class="w">
			<div class="explain">
				<b>이번주 코메 인기글</b>
			</div>

			<div id="back_btn" onclick="location.href='${pageContext.request.contextPath}/rboard/list.do'">팀원 구하기</div>
			<a class="more"
				href=${pageContext.request.contextPath}/rboard/list.do>더보기</a>
		</div>

		<div class="mini-container1">

			<div class="wrapper1">

				<c:forEach var="rboard" items="${SlideList}">
					<div class="mini1">
						<div class="content1"
							onclick="location.href='${pageContext.request.contextPath}/rboard/detail.do?rb_num=${rboard.rb_num}'">
							<div class="link">
								<div class="rb_category_div">
									<!-- 카테고리 -->

									<c:if test="${rboard.rb_category == 0}">
										<span class="rb_category study"> 스터디</span>
									</c:if>

									<c:if test="${rboard.rb_category == 1}">
										<span class="rb_category project"> 프로젝트</span>
									</c:if>
									<br> <span id="endDate">${rboard.rb_endRecruit} 마감</span>
								</div>

								<!-- <hr size="1px" id="line1"> -->
								<p class="rb-title">${rboard.rb_title}</p>
								<!-- 제목 -->
								<div class="detail">
									<div class="way">
										<span>진행방식 | </span> <span> <c:if
												test="$	{rboard.rb_meet == 0}">
									온라인
									</c:if> <c:if test="${rboard.rb_meet == 1}">
									오프라인
									</c:if> <c:if test="${rboard.rb_meet == 2}">
									온라인/오프라인
									</c:if> <br>
										</span>

										<div id="field">
											<span>모집필드 | </span>
											<c:forEach var="field" items="${rboard.f_name_arr}">
												${field}
											</c:forEach>
										</div>
										<div>
											<span>신청인원 | </span> <span>${rboard.rb_apply_count}/<c:if
													test="${rboard.rb_teamsize==0}">인원 미정</c:if> <c:if
													test="${rboard.rb_teamsize!=0 && rboard.rb_teamsize!=10}">${rboard.rb_teamsize}</c:if>

												<c:if test="${rboard.rb_teamsize==10}">10명 이상</c:if>
											</span>
										</div>
									</div>

									<div class="hit-div">
										<span class="b hit">
										<img src="${pageContext.request.contextPath}/images/cje/boardHitIcon.png" id="hit1"> 
										${rboard.rb_hit}</span>
									</div>

								</div>
							</div>
							<!-- end of link -->
						</div>
						<!-- end of content -->
					</div>
				</c:forEach>
			</div>
		</div>
		<!-- end of mini-container -->

		<button class="p1">
			<img src="${pageContext.request.contextPath}/images/left_arrow_1.png"
				alt="이전" width="20">
		</button>

		<button class="n1">
			<img
				src="${pageContext.request.contextPath}/images/right_arrow_1.png"
				alt="다음" width="20">
		</button>
	</div>

	<div id="mini-card2">

		<div class="w2">
			<div class="explain"> <b>이번주 코메 인기글</b> </div>
			<button id="front_btn" onclick="location.href='${pageContext.request.contextPath}/cboard/community.do'">커뮤니티</button>
			<a class="more" href=${pageContext.request.contextPath}/cboard/community.do>더보기</a>
		</div>

		<div class="mini-container2">
			<div class="wrapper2">
				<c:forEach var="cboard" items="${SlideList2}">
					<div class="mini2">
						<div class="content2" onclick="location.href='${pageContext.request.contextPath}/cboard/communityDetail.do?cb_num=${cboard.cb_num}'">
							<div class="link">
								<div class="top">
									<span class="type D"> 
										<c:if test="${cboard.cb_type == 1}">
										<img src="${pageContext.request.contextPath}/images/cje/codingBoardIcon.png" width="25px" id="coding"> 
										<span class="board_type">개발 게시판</span></c:if>
									</span> 
									<span class="type F"> 
										<c:if test="${cboard.cb_type == 0}">
										<img src="${pageContext.request.contextPath}/images/cje/freeBoardIcon.png" width="25px" id="free">
										<span class="board_type">자유 게시판</span>
										</c:if>
									</span>
									<hr size="2px" id="line2">
								</div>

								<div id="middle">
									<span class="title">${cboard.cb_title}</span> <br> <br>
								</div>

								<div class="detail2">

									<div id="below">
										<span class="b date">등록일 | ${cboard.cb_reg_date}</span> <br>
									</div>

									<div class="hit">
										<span>
										<img id="hit2" src="${pageContext.request.contextPath}/images/cje/boardHitIcon.png">
										 ${cboard.cb_hit}</span>
									</div>
								</div><!-- end of detail2 -->
								
							</div>
						</div>
					</div>
				</c:forEach>
			</div>
		</div>

		<!-- end of mini-container -->
		<button class="p2">
			<img src="${pageContext.request.contextPath}/images/left_arrow_1.png"
				alt="이전" width="20">
		</button>
		
		<button class="n2">
			<img
				src="${pageContext.request.contextPath}/images/right_arrow_1.png"
				alt="다음" width="20">
		</button>
	</div>
	<!-- end of mini-card1 -->
</div>
<script src="${pageContext.request.contextPath}/js/card.js"></script>