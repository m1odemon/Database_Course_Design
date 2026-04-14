package com.example.record.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public class WorkSaveDTO {

    @NotBlank(message = "作品标题不能为空")
    @Size(max = 255, message = "作品标题不能超过255个字符")
    private String title;

    @NotBlank(message = "作品类型不能为空")
    private String type;

    @Size(max = 255, message = "创作者不能超过255个字符")
    private String creator;

    @Size(max = 500, message = "封面地址不能超过500个字符")
    private String coverUrl;

    @Size(max = 5000, message = "作品简介不能超过5000个字符")
    private String description;

    @NotBlank(message = "作品状态不能为空")
    private String status;

    @Min(value = 1, message = "评分最低为1")
    @Max(value = 10, message = "评分最高为10")
    private Integer rating;

    private LocalDate finishedDate;

    @NotNull(message = "标签列表不能为空")
    private List<Long> tagIds;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public LocalDate getFinishedDate() {
        return finishedDate;
    }

    public void setFinishedDate(LocalDate finishedDate) {
        this.finishedDate = finishedDate;
    }

    public List<Long> getTagIds() {
        return tagIds;
    }

    public void setTagIds(List<Long> tagIds) {
        this.tagIds = tagIds;
    }
}

