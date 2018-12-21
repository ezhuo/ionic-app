import { FormGroup } from '@angular/forms';

export interface App {
  name?: string;
  description?: string;
  year?: number;
  [key: string]: any;
}

export interface FormData {
  /**
   * 主要表单
   */
  group?: FormGroup;

  /**
   * 主要表单值
   */
  data?: any;
}

/**
 * 数据集传值
 */
export interface DataSource {
  /**
   * 主要的URL
   */
  url?: string;

  /**
   * 主键KEY
   */
  key?: string;

  /**
   * 主键值
   */
  val?: any;
}

/**
 * modal 对话框传值
 */
export interface ModalData {
  title?: any;
  data?: any;
}

/**
 * 页面传值
 */
export interface PageData {
  title?: any;
}

/**
 * 页面传值
 */
export interface ComponentData {
  //组件名称
  name?: string;
  //元数据
  meta?: any;
}
