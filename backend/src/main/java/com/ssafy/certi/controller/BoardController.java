package com.ssafy.certi.controller;

import com.ssafy.certi.domain.Board;
import com.ssafy.certi.domain.User;
import com.ssafy.certi.repository.BoardRepository;
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

@Api(tags = {"3. Board"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
@CrossOrigin("*")
public class BoardController {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    UserService userService;

    @ApiOperation(value = "게시판 등록", notes = "성공 시, true 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "등록 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @PostMapping("/create")
    public ResponseEntity<String> boardPostAdd(@ApiParam(value = "boardCategory,boardTitle, boardContent,boardFile", required = true) @RequestBody Map<String, String> board, HttpServletRequest request) {
        try {
            User person=userService.findByToken(JwtTokenProvider.resolveToken(request));

            boardRepository.save(Board.builder()
            .userId(person)
            .boardCategory(Integer.parseInt(board.get("boardCategory")))
            .boardTitle(board.get("boardTitle"))
            .boardContent(board.get("boardContent"))
            .boardWriter(person.getUsername())
            .boardFile(board.get("boardFile"))
            .boardFlag(Boolean.TRUE)
            .boardHit(0)
            .boardCreate(LocalDate.now())
            .build());
            return new ResponseEntity<>("true", HttpStatus.OK);

        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "게시판 전체 리스트", notes = "성공 시, true 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "등록 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("/")
    public ResponseEntity<List<Board>> boardAllList() {

        try {
            List<Board> boardList=boardRepository.findAll();
            return new ResponseEntity<>(boardList, HttpStatus.OK);

        } catch (IllegalStateException e) { // exception return 하게 수정
            List<Board> box = null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "게시판 조회", notes = "성공 시, true 반환")
    @GetMapping("/{boardId}")
    public ResponseEntity<Board> boardDetail(@PathVariable Integer boardId) {

        try {
            Board board=boardRepository.findByBoardId(boardId);
            board.show(); //hit up
            return new ResponseEntity<>(board, HttpStatus.OK);

        } catch (IllegalStateException e) { // exception return 하게 수정
            Board box=null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation(value = "게시판 삭제", notes = "성공 시, true 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "등록 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @DeleteMapping("/delete/{boardId}")
    public ResponseEntity<Board> boardPostDelete(@PathVariable Integer boardId, HttpServletRequest request) {

        try {
            User person= userService.findByToken(JwtTokenProvider.resolveToken(request));
            Board board=boardRepository.findByBoardId(boardId);
            if(person.getUserId()==board.getUserId().getUserId()){
               // boardRepository.deleteByBoardId(boardId);//게시글 완전 삭제
                board.delete();
                boardRepository.save(board);
            }
            return new ResponseEntity<>(board, HttpStatus.OK);
        } catch (IllegalStateException e) { // exception return 하게 수정
            Board box=null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation(value = "게시판 이름 검색", notes = "성공 시, true 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "등록 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("/search/{boardTitle}")
    public ResponseEntity<List<Board>> boardSearchTitle(@PathVariable String boardTitle) {

        try {
            List<Board> result=boardRepository.findByBoardTitle(boardTitle);
            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (IllegalStateException e) { // exception return 하게 수정
            List<Board> box=null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "게시판 수정", notes = "성공 시, true 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "등록 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @PutMapping("/update/{boardId}")
    public ResponseEntity<Board> boardPostUpdate(@PathVariable Integer boardId,@ApiParam(value = "boardCategory,boardTitle, boardContent, boardFile", required = true) @RequestBody Map<String, String> newBoard, HttpServletRequest request) {

        try {
            User person= userService.findByToken(JwtTokenProvider.resolveToken(request));
            Board board=boardRepository.findByBoardId(boardId);
            if(person.getUserId()==board.getUserId().getUserId()){
                // boardRepository.deleteByBoardId(boardId);//게시글 완전 삭제
                board.updateBoardContent(newBoard.get("boardTitle"),newBoard.get("boardContent"));
                if(newBoard.get("boardFile")!=null){
                    board.updateFile(newBoard.get("boardFile"));
                }
                boardRepository.save(board);
            }
            return new ResponseEntity<>(board, HttpStatus.OK);
        } catch (IllegalStateException e) { // exception return 하게 수정
            Board box=null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }

}
