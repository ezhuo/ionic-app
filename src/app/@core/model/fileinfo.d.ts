export interface FileInfo {
    uid?: string; //主键
    size?: number; //大小
    name?: string; //资源名称
    filename?: string;
    lastModified?: string;
    lastModifiedDate?: Date;
    url?: string;
    status?: any; //状态(1:正常，0:删除)
    originFileObj?: string; //原文件路径
    percent?: number;
    thumbUrl?: string; //缩略文件路径(图片类型文件)
    response?: any;
    error?: any;
    linkProps?: any;
    type?: string; //类型(jpg, gift, png, xls, doc
    [key: string]: any;

    createTime?: string; ///创建时间
    token?: string;
    base64?: string; //base64字符串
    parameter?: string; //自定义参数,原文返回
}
