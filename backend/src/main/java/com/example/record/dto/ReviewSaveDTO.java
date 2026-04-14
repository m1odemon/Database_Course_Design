package com.example.record.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ReviewSaveDTO {

    @NotNull(message = "作品ID不能为空")
    private Long workId;

    @Size(max = 255, message = "感想标题不能超过255个字符")
    private String title;

    @NotBlank(message = "感想内容不能为空")
    @Size(max = 10000, message = "感想内容不能超过10000个字符")
    private String content;

    public Long getWorkId() {
        return workId;
    }

    public void setWorkId(Long workId) {
        this.workId = workId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

