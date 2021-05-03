package com.ssafy.certi.controller;

import ch.qos.logback.core.util.StringCollectionUtil;
import com.ssafy.certi.domain.Board;
import com.ssafy.certi.domain.User;
import com.ssafy.certi.repository.BoardRepository;
import com.ssafy.certi.repository.UserRepository;
import com.ssafy.certi.security.JwtTokenProvider;
import com.ssafy.certi.service.UserService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@Api(tags = {"3. Board"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardRepository boardRepository;

    private UserRepository userRepository;

    @Autowired
    UserService userService;

    @ApiOperation(value = "게시판 등록", notes = "성공 시, true 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "등록 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @PostMapping("/create")
    public ResponseEntity<String> boardAdd(@ApiParam(value = "boardCategory,boardTitle, boardContent,boardFile,boardWriter", required = true) @RequestBody Map<String, String> board, HttpServletRequest request) {
        try {
            User person=userService.findByToken(JwtTokenProvider.resolveToken(request));
            boardRepository.save(Board.builder()
            .userId(person)
            .boardCategory(Integer.parseInt(board.get("boardCategory")))
            .boardTitle(board.get("boardTitle"))
            .boardContent(board.get("boardContent"))
            .boardWriter(board.get("boardWriter"))
            .boardFile(board.get("boardFile"))
            .boardFlag(0)
            .boardHit(0)
            .boardCreate(LocalDate.now())
            .build());
            return new ResponseEntity<>("true", HttpStatus.OK); // 회원가입 성공하면 닉네임 반환

        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }

}
