package kr.cboard.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.controller.Action;

public class CommunityAction2 implements Action{

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 커뮤니티 (개발 게시판으로 이동) => 이 부분 하나로 합쳐도 할 수 있음
		return "/WEB-INF/views/cBoard/codingBoard.jsp";
	}

}
