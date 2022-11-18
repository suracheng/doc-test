/**
 * 获取样式版本名称
 * @returns {string}
 */
import { ElMessage } from 'element-plus'

const genFileName = (info: any) => {
  // 生成的文件名称
  const version = info.version
  const project = info.project

  return `element-plus-${version}-${project}-reset.css`
}

/**
 * S3 文件上传
 * @param file
 * @returns
 */
export function S3ClientUpload() {
  const AWS = (window as any).AWS
  const params = {
    region: 'cn-north-1', // s3 服务
    accessKeyId: 'AKIAX4H6IDZMBSXEAQXK',
    secretAccessKey: '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',
  }
  const s3 = new AWS.S3(params)

  return (fileInfo, cb) => {
    const file = fileInfo.file.raw
    if (!file) {
      return
    }
    const uploadParams = {
      Bucket: 's3-225-itsh-mpc-uat-dev', // 储存桶名称
      Key: `element-plus/style/${genFileName(fileInfo)}`, // 储存地址及文件名
      Body: file, // 文件流
      ContentType: file.type,
      'Access-Control-Allow-Origin': '*',
    }
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.log('失败', err)
        ElMessage.error('S3 文件上传失败！')
      } else {
        console.log('成功', data)
        cb && cb()
      }
    })
  }
}

// S3 数据拉取
export const s3FileDownload = () => {
  const AWS = (window as any).AWS
  const params = {
    region: 'cn-north-1', // s3 服务
    accessKeyId: 'AKIAX4H6IDZMBSXEAQXK',
    secretAccessKey: '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',
  }
  const s3 = new AWS.S3(params)
  const aParams: any = {
    Bucket: 's3-225-itsh-mpc-uat-dev',
  }

  return () => {
    return new Promise((resolve, reject) => {
      s3.listObjectsV2(aParams, function (err, data) {
        if (!err) {
          console.log('listObjectsV2===', data)
          // 获取存储的数据信息
          const styleList: string[] = []
          const contents = data.Contents
          const origin =
            'https://s3-225-itsh-mpc-uat-dev.s3.cn-north-1.amazonaws.com.cn'
          contents.forEach((c) => {
            styleList.push(`${origin}/${c.Key}`)
          })
          resolve(styleList)
          return
        }
        // an error occurred
        console.log(err, err.stack)
        reject(err)
      })
    })
  }
}

// S3 数据删除
export const s3FileDelete = () => {
  const AWS = (window as any).AWS
  const params = {
    region: 'cn-north-1', // s3 服务
    accessKeyId: 'AKIAX4H6IDZMBSXEAQXK',
    secretAccessKey: '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',
  }
  const s3 = new AWS.S3(params)

  return (key: string) => {
    const aParams: any = {
      Bucket: 's3-225-itsh-mpc-uat-dev',
      Key: key, // 储存地址及文件名
    }
    s3.deleteObject(aParams, (err, data) => {
      if (!err) {
        console.log('删除成功====')
      } else {
        console.log('删除失败====', err)
      }
    })
  }
}
