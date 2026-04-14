package com.example.record.service;

import com.example.record.dto.TagSaveDTO;
import com.example.record.vo.TagVO;

import java.util.List;

public interface TagService {

    Long create(TagSaveDTO dto);

    List<TagVO> list();

    void delete(Long id);
}

