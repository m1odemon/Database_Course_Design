package com.example.record.controller;

import com.example.record.common.Result;
import com.example.record.dto.ReviewSaveDTO;
import com.example.record.service.ReviewService;
import com.example.record.vo.ReviewVO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/api/reviews")
    public Result<Long> create(@Valid @RequestBody ReviewSaveDTO dto) {
        return Result.success("创建成功", reviewService.create(dto));
    }

    @PutMapping("/api/reviews/{id}")
    public Result<Void> update(@PathVariable Long id, @Valid @RequestBody ReviewSaveDTO dto) {
        reviewService.update(id, dto);
        return Result.success("更新成功", null);
    }

    @DeleteMapping("/api/reviews/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        reviewService.delete(id);
        return Result.success("删除成功", null);
    }

    @GetMapping("/api/works/{workId}/reviews")
    public Result<List<ReviewVO>> listByWorkId(@PathVariable Long workId) {
        return Result.success(reviewService.listByWorkId(workId));
    }
}
