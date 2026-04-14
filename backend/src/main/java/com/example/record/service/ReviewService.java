package com.example.record.service;

import com.example.record.dto.ReviewSaveDTO;
import com.example.record.vo.ReviewVO;

import java.util.List;

public interface ReviewService {

    Long create(ReviewSaveDTO dto);

    void update(Long id, ReviewSaveDTO dto);

    void delete(Long id);

    List<ReviewVO> listByWorkId(Long workId);
}

