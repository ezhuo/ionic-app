export interface UserInfo {
    id: number;
    avatar?: string;
    login_username?: string;
    true_name?: string;
    images?: string;
    admin?: boolean;
    email?: string;
    phone?: string;

    is_group?: string;
    group_ids?: string;
    group_names?: string;

    org_fdn?: string;
    org_id?: number;
    org_name?: string;

    role_id?: number;
    role_name?: string;

    canton_id?: number;
    canton_fdn?: string;
    canton_name?: string;

    department_id?: number;
    department_name?: string;

    start_time?: string;
    end_time?: string;

    style?: string;
}

export interface User {
    name?: string;
    avatar?: string;
    email?: string;
    [key: string]: any;
}

export interface LoginOptions {
    username: string;
    password?: string;
    mobile?: string;
    captcha?: any;
    remember?: boolean;
}
