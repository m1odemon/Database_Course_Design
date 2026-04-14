package com.example.record.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.record.common.BusinessException;
import com.example.record.common.PageResult;
import com.example.record.dto.WorkQueryDTO;
import com.example.record.dto.WorkSaveDTO;
import com.example.record.entity.Review;
import com.example.record.entity.Tag;
import com.example.record.entity.Work;
import com.example.record.entity.WorkTag;
import com.example.record.mapper.ReviewMapper;
import com.example.record.mapper.TagMapper;
import com.example.record.mapper.WorkMapper;
import com.example.record.mapper.WorkTagMapper;
import com.example.record.service.WorkService;
import com.example.record.vo.ReviewVO;
import com.example.record.vo.TagVO;
import com.example.record.vo.WorkDetailVO;
import com.example.record.vo.WorkListVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class WorkServiceImpl implements WorkService {

    private final WorkMapper workMapper;
    private final TagMapper tagMapper;
    private final WorkTagMapper workTagMapper;
    private final ReviewMapper reviewMapper;

    public WorkServiceImpl(WorkMapper workMapper,
                           TagMapper tagMapper,
                           WorkTagMapper workTagMapper,
                           ReviewMapper reviewMapper) {
        this.workMapper = workMapper;
        this.tagMapper = tagMapper;
        this.workTagMapper = workTagMapper;
        this.reviewMapper = reviewMapper;
    }

    @Override
    @Transactional
    public Long create(WorkSaveDTO dto) {
        validateWork(dto);
        validateTags(dto.getTagIds());

        Work work = new Work();
        copyWork(work, dto);
        workMapper.insert(work);
        saveWorkTags(work.getId(), dto.getTagIds());
        return work.getId();
    }

    @Override
    @Transactional
    public void update(Long id, WorkSaveDTO dto) {
        Work work = getWorkOrThrow(id);
        validateWork(dto);
        validateTags(dto.getTagIds());

        copyWork(work, dto);
        workMapper.updateById(work);

        workTagMapper.delete(new LambdaUpdateWrapper<WorkTag>().eq(WorkTag::getWorkId, id));
        saveWorkTags(id, dto.getTagIds());
    }

    @Override
    @Transactional
    public void delete(Long id) {
        getWorkOrThrow(id);
        reviewMapper.delete(new LambdaUpdateWrapper<Review>().eq(Review::getWorkId, id));
        workTagMapper.delete(new LambdaUpdateWrapper<WorkTag>().eq(WorkTag::getWorkId, id));
        workMapper.deleteById(id);
    }

    @Override
    public WorkDetailVO detail(Long id) {
        Work work = getWorkOrThrow(id);
        WorkDetailVO vo = toDetailVO(work);
        vo.setTags(listTagsByWorkIds(List.of(id)).getOrDefault(id, Collections.emptyList()));
        vo.setReviews(listReviewsByWorkId(id));
        return vo;
    }

    @Override
    public PageResult<WorkListVO> page(WorkQueryDTO queryDTO) {
        Page<Work> page = new Page<>(queryDTO.getPageNum(), queryDTO.getPageSize());
        LambdaQueryWrapper<Work> wrapper = new LambdaQueryWrapper<>();

        wrapper.like(StringUtils.hasText(queryDTO.getKeyword()), Work::getTitle, queryDTO.getKeyword())
                .eq(StringUtils.hasText(queryDTO.getType()), Work::getType, queryDTO.getType())
                .eq(StringUtils.hasText(queryDTO.getStatus()), Work::getStatus, queryDTO.getStatus())
                .orderByDesc(Work::getUpdatedTime)
                .orderByDesc(Work::getCreatedTime);

        if (queryDTO.getTagId() != null) {
            List<Long> workIds = workTagMapper.selectList(new LambdaQueryWrapper<WorkTag>()
                            .eq(WorkTag::getTagId, queryDTO.getTagId()))
                    .stream()
                    .map(WorkTag::getWorkId)
                    .distinct()
                    .toList();
            if (workIds.isEmpty()) {
                return new PageResult<>(0, queryDTO.getPageNum(), queryDTO.getPageSize(), Collections.emptyList());
            }
            wrapper.in(Work::getId, workIds);
        }

        Page<Work> result = workMapper.selectPage(page, wrapper);
        List<Work> works = result.getRecords();
        List<Long> workIds = works.stream().map(Work::getId).toList();
        Map<Long, List<TagVO>> tagMap = listTagsByWorkIds(workIds);
        List<WorkListVO> records = works.stream()
                .map(work -> {
                    WorkListVO vo = toListVO(work);
                    vo.setTags(tagMap.getOrDefault(work.getId(), Collections.emptyList()));
                    return vo;
                })
                .toList();

        return new PageResult<>(result.getTotal(), result.getCurrent(), result.getSize(), records);
    }

    private void validateWork(WorkSaveDTO dto) {
        if (!Set.of("movie", "book").contains(dto.getType())) {
            throw new BusinessException("作品类型只能是 movie 或 book");
        }
        if (!Set.of("wishlist", "completed").contains(dto.getStatus())) {
            throw new BusinessException("作品状态只能是 wishlist 或 completed");
        }
    }

    private void validateTags(List<Long> tagIds) {
        if (tagIds == null || tagIds.isEmpty()) {
            return;
        }
        long count = tagMapper.selectCount(new QueryWrapper<Tag>().lambda().in(Tag::getId, tagIds));
        if (count != tagIds.stream().distinct().count()) {
            throw new BusinessException("标签列表中包含不存在的数据");
        }
    }

    private Work getWorkOrThrow(Long id) {
        Work work = workMapper.selectById(id);
        if (work == null) {
            throw new BusinessException("作品不存在");
        }
        return work;
    }

    private void copyWork(Work work, WorkSaveDTO dto) {
        work.setTitle(dto.getTitle());
        work.setType(dto.getType());
        work.setCreator(dto.getCreator());
        work.setCoverUrl(dto.getCoverUrl());
        work.setDescription(dto.getDescription());
        work.setStatus(dto.getStatus());
        work.setRating(dto.getRating());
        work.setFinishedDate(dto.getFinishedDate());
    }

    private void saveWorkTags(Long workId, List<Long> tagIds) {
        if (tagIds == null || tagIds.isEmpty()) {
            return;
        }
        List<WorkTag> relations = tagIds.stream()
                .distinct()
                .map(tagId -> {
                    WorkTag relation = new WorkTag();
                    relation.setWorkId(workId);
                    relation.setTagId(tagId);
                    return relation;
                })
                .toList();
        relations.forEach(workTagMapper::insert);
    }

    private Map<Long, List<TagVO>> listTagsByWorkIds(List<Long> workIds) {
        if (workIds == null || workIds.isEmpty()) {
            return Collections.emptyMap();
        }
        List<WorkTag> relations = workTagMapper.selectList(new LambdaQueryWrapper<WorkTag>().in(WorkTag::getWorkId, workIds));
        if (relations.isEmpty()) {
            return Collections.emptyMap();
        }

        List<Long> tagIds = relations.stream().map(WorkTag::getTagId).distinct().toList();
        Map<Long, Tag> tagMap = tagMapper.selectBatchIds(tagIds).stream()
                .collect(Collectors.toMap(Tag::getId, tag -> tag));

        Map<Long, List<TagVO>> result = new LinkedHashMap<>();
        for (WorkTag relation : relations) {
            Tag tag = tagMap.get(relation.getTagId());
            if (tag == null) {
                continue;
            }
            result.computeIfAbsent(relation.getWorkId(), key -> new ArrayList<>()).add(toTagVO(tag));
        }
        return result;
    }

    private List<ReviewVO> listReviewsByWorkId(Long workId) {
        return reviewMapper.selectList(new LambdaQueryWrapper<Review>()
                        .eq(Review::getWorkId, workId)
                        .orderByDesc(Review::getUpdatedTime)
                        .orderByDesc(Review::getCreatedTime))
                .stream()
                .map(this::toReviewVO)
                .toList();
    }

    private WorkListVO toListVO(Work work) {
        WorkListVO vo = new WorkListVO();
        vo.setId(work.getId());
        vo.setTitle(work.getTitle());
        vo.setType(work.getType());
        vo.setCreator(work.getCreator());
        vo.setCoverUrl(work.getCoverUrl());
        vo.setDescription(work.getDescription());
        vo.setStatus(work.getStatus());
        vo.setRating(work.getRating());
        vo.setFinishedDate(work.getFinishedDate());
        vo.setCreatedTime(work.getCreatedTime());
        vo.setUpdatedTime(work.getUpdatedTime());
        return vo;
    }

    private WorkDetailVO toDetailVO(Work work) {
        WorkDetailVO vo = new WorkDetailVO();
        WorkListVO base = toListVO(work);
        vo.setId(base.getId());
        vo.setTitle(base.getTitle());
        vo.setType(base.getType());
        vo.setCreator(base.getCreator());
        vo.setCoverUrl(base.getCoverUrl());
        vo.setDescription(base.getDescription());
        vo.setStatus(base.getStatus());
        vo.setRating(base.getRating());
        vo.setFinishedDate(base.getFinishedDate());
        vo.setCreatedTime(base.getCreatedTime());
        vo.setUpdatedTime(base.getUpdatedTime());
        return vo;
    }

    private TagVO toTagVO(Tag tag) {
        TagVO vo = new TagVO();
        vo.setId(tag.getId());
        vo.setName(tag.getName());
        return vo;
    }

    private ReviewVO toReviewVO(Review review) {
        ReviewVO vo = new ReviewVO();
        vo.setId(review.getId());
        vo.setWorkId(review.getWorkId());
        vo.setTitle(review.getTitle());
        vo.setContent(review.getContent());
        vo.setCreatedTime(review.getCreatedTime());
        vo.setUpdatedTime(review.getUpdatedTime());
        return vo;
    }
}

