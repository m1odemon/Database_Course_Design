package com.example.record.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.record.common.BusinessException;
import com.example.record.dto.ReviewSaveDTO;
import com.example.record.entity.Review;
import com.example.record.entity.Work;
import com.example.record.mapper.ReviewMapper;
import com.example.record.mapper.WorkMapper;
import com.example.record.service.ReviewService;
import com.example.record.vo.ReviewVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewMapper reviewMapper;
    private final WorkMapper workMapper;

    public ReviewServiceImpl(ReviewMapper reviewMapper, WorkMapper workMapper) {
        this.reviewMapper = reviewMapper;
        this.workMapper = workMapper;
    }

    @Override
    @Transactional
    public Long create(ReviewSaveDTO dto) {
        validateWork(dto.getWorkId());
        Review review = new Review();
        review.setWorkId(dto.getWorkId());
        review.setTitle(dto.getTitle());
        review.setContent(dto.getContent());
        reviewMapper.insert(review);
        return review.getId();
    }

    @Override
    @Transactional
    public void update(Long id, ReviewSaveDTO dto) {
        Review review = getReviewOrThrow(id);
        validateWork(dto.getWorkId());
        review.setWorkId(dto.getWorkId());
        review.setTitle(dto.getTitle());
        review.setContent(dto.getContent());
        reviewMapper.updateById(review);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        getReviewOrThrow(id);
        reviewMapper.deleteById(id);
    }

    @Override
    public List<ReviewVO> listByWorkId(Long workId) {
        validateWork(workId);
        return reviewMapper.selectList(new LambdaQueryWrapper<Review>()
                        .eq(Review::getWorkId, workId)
                        .orderByDesc(Review::getUpdatedTime)
                        .orderByDesc(Review::getCreatedTime))
                .stream()
                .map(review -> {
                    ReviewVO vo = new ReviewVO();
                    vo.setId(review.getId());
                    vo.setWorkId(review.getWorkId());
                    vo.setTitle(review.getTitle());
                    vo.setContent(review.getContent());
                    vo.setCreatedTime(review.getCreatedTime());
                    vo.setUpdatedTime(review.getUpdatedTime());
                    return vo;
                })
                .toList();
    }

    private void validateWork(Long workId) {
        Work work = workMapper.selectById(workId);
        if (work == null) {
            throw new BusinessException("关联作品不存在");
        }
    }

    private Review getReviewOrThrow(Long id) {
        Review review = reviewMapper.selectById(id);
        if (review == null) {
            throw new BusinessException("感想不存在");
        }
        return review;
    }
}

