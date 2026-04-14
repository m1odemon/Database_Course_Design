package com.example.record.controller;

import com.example.record.common.PageResult;
import com.example.record.common.Result;
import com.example.record.dto.WorkQueryDTO;
import com.example.record.dto.WorkSaveDTO;
import com.example.record.service.WorkService;
import com.example.record.vo.WorkDetailVO;
import com.example.record.vo.WorkListVO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/works")
public class WorkController {

    private final WorkService workService;

    public WorkController(WorkService workService) {
        this.workService = workService;
    }

    @PostMapping
    public Result<Long> create(@Valid @RequestBody WorkSaveDTO dto) {
        return Result.success("创建成功", workService.create(dto));
    }

    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id, @Valid @RequestBody WorkSaveDTO dto) {
        workService.update(id, dto);
        return Result.success("更新成功", null);
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        workService.delete(id);
        return Result.success("删除成功", null);
    }

    @GetMapping("/{id}")
    public Result<WorkDetailVO> detail(@PathVariable Long id) {
        return Result.success(workService.detail(id));
    }

    @GetMapping
    public Result<PageResult<WorkListVO>> page(WorkQueryDTO dto) {
        return Result.success(workService.page(dto));
    }
}

