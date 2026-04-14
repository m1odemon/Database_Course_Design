package com.example.record.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TagSaveDTO {

    @NotBlank(message = "标签名不能为空")
    @Size(max = 100, message = "标签名不能超过100个字符")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

