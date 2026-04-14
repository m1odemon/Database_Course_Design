package com.example.record.service;

import com.example.record.common.PageResult;
import com.example.record.dto.WorkQueryDTO;
import com.example.record.dto.WorkSaveDTO;
import com.example.record.vo.WorkDetailVO;
import com.example.record.vo.WorkListVO;

public interface WorkService {

    Long create(WorkSaveDTO dto);

    void update(Long id, WorkSaveDTO dto);

    void delete(Long id);

    WorkDetailVO detail(Long id);

    PageResult<WorkListVO> page(WorkQueryDTO queryDTO);
}

