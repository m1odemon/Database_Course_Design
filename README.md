# 电影书籍观后感管理系统
<<<<<<< HEAD
figma+codex
=======
用figma make找前端灵感，用codex完成代码框架
>>>>>>> 9cc4908f16584c5dc94f812987152513f5685863
基于 `Spring Boot + MyBatis-Plus + MySQL + Vue 3` 的个人作品管理系统，支持作品、标签、感想的基础管理。

## 目录

- `backend`：后端服务
- `frontend`：前端页面
- `docs/sql/schema.sql`：数据库建表脚本

## 启动步骤

1. 先执行 [docs/sql/schema.sql](/c:/Users/27398/Desktop/数据库应用软件/docs/sql/schema.sql) 初始化数据库。
2. 修改 [backend/src/main/resources/application.yml](/c:/Users/27398/Desktop/数据库应用软件/backend/src/main/resources/application.yml) 中的 MySQL 用户名与密码。
3. 在 `backend` 目录运行 `mvn spring-boot:run`。
4. 在 `frontend` 目录运行 `npm.cmd install` 和 `npm.cmd run dev`。

