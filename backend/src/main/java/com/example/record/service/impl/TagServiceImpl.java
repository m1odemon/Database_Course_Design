package com.example.record.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.record.common.BusinessException;
import com.example.record.dto.TagSaveDTO;
import com.example.record.entity.Tag;
import com.example.record.entity.WorkTag;
import com.example.record.mapper.TagMapper;
import com.example.record.mapper.WorkTagMapper;
import com.example.record.service.TagService;
import com.example.record.vo.TagVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TagServiceImpl implements TagService {

    private final TagMapper tagMapper;
    private final WorkTagMapper workTagMapper;

    public TagServiceImpl(TagMapper tagMapper, WorkTagMapper workTagMapper) {
        this.tagMapper = tagMapper;
        this.workTagMapper = workTagMapper;
    }

    @Override
    @Transactional
    public Long create(TagSaveDTO dto) {
        Long count = tagMapper.selectCount(new LambdaQueryWrapper<Tag>().eq(Tag::getName, dto.getName().trim()));
        if (count > 0) {
            throw new BusinessException("标签名称已存在");
        }

        Tag tag = new Tag();
        tag.setName(dto.getName().trim());
        tagMapper.insert(tag);
        return tag.getId();
    }

    @Override
    public List<TagVO> list() {
        return tagMapper.selectList(new LambdaQueryWrapper<Tag>().orderByAsc(Tag::getName))
                .stream()
                .map(tag -> {
                    TagVO vo = new TagVO();
                    vo.setId(tag.getId());
                    vo.setName(tag.getName());
                    return vo;
                })
                .toList();
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Tag tag = tagMapper.selectById(id);
        if (tag == null) {
            throw new BusinessException("标签不存在");
        }
        Long count = workTagMapper.selectCount(new LambdaQueryWrapper<WorkTag>().eq(WorkTag::getTagId, id));
        if (count > 0) {
            throw new BusinessException("标签仍被作品使用，不能删除");
        }
        tagMapper.deleteById(id);
    }
}

