# 头像图片目录

此目录用于存放用户头像图片。

## 当前文件

目前目录中包含以下头像图片：
- `default-avatar.png` - 默认用户头像，在用户未提供头像时使用

## 推荐规格

- 格式：PNG 或 JPG
- 尺寸：200 x 200 像素（正方形）
- 大小：小于 100KB
- 背景：建议使用纯色或简单背景，以提高辨识度

## 使用说明

要替换默认头像，只需用相同的文件名覆盖现有文件即可。确保新图片是一个有效的图片文件，而不是文本文件。

## 用户上传头像

在用户个人资料页面，用户可以上传自己的头像图片。系统会自动将上传的图片调整为适当的大小和格式。

上传头像的处理流程：
1. 用户选择图片文件
2. 系统验证文件格式（仅接受JPG、PNG、GIF格式）
3. 系统检查文件大小（限制在2MB以内）
4. 系统将图片裁剪为正方形并调整为200x200像素
5. 系统保存处理后的图片，并更新用户资料

## 图片加载失败处理

当用户头像加载失败时，系统会自动使用default-avatar.png作为替代图片。 