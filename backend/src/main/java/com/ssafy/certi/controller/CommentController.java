package com.ssafy.certi.controller;

import com.ssafy.certi.domain.Board;
import com.ssafy.certi.domain.Comment;
import com.ssafy.certi.domain.User;
import com.ssafy.certi.dto.DetailBoard;
import com.ssafy.certi.repository.BoardRepository;
import com.ssafy.certi.repository.CommentRepository;
import com.ssafy.certi.security.JwtTokenProvider;
import com.ssafy.certi.service.UserService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Api(tags = {"6. Comment"})
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    UserService userService;

    @ApiOperation(value = "댓글 등록", notes = "성공 시, true 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "등록 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @PostMapping("/create")
    public ResponseEntity<String> ccommentAdd(@ApiParam(value = "boardId, commentContent", required = true) @RequestBody Map<String, String> comment, HttpServletRequest request) {
        try {
            User person=userService.findByToken(JwtTokenProvider.resolveToken(request));
            Board board=boardRepository.findByBoardId(Integer.parseInt(comment.get("boardId")));
            commentRepository.save(Comment.builder()
                    .UserId(person)
                    .board(board)
                    .commentContent(comment.get("commentContent"))
                    .commentCreate(LocalDate.now())
                    .build());
            return new ResponseEntity<>("true", HttpStatus.OK);

        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }



    @ApiOperation(value = "댓글 조회", notes = "성공 시, true 반환")
    @GetMapping("/{boardId}")
    public ResponseEntity<Optional<List<Comment>>> commentList(@PathVariable Integer boardId) {

        try {
            Board board=boardRepository.findByBoardId(boardId);

            Optional<List<Comment>> comment=commentRepository.findAllByBoard(board);

            return new ResponseEntity<>(comment, HttpStatus.OK);

        } catch (IllegalStateException e) { // exception return 하게 수정
            Optional<List<Comment>> box=null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }
}
