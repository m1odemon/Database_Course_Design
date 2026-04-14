package com.example.record.controller;

import com.example.record.common.Result;
import com.example.record.dto.TagSaveDTO;
import com.example.record.service.TagService;
import com.example.record.vo.TagVO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PostMapping
    public Result<Long> create(@Valid @RequestBody TagSaveDTO dto) {
        return Result.success("创建成功", tagService.create(dto));
    }

    @GetMapping
    public Result<List<TagVO>> list() {
        return Result.success(tagService.list());
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        tagService.delete(id);
        return Result.success("删除成功", null);
    }
}

