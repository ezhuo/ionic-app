export interface Position {
    lng: string;
    lat: string;
}

export interface Sign {
    id?: string;
    foreignId: string; //外键id
    eid: number | string; //客户id
    sourceId: number; //签到来源,1巡检,2试验,3消缺,4值守
    type: number; //1签到,2签出
    longitude: string; //经度
    latitude: string; //纬度
    remark?: string; //备注
    createId?: string; //签到人userId
    createBy?: string; //签到人username
    createTime?: Date; //签到时间
    signPersonList?: SignPerson[]; //签到人列表
    repeat?: boolean; //是否需要重复签到
}
export interface SignPerson {
    id?: string;
    signId?: string; //签到表id
    type?: number; //0主签到人,1附加签到人
    userId?: string; //用户id
    fullName?: string; //签到人姓名
}
