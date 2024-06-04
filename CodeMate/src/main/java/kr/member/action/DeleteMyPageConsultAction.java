package kr.member.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;

import kr.consult.dao.ConsultDAO;
import kr.controller.Action;

public class DeleteMyPageConsultAction implements Action{

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
Map<String,String> mapAjax = new HashMap<String,String>();
		
		HttpSession session = request.getSession();
		Integer mem_num = (Integer)session.getAttribute("mem_num");
		
		if(mem_num == null) {//로그인이 되지 않은 경우
			mapAjax.put("result", "logout");	
		}else {
			request.setCharacterEncoding("utf-8");
		
		ConsultDAO cdao = ConsultDAO.getInstance();
		cdao.deleteConsult(Integer.parseInt(request.getParameter("cs_num")));
		mapAjax.put("result", "success");
			
		}
		//JSON 데이터로 변환
		ObjectMapper mapper = new ObjectMapper();
		String ajaxData = mapper.writeValueAsString(mapAjax);
		
		request.setAttribute("ajaxData", ajaxData);
		
		return "/WEB-INF/views/common/ajax_view.jsp";
	}

}
