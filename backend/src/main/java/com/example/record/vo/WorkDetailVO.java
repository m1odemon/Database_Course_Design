package com.example.record.vo;

import java.util.List;

public class WorkDetailVO extends WorkListVO {

    private List<ReviewVO> reviews;

    public List<ReviewVO> getReviews() {
        return reviews;
    }

    public void setReviews(List<ReviewVO> reviews) {
        this.reviews = reviews;
    }
}

