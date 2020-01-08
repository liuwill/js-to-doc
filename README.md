# js-to-docx

## TODO

目前合并代码使用的是`gulp-concat`库，后期计划替换成直接文件遍历。

## 使用说明

### 配置文件

修改配置文件`setting.template.json`，指定原始项目的路径和目标文件信息。

```json
{
  "project": { // 项目信息
    "target": "./dist", // 保存js文件的目录
    "source": ["../mall/**/*.js"], // 收集js文件的目录和规则
    "filename": "mall.js" // 目标js文件名
  },
  "result": {
    "target": "./dist/docs", // 保存docx文件的目录
    "filename": "mall.docx" // 保存docx文件的文件名
  }
}
```

### 运行文件

直接运行：`node index.js`或者`yarn run generate`
