package com.ssafy.certi.controller;

import com.ssafy.certi.domain.Board;
import com.ssafy.certi.domain.Comment;
import com.ssafy.certi.domain.User;
import com.ssafy.certi.dto.DetailBoard;
import com.ssafy.certi.repository.BoardRepository;
import com.ssafy.certi.repository.CommentRepository;
import com.ssafy.certi.security.JwtTokenProvider;
import com.ssafy.certi.service.BoardService;
import com.ssafy.certi.service.UserService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Api(tags = {"3. Board"})
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    UserService userService;

    BoardService boardService;

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
            .boardCategory(board.get("boardCategory"))
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


    @ApiOperation(value = "게시판 카테고리별 조회", notes = "성공 시, true 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "등록 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Board>> boardCategoryList(@PathVariable String category) {

        try {
            List<Board> boardList=boardRepository.findByBoardCategory(category);
            return new ResponseEntity<>(boardList, HttpStatus.OK);

        } catch (IllegalStateException e) { // exception return 하게 수정
            List<Board> box = null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "게시판 조회", notes = "성공 시, true 반환")
    @GetMapping("/detail/{boardId}")
    public ResponseEntity<DetailBoard> boardDetail(@PathVariable Integer boardId) {

        try {
            Board board=boardRepository.findByBoardId(boardId);
            board.setBoardHit(board.getBoardHit()+1);
            boardRepository.save(board);

            DetailBoard detailBaord = new DetailBoard();
            detailBaord.setBoard(board);

            Optional<List<Comment>> comment=commentRepository.findAllByBoard(board);
            detailBaord.setComment(comment);

            return new ResponseEntity<>(detailBaord, HttpStatus.OK);

        } catch (IllegalStateException e) { // exception return 하게 수정
            DetailBoard box=null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @ApiOperation(value = "게시판 삭제", notes = "성공 시, true 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "등록 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @DeleteMapping("/delete/{boardId}")
    public ResponseEntity<String> boardPostDelete(@PathVariable Integer boardId, HttpServletRequest request) {

        try {
            Board board=boardRepository.findByBoardId(boardId);

            commentRepository.deleteByBoard(board);
            boardRepository.deleteByBoardId(boardId);
            // boardRepository.deleteByBoardId(boardId);//게시글 완전 삭제
            //board.setBoardFlag(false);
            //boardRepository.save(board);

            return new ResponseEntity<>("true", HttpStatus.OK);
        } catch (IllegalStateException e) { // exception return 하게 수정
            return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
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
            List<Board> result=boardRepository.findByBoardTitleContaining(boardTitle);
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
    @PutMapping("/motify/{boardId}")
    public ResponseEntity<Board> boardPostUpdate(@PathVariable Integer boardId,@ApiParam(value = "boardCategory,boardTitle, boardContent, boardFile", required = true) @RequestBody Map<String, String> motifyBoard) {

        try {
            Board board=boardRepository.findByBoardId(boardId);
            board.setBoardContent(motifyBoard.get("boardContent"));
            board.setBoardCategory(motifyBoard.get("boardCategory"));
            board.setBoardTitle(motifyBoard.get("boardTitle"));
            boardRepository.save(board);

            return new ResponseEntity<>(board, HttpStatus.OK);
        } catch (IllegalStateException e) { // exception return 하게 수정
            Board box=null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }

}
